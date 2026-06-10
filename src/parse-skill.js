/**
 * Reads a SKILL.md file and splits it into metadata + body.
 * Uses gray-matter to parse the YAML frontmatter.
 */

import matter from "gray-matter";

export function parseSkillFile(content, folderName) {
  const { data, content: body } = matter(content);

  // Required fields from the Agent Skills spec
  if (!data.name || !data.description) {
    throw new Error("SKILL.md must have 'name' and 'description' in frontmatter");
  }

  // Spec rule: name must match the parent folder name
  if (data.name !== folderName) {
    throw new Error(
      `Skill name "${data.name}" does not match folder "${folderName}"`
    );
  }

  return {
    name: data.name,
    description: data.description,
    body: body.trim(),
  };
}
