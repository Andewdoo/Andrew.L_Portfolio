"""Extend reference colors over the narrow strips revealed by the side cameras."""
import bpy
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree


def reference_depth(solids):
    graph = bpy.context.evaluated_depsgraph_get()
    points, faces = [], []
    for obj in solids:
        evaluated = obj.evaluated_get(graph)
        mesh = evaluated.to_mesh()
        mesh.calc_loop_triangles()
        start = len(points)
        points.extend(evaluated.matrix_world @ vertex.co for vertex in mesh.vertices)
        faces.extend(tuple(start + i for i in tri.vertices) for tri in mesh.loop_triangles)
        evaluated.to_mesh_clear()
    tree = BVHTree.FromPolygons(points, faces, all_triangles=True)
    width, height = 836, 471
    pixels = np.ones((height, width, 4), dtype=np.float32)
    origin = Vector((0, 0, 0))
    for row in range(height):
        z = (230 - (height - row - .5) * 941 / height) / 1300
        for col in range(width):
            ray = Vector((((col + .5) * 2 - 836) / 1300, 1., z))
            hit, _, _, _ = tree.ray_cast(origin, ray)
            pixels[row, col, 0] = hit.y / 8 if hit else 1.
    image = bpy.data.images.new("Reference camera distance", width, height, float_buffer=True)
    image.colorspace_settings.name = "Non-Color"
    # Require a small clear footprint on the receiving surface. Edge texels in
    # the color plate include filtered light from the foreground silhouette.
    padded = np.pad(pixels[:, :, 0], 1, mode="edge")
    pixels[:, :, 0] = np.minimum.reduce([
        padded[y:y + height, x:x + width] for y in range(3) for x in range(3)
    ])
    image.pixels.foreach_set(pixels.ravel())
    image.update()
    return image


def extend_hidden_surfaces(solids):
    depth = reference_depth(solids)
    group = bpy.data.node_groups.new("Camera-matched edge colors", "ShaderNodeTree")
    for name, kind, direction in (
        ("UV", "NodeSocketVector", "INPUT"), ("Distance", "NodeSocketFloat", "INPUT"),
        ("Sample UV", "NodeSocketVector", "OUTPUT"), ("Visible", "NodeSocketFloat", "OUTPUT")
    ):
        group.interface.new_socket(name=name, in_out=direction, socket_type=kind)
    nodes, link = group.nodes, group.links.new
    inputs, outputs = nodes.new("NodeGroupInput"), nodes.new("NodeGroupOutput")
    # A physical material supplies surfaces that none of these nearby rays saw.
    best_uv = inputs.outputs["UV"]
    valid = nodes.new("ShaderNodeValue").outputs[0]
    valid.default_value = 0.
    for dx, dy in ((-12,0),(12,0),(0,-6),(0,6),(-5,0),(5,0),(0,0)):
        offset = nodes.new("ShaderNodeVectorMath")
        offset.operation = "ADD"
        link(inputs.outputs["UV"], offset.inputs[0])
        offset.inputs[1].default_value = (dx / 1672, dy / 941, 0)
        sample = nodes.new("ShaderNodeTexImage")
        sample.image, sample.interpolation, sample.extension = depth, "Closest", "EXTEND"
        link(offset.outputs[0], sample.inputs["Vector"])
        channels = nodes.new("ShaderNodeSeparateColor")
        link(sample.outputs["Color"], channels.inputs[0])
        distance = nodes.new("ShaderNodeMath")
        distance.operation = "MULTIPLY"
        link(channels.outputs[0], distance.inputs[0])
        distance.inputs[1].default_value = 8.
        matches = nodes.new("ShaderNodeMath")
        matches.operation = "COMPARE"
        link(inputs.outputs["Distance"], matches.inputs[0])
        link(distance.outputs[0], matches.inputs[1])
        matches.inputs[2].default_value = .045
        choose = nodes.new("ShaderNodeMix")
        choose.data_type = "VECTOR"
        active = {socket.name: socket for socket in choose.inputs if socket.enabled}
        link(matches.outputs[0], active["Factor"])
        link(best_uv, active["A"])
        link(offset.outputs[0], active["B"])
        best_uv = next(socket for socket in choose.outputs if socket.enabled)
        any_hit = nodes.new("ShaderNodeMath")
        any_hit.operation = "MAXIMUM"
        link(valid, any_hit.inputs[0])
        link(matches.outputs[0], any_hit.inputs[1])
        valid = any_hit.outputs[0]
    link(best_uv, outputs.inputs["Sample UV"])
    link(valid, outputs.inputs["Visible"])

    for mat in {mat for obj in solids for mat in obj.data.materials if mat}:
        nodes, link = mat.node_tree.nodes, mat.node_tree.links.new
        mix = nodes.get("Reference finish")
        if not mix:
            continue
        image = next(n for n in nodes if n.type == "TEX_IMAGE")
        uv = image.inputs["Vector"].links[0].from_socket
        axes = next(n for n in nodes if n.type == "SEPXYZ")
        lookup = nodes.new("ShaderNodeGroup")
        lookup.node_tree = group
        link(uv, lookup.inputs["UV"])
        link(axes.outputs["Y"], lookup.inputs["Distance"])
        link(lookup.outputs["Sample UV"], image.inputs["Vector"])
        painted = mix.inputs[0].links[0].from_socket
        amount = nodes.new("ShaderNodeMath")
        amount.operation = "MULTIPLY"
        link(painted, amount.inputs[0])
        link(lookup.outputs["Visible"], amount.inputs[1])
        link(amount.outputs[0], mix.inputs[0])
