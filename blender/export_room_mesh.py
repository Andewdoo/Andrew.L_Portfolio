"""Bake off-axis views and export the evaluated desk solids as one draw call."""
from pathlib import Path
import sys

import bpy

sys.path.insert(0, str(Path(__file__).resolve().parent))
from desk_finishes import select_cycles_device
from reference_visibility import extend_hidden_surfaces

root = Path(__file__).resolve().parent.parent
excluded = {"Mouse and hand · interactive", "Skills note · interactive"}
scene = bpy.context.scene
web = root / "public" / "scene" / "first-person"
for group in scene.collection.children:
    group.hide_render = group.name in excluded
solids = [
    obj for obj in scene.objects
    if obj.type in {"MESH", "FONT"} and not any(group.name in excluded for group in obj.users_collection)
]
extend_hidden_surfaces(solids)

# These views provide surface color behind silhouettes that the center camera
# cannot see. A lens shift keeps the screen plane registered across all views.
scene.render.resolution_percentage = 75
scene.cycles.samples = 24
select_cycles_device(scene)
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGB"
scene.render.image_settings.quality = 94
camera = scene.camera
for label, offset in (("left", -.018), ("right", .018)):
    camera.location.x = offset
    camera.data.shift_x = -offset * 1300 / (2.681 * 1672)
    scene.render.filepath = str(web / f"desk-{label}.webp")
    bpy.ops.render.render(write_still=True)

bpy.ops.object.select_all(action="DESELECT")
for obj in solids:
    obj.select_set(True)
bpy.context.view_layer.objects.active = solids[0]
bpy.ops.object.convert(target="MESH")
bpy.ops.object.join()
room = bpy.context.object
room.name = "Desk and shelf"
room.data.materials.clear()

output = web / "desk-solids.glb"
bpy.ops.export_scene.gltf(
    filepath=str(output), use_selection=True, export_materials="NONE", export_animations=False,
    export_texcoords=False, export_normals=False, export_yup=True,
    export_meshopt_compression_enable=True,
)
