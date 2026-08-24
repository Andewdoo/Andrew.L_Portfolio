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
const devLockPath = path.join(os.tmpdir(), "andrew-portfolio-next-development.lock.json");
const nextBin = path.join(projectNodeModules, "next", "dist", "bin", "next");

function getDevPort() {
  const portFlagIndex = args.findIndex((arg) => arg === "-p" || arg === "--port");
  const inlinePort = args.find((arg) => arg.startsWith("--port="));

  if (portFlagIndex >= 0 && args[portFlagIndex + 1]) {
    return args[portFlagIndex + 1];
  }

  if (inlinePort) {
    return inlinePort.slice("--port=".length);
  }

  return process.env.PORT ?? "3000";
}

function isProcessRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function acquireDevLock() {
  if (fs.existsSync(devLockPath)) {
    try {
      const activeLock = JSON.parse(fs.readFileSync(devLockPath, "utf8"));

      if (isProcessRunning(activeLock.pid)) {
        console.error(
          `Dev server not started: another portfolio server is already running on port ${activeLock.port} (PID ${activeLock.pid}). Stop it before starting a different port so both servers do not overwrite the shared Next.js cache.`,
        );
        return false;
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // A truncated lock is stale and can be replaced safely.
      }
    }
  }

  fs.writeFileSync(
    devLockPath,
    JSON.stringify({ pid: process.pid, port: getDevPort(), projectRoot }),
    "utf8",
  );
  return true;
}

function releaseDevLock() {
  if (!fs.existsSync(devLockPath)) {
    return;
  }

  try {
    const activeLock = JSON.parse(fs.readFileSync(devLockPath, "utf8"));
    if (activeLock.pid === process.pid) {
      fs.rmSync(devLockPath, { force: true });
    }
  } catch {
    // Leave an unreadable lock for the next startup to replace as stale.
  }
}

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
  if (!acquireDevLock()) {
    process.exit(1);
  }
  prepareCache();
  process.on("exit", releaseDevLock);
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
