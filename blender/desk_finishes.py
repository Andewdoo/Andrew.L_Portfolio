"""Preserve the desk study's painted light on the corresponding Blender solids."""
import bpy
from mathutils import Vector

def select_cycles_device(scene):
    devices = bpy.context.preferences.addons["cycles"].preferences
    for backend in ("OPTIX", "HIP", "METAL"):
        try:
            devices.compute_device_type = backend
            devices.refresh_devices()
            if any(device.type == backend for device in devices.devices):
                for device in devices.devices:
                    device.use = device.type == backend
                scene.cycles.device = "GPU"
                return
        except (TypeError, RuntimeError):
            continue
    scene.cycles.device = "CPU"


# The camera sees the authored paint; the light transport remains material-specific.
# Tiny contributions on closely matched forms bring out their rims as the eye moves.
# Albedo swatches give previously hidden faces a real finish when exposed.
# Following the swatch are roughness, metalness, and the camera-visible
# physical fraction. Printed and illustrated details use the exact pigment.
FINISHES = [
    ("Plaster", ("plaster", "beyond the window"), "674b50", .85, 0, 0),
    ("Blue hour", ("blue hour", "distant apartment"), "303354", .88, 0, 0),
    ("Ceramic", ("stoneware mug", "cachepot"), "bf9c86", .25, .03, .009),
    ("Lens", ("visor", "optical glass", "lens mount"), "322b38", .16, .18, .006),
    ("Machined metal", ("hinge", "pivot", "wire paper clip", "anglepoise"), "53444e", .32, .45, .006),
    ("Walnut", ("solid walnut", "floating shelf", "wooden foot"), "87583e", .45, 0, .006),
    ("Woven fabric", ("stitched desk pad",), "3a2d3b", .86, 0, .003),
    ("Glowing ceramic", ("diffuser", "frosted globe", "porcelain", "question cube"), "ffcf88", .36, 0, 0),
    ("Violet LED", ("illuminated annulus",), "cf9aec", .31, .14, 0),
    ("Paper", ("paper", "sheet", "photo", "tape", "page block"), "d8c8ba", .83, 0, 0),
    ("Foliage", ("leaf", "petiole", "vine", "pothos"), "475233", .50, 0, 0),
]
DEFAULT = ("Graphite", (), "41343e", .55, 0, 0)


def linear_swatch(hex_color):
    rgb = [int(hex_color[i:i+2],16)/255 for i in (0,2,4)]
    return tuple(c/12.92 if c <= .04045 else ((c+.055)/1.055)**2.4 for c in rgb)+(1,)


def finish_scene(scene, lighting, projected_materials):
    cache = {}
    for obj in scene.objects:
        if obj.type != "MESH":
            continue
        original = obj.data.materials[0]
        if original not in projected_materials:
            continue
        name = obj.name.lower()
        if "inset lcd" in name:
            # The browser registers one live wallpaper to these same four corners.
            glass = bpy.data.materials.new("LCD · unlit aperture")
            glass.use_nodes = True
            nodes = glass.node_tree.nodes
            shader = nodes.new("ShaderNodeEmission")
            shader.inputs["Color"].default_value = (.014,.014,.015,1)
            glass.node_tree.links.new(shader.outputs[0], nodes["Material Output"].inputs["Surface"])
            obj.data.materials[0] = glass
            continue
        label, _, swatch, roughness, metalness, physical_fraction = next((entry for entry in FINISHES
            if any(token in name for token in entry[1])), DEFAULT)
        key = (original, label)
        if key not in cache:
            mat = original.copy()
            mat.name = label + " · " + original.name.split(" · ")[0]
            nodes = mat.node_tree.nodes
            link = mat.node_tree.links.new
            painted = next(n for n in nodes if n.type == "EMISSION")
            output = next(n for n in nodes if n.type == "OUTPUT_MATERIAL")
            physical = nodes.new("ShaderNodeBsdfPrincipled")
            physical.location = (1300,-180)
            mat.diffuse_color = linear_swatch(swatch)
            physical.inputs["Base Color"].default_value = mat.diffuse_color
            physical.inputs["Roughness"].default_value = roughness
            physical.inputs["Metallic"].default_value = metalness
            physical.inputs["Specular IOR Level"].default_value = .32
            if label in ("Glowing ceramic","Violet LED"):
                physical.inputs["Emission Color"].default_value = mat.diffuse_color
                physical.inputs["Emission Strength"].default_value = .7
            rays = nodes.new("ShaderNodeLightPath")
            rays.location = (1260,420)
            camera_mix = nodes.new("ShaderNodeMath")
            camera_mix.operation = "MULTIPLY"
            camera_mix.label = "Paint visible to camera"
            camera_mix.location = (1480,360)
            camera_mix.inputs[1].default_value = 1 - physical_fraction
            link(rays.outputs["Is Camera Ray"], camera_mix.inputs[0])
            mix = nodes.new("ShaderNodeMixShader")
            mix.name = mix.label = "Reference finish"
            mix.location, output.location = (1720,20),(1940,20)
            link(camera_mix.outputs[0],mix.inputs[0])
            link(physical.outputs[0],mix.inputs[1])
            link(painted.outputs[0],mix.inputs[2])
            link(mix.outputs[0],output.inputs["Surface"])
            cache[key] = mat
        obj.data.materials[0] = cache[key]

    world = bpy.data.worlds.new("Neutral evening ambient")
    scene.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (.88,.88,.88,1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = .23
    for name, origin, target, watts, tint, size in [
        ("Window · cool fill",(-1.65,1.05,.51),(-.2,2.4,-.5),115,(.81,.90,1),1.6),
        ("Softbox · white bounce",(.86,.04,.71),(0,2.76,-.45),80,(.98,.98,1),1.9),
        ("Desk lamp · amber pool",(-.89,2.03,-.27),(-.59,1.75,-.7),19,(1,.62,.30),.19),
        ("Desk lamp · keyboard bounce",(-.64,1.21,-.34),(-.07,1.59,-.66),20,(1,.87,.72),.48),
        ("Lamp · face bounce",(-.87,1.15,.15),(-.5,2.3,-.54),30,(1,.74,.5),1.0),
        ("Shelf lamp · warm bounce",(-.76,3.05,.33),(-.62,3.9,.16),19,(1,.64,.33),.26),
        ("Shelf cube · gold bounce",(1.11,3.14,.24),(1.12,3.94,.20),13,(1,.61,.28),.19),
        ("Tower · white spill",(1.06,1.73,-.41),(.57,1.4,-.68),11,(.92,.94,1),.3),
        ("LCD · white fill",(0,2.58,-.37),(0,1.44,-.69),10,(.95,.96,1),.95),
    ]:
        lamp = bpy.data.lights.new(name,"AREA")
        lamp.energy, lamp.color, lamp.size = watts*.34,tint,size
        obj = bpy.data.objects.new(name,lamp)
        lighting.objects.link(obj)
        obj.location = origin
        obj.rotation_euler = (Vector(target)-obj.location).to_track_quat("-Z","Y").to_euler()

