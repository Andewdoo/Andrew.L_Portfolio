import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const command = process.argv[2] ?? "dev";
const args = process.argv.slice(3);
const projectRoot = process.cwd();
const projectNodeModules = path.join(projectRoot, "node_modules");
const isDevelopment = command === "dev";
const distDirName = isDevelopment ? ".next" : ".next-production";
const nextLinkPath = path.join(projectRoot, ".next");
const cacheRoot = path.join(os.tmpdir(), "andrew-portfolio-next-development");
const nextBin = path.join(projectNodeModules, "next", "dist", "bin", "next");

function removePath(targetPath) {
  fs.rmSync(targetPath, { force: true, recursive: true });
}

function ensureJunction(linkPath, targetPath) {
  if (fs.existsSync(linkPath)) {
    const stat = fs.lstatSync(linkPath);
    const currentTarget = stat.isSymbolicLink() ? fs.realpathSync.native(linkPath) : null;

    if (currentTarget && path.resolve(currentTarget).toLowerCase() === path.resolve(targetPath).toLowerCase()) {
      return;
    }

    removePath(linkPath);
  }

  fs.mkdirSync(path.dirname(linkPath), { recursive: true });
  fs.symlinkSync(targetPath, linkPath, "junction");
}

function prepareCache() {
  fs.mkdirSync(cacheRoot, { recursive: true });
  ensureJunction(nextLinkPath, cacheRoot);
}

if (isDevelopment) {
  prepareCache();
}

const next = spawn(process.execPath, [nextBin, command, ...args], {
  cwd: projectRoot,
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDirName,
    NODE_PATH: [projectNodeModules, process.env.NODE_PATH].filter(Boolean).join(path.delimiter),
  },
  shell: false,
  stdio: "inherit",
});

next.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
