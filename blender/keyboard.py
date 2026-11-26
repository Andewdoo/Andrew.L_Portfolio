"""Model the full-size mechanical keyboard in the first-person desk scene."""
import math

import bpy
from mathutils import Vector

from desk_finishes import linear_swatch


def material(name, color, roughness, metallic=0, grain=0, emission=0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    mat.diffuse_color = linear_swatch(color)
    nodes = mat.node_tree.nodes
    link = mat.node_tree.links.new
    shader = nodes["Principled BSDF"]
    shader.inputs["Base Color"].default_value = mat.diffuse_color
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    if grain:
        coordinates = nodes.new("ShaderNodeTexCoord")
        noise = nodes.new("ShaderNodeTexNoise")
        noise.inputs["Scale"].default_value = 480
        noise.inputs["Detail"].default_value = 2
        bump = nodes.new("ShaderNodeBump")
        bump.inputs["Strength"].default_value = grain
        bump.inputs["Distance"].default_value = .0003
        link(coordinates.outputs["Object"], noise.inputs["Vector"])
        link(noise.outputs["Fac"], bump.inputs["Height"])
        link(bump.outputs["Normal"], shader.inputs["Normal"])
    if emission:
        shader.inputs["Emission Color"].default_value = mat.diffuse_color
        shader.inputs["Emission Strength"].default_value = emission
    return mat


def rounded_rect(width, depth, radius, subdivide_sides):
    points = []
    for x, y, angle in [(1, 1, 0), (-1, 1, 90), (-1, -1, 180), (1, -1, 270)]:
        for step in range(5):
            a = math.radians(angle + step * 22.5)
            points.append((x * (width / 2 - radius) + radius * math.cos(a),
                           y * (depth / 2 - radius) + radius * math.sin(a)))
        if subdivide_sides and angle in (90, 270):
            # Sample the straight edge too so the dish curves between the corners.
            points.extend((x * width / 2, y * (depth / 2 - radius) * v)
                          for v in (.75, .5, .25, 0, -.25, -.5, -.75))
    return points


def build(b):
    previous_material = b.material
    case = material("Keyboard / bead-blasted graphite aluminum", "49484a", .39, .65, .21)
    gasket = material("Keyboard / black elastomer and switches", "201f21", .76)
    plate = material("Keyboard / satin bronze switch plate", "62595a", .41, .48)
    caps = material("Keyboard / textured pearl PBT", "b5afa9", .49, grain=.29)
    modifiers = material("Keyboard / textured graphite PBT", "686564", .49, grain=.29)
    accent = material("Keyboard / muted apricot PBT", "c28261", .49, grain=.29)
    ink = material("Keyboard / charcoal legends", "302d2d", .62)
    pale_ink = material("Keyboard / warm grey legends", "e7e2dd", .62)
    leds = material("Keyboard / amber switch lights", "ffa752", .48, emission=.22)

    center, front, back = -.05, 1.49, 1.746
    middle = (front + back) / 2
    unit = .0334
    slope = .065

    def height(y, z):
        return z + (y - middle) * slope

    def rings(name, x, y, profiles, finish, cup=0, level_rings=0):
        vertices = []
        for i, (width, depth, radius, z, dish) in enumerate(profiles):
            for u, v in rounded_rect(width, depth, radius, subdivide_sides=bool(cup)):
                relief = cup * (1 - (2 * v / depth) ** 2) if dish else 0
                vertices.append((x + u, y + v, z if i < level_rings else height(y + v, z - relief)))
        count = len(vertices) // len(profiles)
        faces = [tuple(reversed(range(count)))]
        faces.extend((i + j, i + (j + 1) % count, i + count + (j + 1) % count, i + count + j)
                     for i in range(0, len(vertices) - count, count) for j in range(count))
        top = range(len(vertices) - count, len(vertices))
        first_top_face = len(faces)
        if cup:
            rows = {}
            for i in top:
                rows.setdefault(round(vertices[i][1], 7), []).append(i)
            edges = [sorted(row, key=lambda i: vertices[i][0]) for _, row in sorted(rows.items())]
            faces.extend((left, right, next_right, next_left)
                         for (left, right), (next_left, next_right) in zip(edges, edges[1:]))
        else:
            faces.append(tuple(top))
        b.material = finish
        obj = b.mesh("Keyboard / " + name, vertices, faces)
        if cup:
            for polygon in list(obj.data.polygons)[first_top_face:]:
                polygon.use_smooth = True
        return obj

    def part(name, x, y, w, d, radius, z, thickness, finish):
        bevel = min(.0013, thickness / 3)
        return rings(name, x, y, [
            (w - 2 * bevel, d - 2 * bevel, radius - bevel, z, False),
            (w, d, radius, z + bevel, False),
            (w, d, radius, z + thickness - bevel, False),
            (w - 2 * bevel, d - 2 * bevel, radius - bevel, z + thickness, False),
        ], finish)

    depth = back - front
    rings("One-piece aluminum case", center, middle, [
        (.790, depth - .002, .009, -.6955, False),
        (.792, depth, .010, -.694, False),
        (.792, depth, .010, -.662, False),
        (.788, depth - .004, .008, -.660, False),
    ], case, level_rings=2)
    part("Inset switch plate", center, middle + .004, .765, depth - .026, .007, -.661, .0018, plate)

    def legend(label, x, y, z, finish):
        text = bpy.data.curves.new("Keyboard legend", "FONT")
        text.body = label
        text.size = .012 if len(label) == 1 else .008
        text.align_x = "CENTER"
        text.align_y = "CENTER"
        text.resolution_u = 5
        text.materials.append(finish)
        obj = bpy.data.objects.new("Keyboard / legend " + label, text)
        b.group.objects.link(obj)
        obj.location = Vector((x, y, height(y, z)))
        obj.rotation_euler.x = math.atan(slope)

    def key(label, x, y, row, width=1, length=1, color=None):
        top = -.633 + (.001, .003, .001, 0, .001, .002)[row]
        bottom = top - .019
        w, d = width * unit - .0025, length * unit - .0026
        part("Switch housing", x, y, .017, .018, .002, -.660, .012, gasket)
        part("South-facing LED", x, y - .008, .006, .0035, .001, -.659, .0035, leds)
        rings("Sculpted cap " + (label or "Space"), x, y, [
            (w - .0014, d - .0014, .0024, bottom, False),
            (w, d, .0028, bottom + .0012, False),
            (w - .006, d - .006, .004, top - .0025, False),
            (w - .008, d - .008, .004, top, False),
            (w - .010, d - .010, .0035, top - .00025, True),
            (w - .014, d - .014, .0025, top - .00055, True),
        ], color or caps, cup=.0012)
        if label:
            # The shallow dish seats each legend just above the key's top surface.
            legend(label, x, y, top - .00075, ink if color != modifiers else pale_ink)

    left = center - 11.42 * unit
    rows_y = [1.719, 1.669, 1.635, 1.601, 1.567, 1.533]

    def row_keys(row, labels, offset=0):
        x = left + offset * unit
        for item in labels:
            if isinstance(item, (float, int)):
                x += item * unit
                continue
            label, width, color = (item, 1, None) if isinstance(item, str) else item
            key(label, x + width * unit / 2, rows_y[row], row, width, color=color)
            x += width * unit

    row_keys(0, [("Esc", 1, accent), .65, "F1", "F2", "F3", "F4", .45,
                 "F5", "F6", "F7", "F8", .45, "F9", "F10", "F11", "F12"])
    row_keys(1, [*"`1234567890-=", ("Backspace", 2, modifiers)])
    row_keys(2, [("Tab", 1.5, modifiers), *"QWERTYUIOP[]", ("\\", 1.5, None)])
    row_keys(3, [("Caps", 1.75, modifiers), *"ASDFGHJKL;'", ("Enter", 2.25, accent)])
    row_keys(4, [("Shift", 2.25, modifiers), *"ZXCVBNM,./", ("Shift", 2.75, modifiers)])
    row_keys(5, [("Ctrl", 1.25, modifiers), ("Win", 1.25, modifiers), ("Alt", 1.25, modifiers),
                 ("", 6.25, None), ("Alt", 1.25, modifiers), ("Fn", 1.25, modifiers),
                 ("Menu", 1.25, modifiers), ("Ctrl", 1.25, modifiers)])

    nav, num = 15.38, 18.79
    for row, labels in enumerate([
        ["PrtSc", "ScrLk", "Pause"], ["Ins", "Home", "PgUp"], ["Del", "End", "PgDn"],
        [], [1, "↑"], ["←", "↓", "→"],
    ]):
        row_keys(row, labels, nav)
    for row, labels in enumerate([["Num", "/", "*", "-"], ["7", "8", "9"], ["4", "5", "6"],
                                  ["1", "2", "3"], [("0", 2, None), "."]], start=1):
        row_keys(row, labels, num)
    for row, label in [(2, "+"), (4, "Enter")]:
        key(label, left + (num + 3.5) * unit, (rows_y[row] + rows_y[row + 1]) / 2,
            row, length=2, color=modifiers)
    for i in range(3):
        part("Lock indicator", left + (num + .7 + .84 * i) * unit, rows_y[0], .010, .003,
             .0011, -.659, .0017, leds if i == 0 else gasket)

    b.material = previous_material
