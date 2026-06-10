/**
 * STAGE 1 — Discovery
 * Finds all SKILL.md files and loads ONLY name + description.
 * Full skill body is stored but NOT sent to Claude yet.
 */

import fs from "fs/promises";
import path from "path";
import { parseSkillFile } from "./parse-skill.js";

export async function discoverSkills(skillsDir) {
  const skills = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return; // folder doesn't exist yet — that's ok
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name === "SKILL.md") {
        const raw = await fs.readFile(fullPath, "utf-8");
        const folderName = path.basename(path.dirname(fullPath));
        const skill = parseSkillFile(raw, folderName);

        skills.push({
          ...skill,
          path: fullPath,
        });
      }
    }
  }

  await walk(skillsDir);
  return skills;
}
