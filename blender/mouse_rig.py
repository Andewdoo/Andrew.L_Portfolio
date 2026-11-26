"""Build the original mouse grip and its mirrored keyboard pose."""

import math
from collections import Counter

import bpy
from mathutils import Vector
from mathutils.geometry import delaunay_2d_cdt

from desk_finishes import linear_swatch


# Paths are authored at twice the resolution of the lower right image crop.
MOUSE = [
    (61, 224),
    (65, 209, 92, 187, 124, 178),
    (145, 171, 173, 167, 188, 164),
    (203, 160, 220, 161, 242, 168),
    (270, 181, 289, 216, 290, 248),
    (291, 291, 274, 321, 240, 330),
    (212, 337, 165, 328, 139, 311),
    (117, 300, 93, 287, 79, 278),
    (68, 269, 60, 240, 61, 224),
]
PALM = [
    (134, 150),
    (142, 143, 152, 128, 164, 117),
    (176, 108, 192, 98, 209, 88),
    (218, 83, 225, 84, 231, 87),
    (241, 92, 253, 99, 264, 103),
    (276, 96, 287, 87, 299, 84),
    (306, 82, 311, 83, 318, 87),
    (337, 99, 351, 111, 364, 120),
    (375, 124, 389, 122, 397, 135),
    (401, 141, 403, 149, 410, 154),
    (419, 158, 432, 158, 438, 170),
    (443, 178, 444, 185, 449, 192),
    (459, 198, 466, 203, 472, 214),
    (491, 247, 506, 274, 519, 298),
    (529, 321, 528, 343, 511, 366),
    (465, 407, 397, 435, 342, 419),
    (304, 414, 270, 403, 241, 384),
    (225, 376, 211, 365, 201, 350),
    (191, 337, 177, 332, 161, 325),
    (147, 319, 142, 312, 141, 306),
    (138, 293, 134, 286, 137, 276),
    (140, 261, 150, 252, 160, 250),
    (174, 247, 186, 254, 199, 263),
    (213, 274, 236, 280, 250, 272),
    (258, 269, 260, 258, 260, 247),
    (260, 232, 260, 215, 260, 204),
    (255, 193, 248, 179, 242, 166),
    (230, 166, 219, 155, 210, 150),
    (203, 153, 194, 154, 188, 156),
    (184, 164, 173, 165, 165, 166),
    (155, 167, 146, 170, 141, 171),
    (132, 169, 128, 158, 134, 150),
]
CUFF = [
    (303, 454),
    (304, 416, 325, 375, 356, 345),
    (395, 308, 450, 288, 501, 293),
    (550, 295, 592, 308, 608, 334),
    (625, 362, 637, 383, 653, 402),
    (663, 439, 594, 509, 508, 548),
    (449, 582, 397, 607, 351, 589),
    (343, 554, 331, 519, 314, 497),
    (306, 484, 300, 470, 303, 454),
]
SLEEVE = [
    (355, 572),
    (377, 519, 412, 474, 459, 443),
    (522, 402, 582, 390, 648, 397),
    (697, 400, 722, 401, 740, 419),
    (752, 432, 762, 444, 767, 448),
    (811, 474, 833, 488, 865, 514),
    (886, 533, 905, 555, 935, 571),
    (989, 604, 1085, 638, 1162, 670),
    (1110, 756, 992, 840, 837, 879),
    (662, 822, 472, 766, 374, 712),
    (355, 672, 341, 610, 355, 572),
]


def materials(image):
    def finish(name, white_wool=False):
        mat = bpy.data.materials.new(name)
        mat.use_nodes = True
        nodes, link = mat.node_tree.nodes, mat.node_tree.links.new
        nodes.clear()
        uv = nodes.new("ShaderNodeUVMap")
        uv.uv_map = "Desk study"
        paint = nodes.new("ShaderNodeTexImage")
        paint.image = image
        paint.interpolation = "Cubic"
        paint.extension = "EXTEND"
        link(uv.outputs["UV"], paint.inputs["Vector"])
        color = paint.outputs["Color"]
        if white_wool:
            luminance = nodes.new("ShaderNodeRGBToBW")
            link(color, luminance.inputs[0])
            ramp = nodes.new("ShaderNodeValToRGB")
            ramp.color_ramp.elements[0].color = (.18, .18, .18, 1)
            ramp.color_ramp.elements[1].position = .14
            ramp.color_ramp.elements[1].color = (.89, .89, .89, 1)
            ramp.color_ramp.elements.new(.030).color = (.51, .51, .51, 1)
            link(luminance.outputs[0], ramp.inputs[0])
            color = ramp.outputs["Color"]
        emission = nodes.new("ShaderNodeEmission")
        link(color, emission.inputs["Color"])
        output = nodes.new("ShaderNodeOutputMaterial")
        link(emission.outputs[0], output.inputs["Surface"])
        return mat

    mouse = finish("Mouse · painted finish")
    skin = finish("Hands · warm beige skin")
    nodes, link = skin.node_tree.nodes, skin.node_tree.links.new
    paint = next(node for node in nodes if node.type == "TEX_IMAGE")
    emission = next(node for node in nodes if node.type == "EMISSION")
    output = next(node for node in nodes if node.type == "OUTPUT_MATERIAL")
    uv = next(node for node in nodes if node.type == "UVMAP")

    # Retain the reference's colored bounce light and gently lift its shadows.
    tone = nodes.new("ShaderNodeMixRGB")
    tone.blend_type = "MIX"
    tone.inputs[0].default_value = .34
    tone.inputs[2].default_value = (.54, .37, .26, 1)
    link(paint.outputs["Color"], tone.inputs[1])

    pores = nodes.new("ShaderNodeTexNoise")
    pores.inputs["Scale"].default_value = 440
    pores.inputs["Detail"].default_value = 2
    link(uv.outputs["UV"], pores.inputs["Vector"])
    variation = nodes.new("ShaderNodeMapRange")
    variation.inputs["To Min"].default_value = .88
    variation.inputs["To Max"].default_value = 1.07
    link(pores.outputs["Fac"], variation.inputs["Value"])
    folds = nodes.new("ShaderNodeVertexColor")
    folds.layer_name = "Skin folds"
    detail = nodes.new("ShaderNodeMath")
    detail.operation = "MULTIPLY"
    link(variation.outputs[0], detail.inputs[0])
    link(folds.outputs["Color"], detail.inputs[1])
    pigment = nodes.new("ShaderNodeMixRGB")
    pigment.blend_type = "MULTIPLY"
    pigment.inputs[0].default_value = 1
    link(tone.outputs[0], pigment.inputs[1])
    link(detail.outputs[0], pigment.inputs[2])
    link(pigment.outputs[0], emission.inputs["Color"])

    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = .22
    bump.inputs["Distance"].default_value = .0011
    link(pores.outputs["Fac"], bump.inputs["Height"])
    surface = nodes.new("ShaderNodeBsdfPrincipled")
    surface.inputs["Roughness"].default_value = .48
    surface.inputs["Subsurface Weight"].default_value = .08
    surface.inputs["Subsurface Scale"].default_value = .016
    link(pigment.outputs[0], surface.inputs["Base Color"])
    link(bump.outputs["Normal"], surface.inputs["Normal"])
    mix = nodes.new("ShaderNodeMixShader")
    mix.inputs[0].default_value = .30
    link(emission.outputs[0], mix.inputs[1])
    link(surface.outputs[0], mix.inputs[2])
    link(mix.outputs[0], output.inputs["Surface"])
    return mouse, skin, finish("Sweater · white wool", True)


def outline(path):
    start = Vector(path[0])
    points = [start]
    for coords in path[1:]:
        c1, c2, end = (Vector(coords[i:i + 2]) for i in (0, 2, 4))
        length = (start - c1).length + (c1 - c2).length + (c2 - end).length
        steps = max(3, math.ceil(length / 8))
        for j in range(1, steps + 1):
            t = j / steps
            s = 1 - t
            points.append(start * s**3 + 3 * c1 * s*s*t + 3 * c2 * s*t*t + end * t**3)
        start = end
    return points[:-1]


def palm_shape(x, y):
    features = [
        (213, 113, 50, 21, .010, -.42),
        (263, 157, 79, 25, .013, .91),
        (307, 112, 50, 19, .013, .60),
        (353, 161, 68, 21, .010, .79),
        (395, 181, 68, 21, .008, .96),
        (433, 213, 49, 20, .006, .99),
        (218, 306, 68, 29, .016, .31),
        (170, 278, 28, 18, .007, -.64),
        (346, 269, 105, 60, .024, .84),
        (311, 214, 88, 13, .006, .99),
        (355, 210, 77, 12, .005, 1.05),
    ]
    depth = 0
    for cx, cy, width, height, lift, angle in features:
        dx, dy = x - cx, y - cy
        a = (dx * math.cos(angle) + dy * math.sin(angle)) / width
        b = (-dx * math.sin(angle) + dy * math.cos(angle)) / height
        depth += lift * math.exp(-(a*a + b*b))
    return depth


def skin_folds(x, y):
    # Taper parallel folds across the bent finger joints and thumb.
    joints = [
        (185, 122, 16, .91, .15),
        (230, 109, 15, 1.15, .11),
        (306, 117, 15, 1.91, .12),
        (361, 146, 13, 2.03, .10),
        (398, 174, 11, 2.04, .10),
        (175, 287, 14, 1.03, .16),
    ]
    shade = 1
    for cx, cy, span, angle, strength in joints:
        dx, dy = x - cx, y - cy
        along = (dx * math.cos(angle) + dy * math.sin(angle)) / span
        across = -dx * math.sin(angle) + dy * math.cos(angle) - 2.6 * along**2
        weight = math.exp(-along**2)
        shade -= strength * weight * (
            math.exp(-(across / 2.7)**2) + .62 * math.exp(-((across - 6) / 2.1)**2)
        )
    return shade


def shell(b, name, path, spacing, depth_offset, height, thickness, shape=None, *, keyboard=False):
    ring = outline(path)
    points = ring.copy()
    xmin, ymin = (math.floor(min(p[i] for p in ring)) for i in range(2))
    xmax, ymax = (math.ceil(max(p[i] for p in ring)) for i in range(2))
    for j, y in enumerate(range(ymin + spacing, ymax, spacing)):
        for x in range(xmin + spacing + (j % 2) * spacing // 2, xmax, spacing):
            points.append(Vector((x, y)))
    xy, _, triangles, *_ = delaunay_2d_cdt(points, [], [list(range(len(ring)))], 1, .0001, False)
    edge_counts = Counter()
    oriented_edges = {}
    for tri in triangles:
        for i, a in enumerate(tri):
            edge = (a, tri[(i + 1) % 3])
            key = tuple(sorted(edge))
            edge_counts[key] += 1
            oriented_edges[key] = edge
    edges = [oriented_edges[key] for key, count in edge_counts.items() if count == 1]
    used = sorted({i for tri in triangles for i in tri})
    indices = {old: new for new, old in enumerate(used)}
    segments = []
    for i, p in enumerate(ring):
        line = ring[(i + 1) % len(ring)] - p
        segments.append((p, line, max(.001, line.length_squared)))
    top, bottom, uv = [], [], []
    for i in used:
        p = xy[i]
        x, y = p
        distance_sq = float("inf")
        for a, line, length_sq in segments:
            fraction = max(0, min(1, (p - a).dot(line) / length_sq))
            distance_sq = min(distance_sq, (p - (a + line * fraction)).length_squared)
        crown = math.sqrt(1 - math.exp(-math.sqrt(distance_sq) / 24))
        u, v = 1180 + x / 2, 655 + y / 2
        uv.append((u / 1672, 1 - v / 941))
        relief = crown * (height + (shape(x, y) if shape else 0))
        back = thickness * (.12 + .88 * crown)
        if keyboard:
            # Mirror across the desk and rotate toward the letter keys. Give
            # the fingertips a shallow pitch so the wrist sits below the keys.
            u = 537 - .484 * (x - 435) - .019 * (y - 336)
            v = 839 + .090 * (x - 435) + .486 * (y - 336)
            z = -.677 + .00031 * (840 - v) + .36 * depth_offset
            depth_per_height = 1300 / (v - 230)
            top.append(b.point(u, v, -(z + .36 * relief) * depth_per_height))
            bottom.append(b.point(u, v, -(z - .36 * back) * depth_per_height))
        else:
            base = 1.73 - .00155 * (v - 734) - depth_offset
            top.append(b.point(u, v, base - relief))
            bottom.append(b.point(u, v, base + back))
    count = len(top)
    faces = []
    for tri in triangles:
        face = [indices[i] for i in tri]
        faces.extend([face[::-1], [i + count for i in face]])
    for a, c in edges:
        a, c = indices[a], indices[c]
        faces.append((a, c, c + count, a + count))
    if keyboard:
        faces = [face[::-1] for face in faces]
    obj = b.mesh(name, top + bottom, faces)
    paint = obj.data.uv_layers.new(name="Desk study")
    for poly in obj.data.polygons:
        poly.use_smooth = True
    for loop in obj.data.loops:
        paint.data[loop.index].uv = uv[loop.vertex_index % count]
    if shape is palm_shape:
        folds = obj.data.color_attributes.new(name="Skin folds", type="FLOAT_COLOR", domain="POINT")
        for index, point in enumerate(used):
            shade = skin_folds(*xy[point])
            folds.data[index].color = folds.data[index + count].color = (shade, shade, shade, 1)


def mouse_accents(b):
    material = bpy.data.materials.new("Mouse accents · warm ink")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    emission = nodes.new("ShaderNodeEmission")
    emission.inputs["Color"].default_value = linear_swatch("f6d5bb")
    material.node_tree.links.new(emission.outputs[0], nodes["Material Output"].inputs["Surface"])
    b.material = material
    for index, (start, end) in enumerate([
        ((1210.6, 694), (1217.1, 710.3)),
        ((1191.8, 705.5), (1206.5, 718.5)),
        ((1184.6, 727.4), (1200.1, 730.6)),
    ], 1):
        start, end = Vector(start), Vector(end)
        direction = end - start
        heading = math.atan2(direction.y, direction.x)
        outline = []
        for center, angle in ((end, heading), (start, heading + math.pi)):
            for step in range(7):
                a = angle - math.pi / 2 + step * math.pi / 6
                outline.append(center + 1.8 * Vector((math.cos(a), math.sin(a))))
        # Place the ink at mouse depth so it travels with the grip.
        b.prism(f"Mouse accent {index}", [b.point(x, y, 1.68) for x, y in outline],
                Vector((0, .001, 0)))


def build(b, finish, *, keyboard=False):
    mouse, skin, wool = finish
    side = "Left" if keyboard else "Right"
    if not keyboard:
        b.material = mouse
        shell(b, "Mouse / optical chassis", MOUSE, 15, 0, .024, .019)
        scroll = [(180,166), (184,163,195,161,201,164), (208,167,201,171,193,172),
                  (188,173,180,172,179,170), (178,168,179,167,180,166)]
        shell(b, "Mouse / recessed scroll wheel", scroll, 4, .034, .004, .002)
        mouse_accents(b)
    b.material = skin
    shell(b, side + " hand / knuckles, palm and thumb", PALM, 5, .049, .021, .025,
          palm_shape, keyboard=keyboard)
    b.material = wool
    shell(b, side + " sweater / rib-knit cuff", CUFF, 9, .115, .032, .036,
          lambda x, y: .002 * math.cos((x - .44*y) * .27), keyboard=keyboard)
    shell(b, side + " sweater / forearm and folded wool", SLEEVE, 17, .184, .045, .042,
          lambda x, y: .018 * math.exp(-((y - 476 - .3*(x - 650))/34)**2), keyboard=keyboard)
