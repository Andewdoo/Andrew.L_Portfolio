"""Build the editable first-person desk and its three registered web render passes."""
import math
import os
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import room_props
import mouse_rig
import desk_finishes
import keyboard

W, H = 1672, 941
FOCAL, HORIZON = 1300, 230
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.adaptive_threshold = .028
scene.cycles.max_bounces = 5
scene.render.resolution_x, scene.render.resolution_y = W*2, H*2
draft = os.environ.get("DESK_RENDER_PREVIEW") == "1"
scene.render.resolution_percentage = 32 if draft else 100
# Physical surfaces such as the keyboard need more samples than the projected props.
scene.cycles.samples = 24 if draft else 96
scene.cycles.use_denoising = True
desk_finishes.select_cycles_device(scene)
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.film_transparent = True
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0
scene.display_settings.display_device = "sRGB"
scene.render.filter_size = .90


def collection(name):
    result = bpy.data.collections.new(name)
    scene.collection.children.link(result)
    return result


authoring = collection("Camera and projection")
camera = bpy.data.objects.new("Seated eye position", bpy.data.cameras.new("Desk lens"))
authoring.objects.link(camera)
camera.rotation_euler.x = math.pi / 2
camera.data.sensor_fit = "HORIZONTAL"
camera.data.lens = FOCAL * camera.data.sensor_width / W
camera.data.shift_y = (HORIZON - H / 2) / W
scene.camera = camera
projector = bpy.data.objects.new("Reference projection origin", None)
authoring.objects.link(projector)
projector.empty_display_size = .09


def projected_material(name, file, *, scale_x=1, offset_x=0):
    """A fixed projector preserves the painted light on large receding surfaces."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes, link = mat.node_tree.nodes, mat.node_tree.links.new
    nodes.clear()
    def node(kind, x, y):
        n = nodes.new(kind)
        n.location = (x, y)
        return n
    coord = node("ShaderNodeTexCoord", 0, 0)
    coord.object = projector
    split = node("ShaderNodeSeparateXYZ", 190, 0)
    link(coord.outputs["Object"], split.inputs[0])
    uv = node("ShaderNodeCombineXYZ", 780, 0)
    for axis, socket, scale, bias, row in [("X", "X", scale_x*FOCAL/W, .5 + offset_x/W, 30),
                                           ("Z", "Y", FOCAL/H, 1-HORIZON/H, -180)]:
        divide = node("ShaderNodeMath", 390, row)
        divide.operation = "DIVIDE"
        link(split.outputs[axis], divide.inputs[0])
        link(split.outputs["Y"], divide.inputs[1])
        remap = node("ShaderNodeMath", 580, row)
        remap.operation = "MULTIPLY_ADD"
        link(divide.outputs[0], remap.inputs[0])
        remap.inputs[1].default_value = scale
        remap.inputs[2].default_value = bias
        link(remap.outputs[0], uv.inputs[socket])
    tex = node("ShaderNodeTexImage", 990, 0)
    tex.image = bpy.data.images.load(str(HERE / "textures" / file), check_existing=True)
    tex.interpolation = "Cubic"
    tex.extension = "EXTEND"
    link(uv.outputs[0], tex.inputs[0])
    emission = node("ShaderNodeEmission", 1290, 0)
    link(tex.outputs["Color"], emission.inputs[0])
    out = node("ShaderNodeOutputMaterial", 1490, 0)
    link(emission.outputs[0], out.inputs["Surface"])
    return mat


room_mat = projected_material("Room · baked evening light", "room-projection.png")


class Builder:
    def __init__(self, group, material):
        self.group = group
        self.material = material

    @staticmethod
    def point(u, v, d):
        return Vector(((u - W/2) * d / FOCAL, d, (HORIZON - v) * d / FOCAL))

    def object(self, name, mesh, bevel=0):
        obj = bpy.data.objects.new(name, mesh)
        self.group.objects.link(obj)
        obj.data.materials.append(self.material)
        if bevel:
            mod = obj.modifiers.new("Edge radius", "BEVEL")
            mod.width, mod.segments = bevel, 3
        return obj

    def mesh(self, name, verts, faces, bevel=0):
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(verts, [], faces)
        mesh.update()
        return self.object(name, mesh, bevel)

    def prism(self, name, front, offset, bevel=0):
        n = len(front)
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces.extend((i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n))
        return self.mesh(name, front+[v+offset for v in front], faces, bevel)

    def box(self, name, rect, d, depth, bevel=.01):
        l,t,r,bottom = rect
        return self.prism(name, [self.point(x,y,d) for x,y in
                          [(l,t),(r,t),(r,bottom),(l,bottom)]], Vector((0,depth,0)), bevel)

    def ellipsoid(self, name, rect, d, depth):
        l,t,r,bottom = rect
        bm = bmesh.new()
        matrix = Matrix.Diagonal(((r-l)*d/FOCAL/2, depth/2, (bottom-t)*d/FOCAL/2, 1))
        matrix.translation = self.point((l+r)/2, (t+bottom)/2, d)
        bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=1, matrix=matrix)
        return self.from_bmesh(name, bm)

    def tube(self, name, a, c, radius):
        delta = c-a
        if delta.length < .00001: return None
        matrix = delta.to_track_quat("Z","Y").to_matrix().to_4x4()
        matrix.translation = (a+c)/2
        bm = bmesh.new()
        bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=radius,
                              radius2=radius, depth=delta.length, matrix=matrix)
        return self.from_bmesh(name, bm)

    def from_bmesh(self, name, bm):
        mesh = bpy.data.meshes.new(name)
        bm.to_mesh(mesh)
        bm.free()
        obj = self.object(name, mesh)
        for face in mesh.polygons:
            face.use_smooth = len(face.vertices) <= 4
        return obj

    def surface(self, name, corners, elevation, thickness, bevel):
        # Intersect the corresponding lens rays with a horizontal plane.
        points = [self.point(x,y,-elevation*FOCAL/(y-HORIZON)) for x,y in corners]
        return self.prism(name, points, Vector((0,0,-thickness)), bevel)


b = Builder(collection("Writing desk"), room_mat)
room_props.build(b)
b.box("Beyond the window and room", (-130,-100,1810,1050), 4.4, .12)
b.surface("Solid walnut top", [(-220,678),(1890,678),(1900,912),(-220,912)], -.70, .097, .009)
b.surface("Stitched desk pad", [(295,735),(1458,735),(1653,877),(1657,890),
          (1647,899),(190,899),(177,891)], -.695, .007, .004)
b.group = collection("Display and stand")
monitor_scale = .92
monitor_center = 845
bezel_mat = projected_material("Display · graphite frame", "desk-study.png",
    scale_x=1/monitor_scale, offset_x=(monitor_center-W/2)*(1-1/monitor_scale))
def display_panel(name, corners, depth, thickness, bevel):
    return b.prism(name, [b.point(monitor_center + (x-monitor_center)*monitor_scale,y,depth) for x,y in corners],
                   Vector((0,thickness,0)), bevel)

b.material = bezel_mat
display_panel("Display · soft-edged graphite case",
              [(411,220),(1277,220),(1289,655),(402,655)], 2.69,.11,.011)
display_panel("Display · inset LCD",
              [(431.5,237),(1257.4,237),(1268,632),(422,632)], 2.681,.012,.001)
b.material = room_mat
b.box("Display · articulated neck", (759,649,895,696), 2.66, .096, .012)
b.surface("Display · foot", [(714,678),(955,678),(984,711),(687,711)], -.69, .012, .005)
for i,(u,v) in enumerate([(612,680),(1049,681)]):
    b.tube("Cable from display "+str(i+1), b.point(u,v,2.88),
           b.point(u+(-57 if i else 57),622,2.76), .007)

b.group = collection("Mechanical keyboard")
keyboard.build(b)

b.group = collection("Résumé")
b.surface("Cream laid paper", [(182,717),(420,736),(357,897),(43,882)], -.686, .0014, .0007)
b.surface("Second sheet", [(180,720),(419,739),(356,900),(47,885)], -.689, .001, .0004)
for start,end in [((167,764),(194,730)),((197,731),(182,754)),((183,754),(173,760))]:
    xy = lambda p: b.point(*p,.684*FOCAL/(p[1]-HORIZON))
    b.tube("Wire paper clip", xy(start), xy(end), .0017)

b.group = collection("Resting left hand")
hand_finish = mouse_rig.materials(bpy.data.images["desk-study.png"])
mouse_rig.build(b, hand_finish, keyboard=True)

b.group = note = collection("Skills note · interactive")
note_shift = 35
note_mat = projected_material("Skills note · reference finish", "desk-study.png", offset_x=note_shift)
b.material = note_mat
for name,outline,d in [
    ("Golden paper",[(1122,290),(1259,311),(1241,429),(1102,406)],2.653),
    ("Masking tape",[(1169,283),(1231,294),(1223,324),(1162,313)],2.646),
    ("Ink glint 1",[(1096,305),(1100,304),(1106,319),(1103,321)],2.653),
    ("Ink glint 2",[(1082,318),(1084,315),(1098,326),(1096,329)],2.653),
    ("Ink glint 3",[(1075,336),(1093,335),(1093,339),(1075,340)],2.653),
]:
    b.prism(name,[b.point(x-note_shift,y,d) for x,y in outline],Vector((0,.001,0)))

b.group = hand = collection("Mouse and hand · interactive")
mouse_rig.build(b, hand_finish)
# Keep the resting grip together for direct posing in Blender.
rig = bpy.data.objects.new("Mouse and wrist control", None)
hand.objects.link(rig)
rig.empty_display_size = .07
rig.location = b.point(1338,815,1.52)
bpy.context.view_layer.update()
for obj in list(hand.objects):
    if obj == rig: continue
    obj.parent = rig
    obj.matrix_parent_inverse = rig.matrix_world.inverted()

desk_finishes.finish_scene(scene, authoring, (room_mat, bezel_mat, note_mat))
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type == "VIEW_3D":
            area.spaces.active.region_3d.view_perspective = "CAMERA"
            area.spaces.active.shading.type = "MATERIAL"
bpy.ops.file.pack_all()
bpy.context.preferences.filepaths.save_version = 0
if not draft:
    bpy.ops.wm.save_as_mainfile(filepath=str(HERE / "first-person-desk.blend"), compress=True)

web = HERE.parent / "public" / "scene" / "first-person"
web.mkdir(exist_ok=True)
bpy.ops.object.select_all(action="DESELECT")
for obj in hand.objects:
    if obj.type == "MESH" or obj == rig:
        obj.select_set(True)
if not draft:
    bpy.ops.export_scene.gltf(filepath=str(web / "mouse-rig.glb"), use_selection=True,
        export_animations=False, export_materials="NONE", export_yup=True)

render_dir = HERE.parent / "tmp" / "blender-desk"
render_dir.mkdir(parents=True, exist_ok=True)
for name, visible in [("room",None), ("mouse",hand), ("note",note)]:
    for group in scene.collection.children:
        group.hide_render = (group in [hand,note] if visible is None else group != visible) and group != authoring
    if name == "mouse":
        scene.cycles.samples = 16 if draft else 64
    elif name == "note":
        scene.cycles.samples = 8 if draft else 24
        scene.cycles.use_denoising = False
    scene.render.filepath = str(render_dir / (name + ("-preview" if draft else "") + ".png"))
    bpy.ops.render.render(write_still=True)

