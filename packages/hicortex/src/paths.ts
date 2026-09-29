/**
 * Canonical Hicortex home resolution — the single source of truth (#174).
 *
 * Honors the HICORTEX_HOME env override (a headless/test seam, mirroring the
 * HICORTEX_DB_PATH convention in db.ts); otherwise defaults to ~/.hicortex.
 * Every module that needs the home dir routes through here, so the override
 * behaves consistently across all commands instead of being honored by some
 * (identity-cli, learnings-identity) and hardcoded away by others.
 */
import { homedir } from "node:os";
import { join } from "node:path";

export function hicortexHome(): string {
  return process.env.HICORTEX_HOME ?? join(homedir(), ".hicortex");
}

/**
 * Claude Code config dir. Honors CLAUDE_CONFIG_DIR (Claude Code's own
 * override for relocating ~/.claude); otherwise defaults to ~/.claude.
 * settings.json, commands/, CLAUDE.md and projects/ all live under it.
 */
export function claudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

/**
 * Claude Code's global config file (MCP server registrations). It sits
 * inside CLAUDE_CONFIG_DIR when that is set, and at ~/.claude.json otherwise.
 */
export function claudeGlobalConfigPath(): string {
  const dir = process.env.CLAUDE_CONFIG_DIR;
  return dir ? join(dir, ".claude.json") : join(homedir(), ".claude.json");
}
