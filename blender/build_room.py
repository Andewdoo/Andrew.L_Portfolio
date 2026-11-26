"""Build the editable desk scene and its browser GLB with Blender's Python API."""

import math
import random
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
RNG = random.Random(38)
ORIGINS = {}


def color(hex_value):
    rgb = [int(hex_value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in rgb) + (1,)


def material(name, hex_value, roughness=.65, metallic=0, glow=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color(hex_value)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = mat.diffuse_color
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Emission Color"].default_value = mat.diffuse_color
    shader.inputs["Emission Strength"].default_value = glow
    return mat


def group(name, point, parent=None):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.empty_display_size = .14
    ORIGINS[obj] = Vector(point)
    if parent is not None:
        obj.parent = parent
        obj.location = ORIGINS[obj] - ORIGINS[parent]
    else:
        obj.location = point
    return obj


def finish(obj, name, mat, parent=None, smooth=False):
    obj.name = name
    obj.data.materials.append(mat)
    if parent is not None:
        obj.parent = parent
        obj.location -= ORIGINS[parent]
    if smooth:
        for face in obj.data.polygons:
            face.use_smooth = True
    return obj


def box(name, point, size, mat, bevel=.025, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=point)
    obj = bpy.context.object
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        modifier = obj.modifiers.new("Rounded edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 2
        obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return finish(obj, name, mat, parent)


def oval(name, point, scale, mat, parent=None, segments=20):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=12, radius=1, location=point)
    obj = bpy.context.object
    obj.scale = scale
    return finish(obj, name, mat, parent, smooth=True)


def tube(name, start, end, radius, mat, parent=None, tip=None, sides=16):
    direction = Vector(end) - Vector(start)
    bpy.ops.mesh.primitive_cone_add(
        vertices=sides, radius1=radius, radius2=radius if tip is None else tip,
        depth=direction.length, location=(Vector(start) + Vector(end)) / 2,
    )
    obj = bpy.context.object
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    return finish(obj, name, mat, parent, smooth=True)


def limb(name, start, end, width, mat, parent):
    direction = Vector(end) - Vector(start)
    obj = oval(name, (Vector(start) + Vector(end)) / 2, (width, width * .91, direction.length / 2 + width * .48), mat, parent)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    return obj


def loop_keys(obj, poses):
    origin = obj.location.copy()
    for frame, offset, rotation in poses:
        obj.location = origin + Vector(offset)
        obj.rotation_euler = rotation
        obj.keyframe_insert(data_path="location", frame=frame)
        obj.keyframe_insert(data_path="rotation_euler", frame=frame)


def plant(x, y, base, size, pot_mat):
    tube("Ceramic planter", (x, y, base), (x, y, base + .24 * size), .15 * size, pot_mat, tip=.20 * size)
    tube("Potting soil", (x, y, base + .229 * size), (x, y, base + .246 * size), .174 * size, soil)
    for ix in range(10):
        angle = ix * 2.399
        height = (RNG.uniform(.44, .85) - .024 * ix) * size
        spread = RNG.uniform(.15, .46) * size
        root = (x, y, base + .19 * size)
        end = (x + math.cos(angle) * spread, y + math.sin(angle) * spread, root[2] + height)
        tube("Plant stem", root, end, .012 * size, foliage[1], sides=8)
        leaf = limb("Leaf", Vector(root).lerp(Vector(end), .66), end, .066 * size, foliage[ix % 3], None)
        leaf.scale.y *= .52


def book_row(start, y, z, count, scale=1):
    x = start
    for ix in range(count):
        width = RNG.uniform(.074, .145) * scale
        height = RNG.uniform(.26, .41) * scale
        depth = RNG.uniform(.19, .25) * scale
        box("Book cover", (x + width / 2, y, z + height / 2), (width, depth, height), books[ix % len(books)], .009)
        box("Spine band", (x + width / 2, y - depth / 2 - .004, z + height * .21), (width * .78, .008, .019 * scale), gold, .002)
        x += width + .015 * scale


bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version = 0

walnut = material("Smoked walnut", "563147")
wood = material("Honey walnut", "995e54", .48)
wood_edge = material("Polished walnut edge", "754354", .39)
grain = [material(f"Floor plank {i}", shade) for i, shade in enumerate(["574057", "61445a", "664559", "533c52", "6b4b5d"])]
wall = material("Plum plaster", "665170")
wall_side = material("Mauve plaster", "584460")
trim = material("Deep aubergine", "43334f", .54)
black = material("Soft black", "30283f", .48)
metal = material("Gunmetal", "393349", .31, .40)
lavender = material("Lavender keycaps", "9581b8")
ivory = material("Oat milk", "f2d8c0")
gold = material("Brushed copper", "cf9064", .4, .28)
peach = material("Apricot fabric", "d59086")
yellow = material("Sticky note yellow", "ffd791")
ink = material("Paper ink", "7b5361")
soil = material("Potting soil", "442c39")
foliage = [material(f"Leaf color {i}", shade) for i, shade in enumerate(["657b65", "465f59", "8a9667"])]
books = [material(f"Cloth binding {i}", shade) for i, shade in enumerate(["a17291", "d49d85", "5f7789", "82689c", "e2b484"])]
runner = material("Wool rug", "644963")
runner_edge = material("Rug stitching", "9d6e86")
screen = material("Computer display", "35274f", .35, glow=.46)
screen_ink = material("Computer display pixels", "b4a2ee", glow=.9)
shelf_glow = material("Shelf light strip", "ffd099", glow=2.5)
fan_glow = material("Tower LEDs", "b7a1ff", glow=2.2)
lamp_bulb = material("Desk lamp bulb", "ffcb90", glow=3)
skin = material("Character skin", "d9a078", .73)
skin_shade = material("Character skin shade", "b57162", .77)
hair = material("Character hair", "2c263d", .65)
hair_light = material("Character hair highlights", "40324a", .6)
shirt = material("Burgundy knit sweater", "82495f")
shirt_cuff = material("Sweater ribbing", "6d3e57")
pants = material("Indigo trousers", "4e4b72")

# Room shell and floor. The left side has a cutaway edge for an open view.
box("Room foundation", (0, -.05, -.19), (7.76, 5.92, .34), trim, .09)
for ix in range(19):
    x = -3.66 + ix * .405
    seam = -.72 if ix % 2 else .10
    for front, back in [(-2.95, seam - .009), (seam + .009, 2.87)]:
        box("Walnut floorboard", (x, (front + back) / 2, -.008), (.397, back - front, .055), grain[ix % 5], .006)
box("Back wall, right", (1.09, 2.76, 1.73), (5.54, .17, 3.46), wall, .027)
box("Back wall, window sill", (-2.65, 2.76, .62), (1.97, .17, 1.24), wall, .025)
box("Back wall, window header", (-2.65, 2.76, 3.34), (1.97, .17, .24), wall, .02)
box("Back wall, left edge", (-3.76, 2.76, 1.73), (.28, .17, 3.46), wall, .023)
box("Cutaway side wall", (-3.80, 1.80, 1.73), (.18, 1.87, 3.46), wall_side, .025)
box("Back wall baseboard", (0, 2.65, .10), (7.63, .08, .20), trim)
box("Side wall baseboard", (-3.69, 1.81, .10), (.085, 1.79, .20), trim)
box("Area rug", (-.39, -.82, .035), (5.27, 3.76, .042), runner, .12)
for dy in (-1.70, -1.61, 1.61, 1.70):
    box("Rug woven stripe", (-.39, -.82 + dy, .057), (5.02, .025, .005), runner_edge, .003)

# Window and geometric night skyline.
sky = material("Night sky", "414271", glow=.46)
city = [material("City silhouette " + str(i), shade, glow=.16) for i, shade in enumerate(["353459", "353956", "4e507e"])]
window_light = [material("Window pixel " + str(i), shade, glow=.82) for i, shade in enumerate(["e3b99a", "adaadd", "7987b7"])]
box("Sky behind window", (-2.65, 2.96, 2.22), (1.98, .04, 2.16), sky, .015)
oval("Moon outside", (-2.26, 2.918, 2.98), (.105, .015, .105), window_light[0])
for ix in range(13):
    x = -3.55 + ix * .145
    height = RNG.uniform(.23, 1.14)
    width = RNG.uniform(.105, .174)
    y = 2.91 - (ix % 3) * .017
    box("Distant building", (x, y, 1.26 + height / 2), (width, .021, height), city[ix % 3], 0)
    for row in range(int(height / .086)):
        for col in (-1, 1):
            if RNG.random() > .47:
                box("Lit city window", (x + col * width * .22, y - .014, 1.31 + row * .082), (.023, .006, .031), window_light[(ix + row) % 3], 0)
for x, width in [(-3.61, .11), (-2.64, .055), (-1.68, .11)]:
    box("Vertical window frame", (x, 2.69, 2.23), (width, .15, 2.04), trim, .014)
for z, width in [(1.24, .12), (2.23, .055), (3.23, .12)]:
    box("Horizontal window frame", (-2.65, 2.68, z), (2.03, .17, width), trim, .013)
box("Walnut sill", (-2.65, 2.54, 1.26), (2.08, .34, .086), wood_edge, .025)

# Desk, drawers and shelf furniture.
box("Walnut desk top", (.17, 1.12, 1.075), (4.42, 1.52, .15), wood, .065)
box("Desk apron", (.17, 1.50, .96), (4.16, .72, .18), wood_edge, .031)
for x in (-1.90, 2.17):
    for y in (.56, 1.74):
        tube("Tapered desk leg", (x * 1.042, y - .035, .065), (x, y, 1.04), .061, walnut, tip=.087, sides=12)
        tube("Copper leg cap", (x * 1.042, y - .035, .041), (x * 1.04, y - .033, .117), .063, gold, sides=12)
for x in (-1.43, 1.52):
    box("Walnut drawer", (x, .48, .915), (.75, .13, .20), walnut, .026)
    box("Drawer pull", (x, .385, .91), (.22, .055, .028), gold, .009)

box("Floating shelf", (.59, 2.40, 2.54), (4.08, .57, .13), wood_edge, .038)
box("Shelf lighting", (.60, 2.27, 2.467), (3.83, .057, .025), shelf_glow, .008)
for x in (-1.22, 2.42):
    box("Shelf wall bracket", (x, 2.60, 2.32), (.085, .19, .36), walnut, .015)
book_row(-1.29, 2.43, 2.605, 5, 1.17)
book_row(1.99, 2.43, 2.605, 4)
plant(1.65, 2.43, 2.601, .60, ivory)
plant(-2.80, 1.43, .038, 1.65, peach)
plant(2.73, 1.93, .038, 1.37, ivory)

# Picture-frame meshes have photo surfaces replaced with Andrew's images on the web.
for ix, x in enumerate((-.31, .35, 1.00)):
    photo = group(f"hot_photo_{ix}", (x, 2.33, 2.88))
    width = .52 if ix != 1 else .46
    height = .47 if ix != 1 else .54
    box("Walnut photo frame", (x, 2.39, 2.605 + height / 2), (width, .09, height), wood, .024, photo)
    box("Ivory photo mat", (x, 2.339, 2.605 + height / 2), (width - .057, .016, height - .059), ivory, .008, photo)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, 2.327, 2.605 + height / 2), rotation=(math.pi / 2, 0, 0))
    surface = bpy.context.object
    surface.scale = (width - .104, height - .106, 1)
    finish(surface, f"PhotoSurface_{ix}", books[ix], photo)

# Sideboard, books and a small cat figurine.
box("Low side cabinet", (3.01, 1.23, .47), (1.05, .82, .75), walnut, .048)
box("Side cabinet top", (3.01, 1.23, .88), (1.10, .87, .095), wood_edge, .035)
for z in (.31, .58):
    box("Side cabinet drawer", (3.01, .799, z), (.92, .071, .22), wood, .026)
    box("Side cabinet pull", (3.01, .747, z), (.14, .037, .034), gold, .01)
book_row(2.57, 1.39, .93, 3, .87)
oval("Cat figurine body", (3.25, 1.05, 1.055), (.139, .125, .15), ivory)
oval("Cat figurine head", (3.25, 1.02, 1.206), (.126, .102, .096), ivory)
for dx in (-.07, .07):
    tube("Cat figurine ear", (3.25 + dx, 1.02, 1.247), (3.25 + dx * 1.23, 1.03, 1.341), .049, ivory, tip=.004, sides=6)
    oval("Cat figurine eye", (3.25 + dx * .66, .924, 1.213), (.012, .006, .018), black, segments=12)

# Computer, keyboard and desk objects.
computer = group("hot_projects", (.25, 1.45, 1.77))
box("Monitor foot", (.25, 1.56, 1.17), (.69, .44, .068), metal, .042, computer)
box("Monitor neck", (.25, 1.67, 1.37), (.15, .15, .43), black, .034, computer)
box("Monitor housing", (.25, 1.58, 1.85), (1.73, .16, 1.00), black, .052, computer)
box("Monitor glass", (.25, 1.487, 1.86), (1.60, .021, .88), screen, .012, computer)
bpy.ops.mesh.primitive_plane_add(size=1, location=(.25, 1.475, 1.86), rotation=(math.pi / 2, 0, 0))
display = bpy.context.object
display.scale = (1.565, .846, 1)
finish(display, "ScreenSurface", screen, computer)
for index, length in enumerate((.45, .63, .51, .32, .58, .40)):
    box("Blender preview display line", (-.36 + length / 2, 1.473, 2.10 - index * .075), (length, .002, .012), screen_ink, 0, computer)
box("Monitor status LED", (.94, 1.490, 1.387), (.037, .012, .014), fan_glow, .004, computer)

box("Desktop tower", (1.92, 1.49, 1.55), (.43, .65, .80), black, .062)
box("Tower front panel", (1.92, 1.153, 1.55), (.36, .043, .69), metal, .034)
for z in (1.34, 1.56, 1.78):
    tube("RGB fan ring", (1.92, 1.126, z), (1.92, 1.10, z), .089, fan_glow, sides=32)
    tube("RGB fan hub", (1.92, 1.095, z), (1.92, 1.075, z), .068, black, sides=28)
    for spoke in range(4):
        a = spoke * math.tau / 4 + .4
        tube("Fan blade", (1.92, 1.073, z), (1.92 + math.cos(a) * .057, 1.071, z + math.sin(a) * .057), .009, lavender, sides=6)

box("Keyboard chassis", (-.27, .76, 1.173), (.92, .34, .043), black, .04)
for row in range(4):
    for col in range(13):
        if row == 0 and 3 <= col <= 8:
            continue
        mat = peach if col in (0, 12) else lavender if (col + row) % 4 == 0 else ivory
        box("Mechanical keycap", (-.655 + col * .064, .635 + row * .073, 1.205), (.053, .057, .026), mat, .009)
box("Spacebar", (-.302, .635, 1.205), (.371, .058, .026), lavender, .009)
box("Mouse mat", (.67, .77, 1.157), (.57, .57, .015), trim, .058)
mouse = group("ComputerMouse", (.62, .737, 1.18))
oval("Wireless mouse", (.62, .737, 1.196), (.10, .15, .041), black, mouse)
box("Mouse scroll wheel", (.62, .805, 1.230), (.023, .038, .017), lavender, .006, mouse)

note = group("hot_skills", (-.56, 1.43, 1.71))
box("Skills sticky note", (-.55, 1.446, 1.69), (.25, .025, .23), yellow, .012, note)
for ix in range(3):
    box("Sticky note line", (-.55, 1.431, 1.74 - ix * .048), (.15 - ix * .024, .007, .013), ink, .002, note)

resume = group("hot_resume", (1.30, .67, 1.17))
box("Resume paper stack", (1.30, .67, 1.157), (.48, .59, .023), ivory, .017, resume)
box("Resume colored header", (1.30, .875, 1.171), (.40, .09, .006), peach, .003, resume)
for ix in range(6):
    box("Resume line", (1.26, .799 - ix * .054, 1.172), (.31 - (ix % 3) * .046, .013, .004), ink, .002, resume)

contact = group("hot_contact", (1.96, .64, 1.35))
box("Phone stand", (1.96, .66, 1.166), (.29, .255, .035), gold, .022, contact)
phone = group("Phone tilt", (1.96, .64, 1.357), contact)
box("Phone chassis", (1.96, .64, 1.357), (.23, .046, .38), metal, .026, phone)
box("Phone screen", (1.96, .614, 1.357), (.201, .010, .349), screen, .018, phone)
for ix in range(3):
    box("Phone message bubble", (1.96 + (ix % 2) * .025, .606, 1.438 - ix * .070), (.118, .007, .041), screen_ink, .009, phone)
phone.rotation_euler.x = -.21

lamp = group("hot_lamp", (-1.51, 1.41, 1.94))
tube("Lamp pedestal", (-1.67, 1.57, 1.151), (-1.67, 1.57, 1.214), .195, metal, lamp, tip=.163, sides=32)
tube("Lower lamp arm", (-1.67, 1.57, 1.20), (-1.82, 1.54, 1.83), .038, metal, lamp)
tube("Upper lamp arm", (-1.82, 1.54, 1.83), (-1.46, 1.35, 2.105), .032, metal, lamp)
for point in [(-1.82, 1.54, 1.83), (-1.46, 1.35, 2.10)]:
    oval("Lamp pivot", point, (.057, .057, .057), gold, lamp, 16)
tube("Amber lamp shade", (-1.40, 1.28, 1.99), (-1.48, 1.36, 2.11), .190, gold, lamp, tip=.069, sides=32)
tube("Lamp diffuser", (-1.395, 1.273, 1.98), (-1.40, 1.28, 2.00), .167, lamp_bulb, lamp, sides=32)

# Small coffee mug, coaster and its handle.
tube("Mug coaster", (-1.10, .89, 1.151), (-1.10, .89, 1.168), .15, walnut, sides=24)
tube("Ceramic mug", (-1.10, .89, 1.168), (-1.10, .89, 1.393), .093, ivory, tip=.108, sides=28)
tube("Coffee surface", (-1.10, .89, 1.395), (-1.10, .89, 1.398), .089, soil, sides=28)
bpy.ops.mesh.primitive_torus_add(major_segments=24, minor_segments=8, location=(-.991, .89, 1.281), rotation=(math.pi / 2, 0, 0), major_radius=.057, minor_radius=.016)
finish(bpy.context.object, "Coffee mug handle", ivory, smooth=True)

# Chair and seated character.
chair_x = -.23
box("Chair cushion", (chair_x, -.60, .58), (.76, .67, .17), shirt_cuff, .099)
box("Chair backrest", (chair_x, -.97, 1.00), (.74, .13, .79), trim, .10)
box("Backrest insert", (chair_x, -1.046, 1.018), (.58, .034, .60), shirt_cuff, .057)
tube("Chair stem", (chair_x, -.60, .13), (chair_x, -.60, .55), .064, metal)
for spoke in range(5):
    angle = spoke * math.tau / 5
    x = chair_x + math.cos(angle) * .43
    y = -.60 + math.sin(angle) * .43
    tube("Chair caster arm", (chair_x, -.60, .15), (x, y, .11), .040, metal)
    oval("Chair caster", (x, y, .079), (.058, .042, .053), black, segments=12)

person = group("hot_about", (-.23, -.45, 1.16))
oval("Seated sweater", (-.23, -.44, .997), (.288, .199, .386), shirt, person)
oval("Sweater hem", (-.23, -.44, .725), (.275, .184, .087), shirt_cuff, person)
for x in (-.392, -.074):
    limb("Trouser thigh", (x, -.38, .67), (x, .225, .55), .132, pants, person)
    limb("Trouser shin", (x, .224, .548), (x, .144, .158), .089, pants, person)
    oval("Sneaker upper", (x, .287, .104), (.100, .229, .082), black, person)
    oval("Sneaker sole", (x, .287, .063), (.102, .231, .034), ivory, person)
    for dy in (.257, .299, .340):
        box("Sneaker lace", (x, dy, .169), (.082, .008, .008), ivory, .002, person)

head = group("CharacterHead", (-.23, -.319, 1.367), person)
tube("Neck", (-.23, -.343, 1.27), (-.23, -.328, 1.486), .106, skin, head)
oval("Head", (-.23, -.304, 1.617), (.194, .177, .226), skin, head, 28)
oval("Jawline", (-.23, -.240, 1.509), (.151, .139, .123), skin, head)
oval("Nose", (-.227, -.132, 1.607), (.044, .061, .045), skin, head)
oval("Mouth", (-.228, -.106, 1.531), (.045, .008, .010), skin_shade, head)
for side in (-1, 1):
    eye_x = -.23 + side * .078
    oval("Eye", (eye_x, -.142, 1.641), (.030, .007, .012), hair, head)
    oval("Brow", (eye_x, -.141, 1.673), (.041, .009, .009), hair, head)
    ear_x = -.23 + side * .184
    oval("Ear", (ear_x, -.295, 1.586), (.032, .057, .068), skin, head)
    oval("Ear detail", (ear_x + side * .023, -.290, 1.587), (.011, .029, .040), skin_shade, head)
oval("Swept hair volume", (-.235, -.335, 1.743), (.200, .175, .123), hair, head, 26)
oval("Hair at nape", (-.23, -.424, 1.640), (.180, .087, .154), hair, head)
for ix in range(5):
    lock = oval("Swept fringe", (-.349 + ix * .053, -.228 + ix * .009, 1.744 + ix * .01),
                (.072, .116, .054), hair if ix % 2 else hair_light, head)
    lock.rotation_euler = (.20, -.36, -.32)

arms = []
for side, shoulder, elbow, wrist in [
    ("Left", (-.46, -.337, 1.219), (-.56, .19, 1.080), (-.41, .68, 1.217)),
    ("Right", (.002, -.345, 1.242), (.18, .151, 1.073), (.587, .643, 1.237)),
]:
    limb(side + " upper sleeve", shoulder, elbow, .107, shirt, person)
    hinge = group(side + "Forearm", elbow, person)
    arms.append(hinge)
    limb(side + " forearm sleeve", elbow, Vector(elbow).lerp(Vector(wrist), .88), .083, shirt, hinge)
    limb(side + " cuff", Vector(elbow).lerp(Vector(wrist), .81), wrist, .066, shirt_cuff, hinge)
    palm = Vector(wrist) + Vector((0, .063, .002))
    oval(side + " palm", palm, (.073, .105, .038), skin, hinge)
    for ix in range(4):
        x = palm.x + (ix - 1.5) * .033
        y = palm.y + .083 - abs(ix - 1.5) * .013
        finger = oval(side + " finger", (x, y, palm.z - .014), (.017, .063, .017), skin, hinge, 14)
        finger.rotation_euler.x = -.20
    oval(side + " thumb", (palm.x + (.065 if side == "Left" else -.066), palm.y + .008, palm.z - .01), (.033, .066, .021), skin, hinge, 14)

# Keyframed head, typing and mousing motion. The browser loops this clip.
idle = (0, 0, 0)
loop_keys(head, [(1, idle, idle), (31, idle, (-.054, .023, -.05)), (62, idle, (-.023, .042, .098)),
                 (87, idle, (.02, -.015, .035)), (121, idle, idle)])
typing = [(1, idle, idle)]
for ix, frame in enumerate(range(5, 119, 5)):
    typing.append((frame, idle, ((.038 if ix % 2 else -.024), .008, math.sin(ix * .65) * .045)))
typing.append((121, idle, idle))
loop_keys(arms[0], typing)
loop_keys(arms[1], [(1, idle, idle), (27, idle, (.018, -.012, .06)), (45, idle, (.001, -.01, -.04)),
                    (78, idle, (-.027, -.01, -.022)), (103, idle, (.017, .014, .042)), (121, idle, idle)])
loop_keys(mouse, [(1, idle, idle), (27, (-.032, .029, 0), idle), (45, (.027, -.023, 0), idle),
                   (78, (.010, -.018, 0), idle), (103, (-.025, .018, 0), idle), (121, idle, idle)])


def area(name, point, target, watts, rgb, size):
    light = bpy.data.lights.new(name, "AREA")
    light.energy = watts
    light.color = rgb
    light.shape = "DISK"
    light.size = size
    obj = bpy.data.objects.new(name, light)
    bpy.context.collection.objects.link(obj)
    obj.location = point
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


scene = bpy.context.scene
scene.world = bpy.data.worlds.new("Twilight")
scene.world.use_nodes = True
scene.world.node_tree.nodes.get("Background").inputs[0].default_value = (.12, .08, .21, 1)
scene.world.node_tree.nodes.get("Background").inputs[1].default_value = .35
area("Warm light from outside cutaway", (1, -3.6, 6.6), (0, .3, 0), 850, (1, .77, .63), 5)
area("Cool light through window", (-3.1, 2.4, 3.6), (0, 0, .7), 370, (.57, .65, 1), 4)
area("Desk lamp pool", (-1.42, 1.27, 1.96), (-1.0, .8, 1.12), 42, (1, .56, .29), .50)
area("Violet room rim", (4.5, 2.1, 4), (0, .5, 1), 430, (.66, .60, 1), 4)

camera_data = bpy.data.cameras.new("Room camera")
camera = bpy.data.objects.new("Room camera", camera_data)
bpy.context.collection.objects.link(camera)
camera.location = (7.05, -8.45, 5.60)
camera.rotation_euler = (Vector((0, .27, 1.10)) - camera.location).to_track_quat("-Z", "Y").to_euler()
camera_data.lens = 35
scene.camera = camera
scene.render.engine = "CYCLES"
scene.cycles.samples = 24
scene.render.resolution_x = 1420
scene.render.resolution_y = 870
scene.render.resolution_percentage = 100
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = 121
scene.frame_set(1)

for screen_layout in bpy.data.screens:
    for window_area in screen_layout.areas:
        if window_area.type == "VIEW_3D":
            space = window_area.spaces.active
            space.region_3d.view_perspective = "CAMERA"
            space.shading.color_type = "MATERIAL"
bpy.ops.object.select_all(action="DESELECT")

bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / "blender" / "andrew-desk.blend"), compress=True)

# Keep the authoring file editable. Batch static objects for fewer draw calls in the separate GLB.
bpy.ops.object.select_all(action="DESELECT")
static = [obj for obj in scene.objects if obj.type == "MESH" and obj.parent is None]
for obj in static:
    obj.select_set(True)
bpy.context.view_layer.objects.active = static[0]
bpy.ops.object.convert(target="MESH")
batches = {}
for obj in bpy.context.selected_objects:
    batches.setdefault(obj.data.materials[0].name, []).append(obj)
for name, objects in batches.items():
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    if len(objects) > 1:
        bpy.ops.object.join()
    bpy.context.object.name = f"Room · {name}"

bpy.ops.export_scene.gltf(
    filepath=str(ROOT / "public" / "scene" / "andrew-desk.glb"),
    export_format="GLB",
    export_apply=True,
    export_animation_mode="SCENE",
    export_cameras=False,
    export_lights=False,
    export_yup=True,
)
