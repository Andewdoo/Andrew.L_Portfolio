import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const command = process.argv[2] ?? "dev";
const args = process.argv.slice(3);
const projectRoot = process.cwd();
const projectNodeModules = path.join(projectRoot, "node_modules");
const nextLinkPath = path.join(projectRoot, ".next");
const cacheRoot = path.join(os.tmpdir(), "andrew-portfolio-next-cache");
const cacheNodeModules = path.join(cacheRoot, "node_modules");
const nextBin = path.join(projectNodeModules, "next", "dist", "bin", "next");

function removePath(targetPath) {
  fs.rmSync(targetPath, { force: true, recursive: true });
}

function ensureJunction(linkPath, targetPath) {
  if (fs.existsSync(linkPath)) {
    const stat = fs.lstatSync(linkPath);
    const currentTarget = stat.isSymbolicLink() ? fs.readlinkSync(linkPath) : null;

    if (stat.isSymbolicLink() && path.resolve(path.dirname(linkPath), currentTarget) === targetPath) {
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

  if (fs.existsSync(projectNodeModules)) {
    ensureJunction(cacheNodeModules, projectNodeModules);
  }
}

prepareCache();

const keepCacheLinked = setInterval(prepareCache, 500);
const next = spawn(process.execPath, [nextBin, command, ...args], {
  cwd: projectRoot,
  shell: false,
  stdio: "inherit",
});

next.on("exit", (code, signal) => {
  clearInterval(keepCacheLinked);

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
