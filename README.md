# Andrew Liu’s desk

This portfolio opens at a seated, first-person view of Andrew’s desk. Select an app on the monitor, the taped skills note, a framed photo, the instant camera, or the paper résumé. On a phone, the monitor has a six-app launcher. Each section supports keyboard navigation and Escape returns to the desk.

## Run

Use `npm ci` followed by `npm run dev`. The development server defaults to http://localhost:3000. Use `npm run build` and `npm start` to run the production version.

## Edit the desk in Blender

Open `blender/first-person-desk.blend` in Blender 5.3. The packed scene includes a left hand resting on the keyboard, a separate right-hand mouse rig, and the lights and materials for the walnut desk, woven mat, ceramic mug and keyboard. The 3344 × 1882 Cycles render uses the original 1672 × 941 camera framing.

The desk and shelf use a single Cycles render. Moving the pointer or dragging a finger animates the WebGL hand and mouse rig and its contact shadow. With a mouse or trackpad, the entire view also pans slightly toward the cursor. On portrait phones, two crops of the same render frame the six-app launcher. The wallpaper and accessible controls share one LCD opening. Reduced motion disables the pan and uses a still image for the hand and mouse. An image fallback is also available when WebGL is unavailable.

To rebuild the original procedural scene and web assets from the project root:

```powershell
node blender/prepare_plate.mjs
& "$env:ProgramFiles/Blender Foundation/Blender 5.3/blender.exe" --background --python-exit-code 1 --python blender/build_first_person.py
node blender/export_web.mjs
```

This regenerates the .blend file. Save manual modeling changes in a separate copy before rebuilding. Both hand poses and the mouse use the original grip meshes and painted finishes in `blender/mouse_rig.py`. The keyboard is in `blender/keyboard.py`. The web assets are in `public/scene/first-person`.

Run `node blender/desktop_wallpaper.mjs` to regenerate the monitor’s sunset wallpaper and `node blender/desktop_sprites.mjs` to regenerate the launcher artwork.

## Edit portfolio content

`src/data/content.ts` stores project details, photos, skills and contact links. Replace `public/Andrew-Liu-Resume.pdf` and its preview together. `src/components/MonitorDesktop.tsx` implements the computer apps, and `src/components/DeskViewport.tsx` positions the interactive objects in the scene.
