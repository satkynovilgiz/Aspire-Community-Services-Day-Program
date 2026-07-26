import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'site-content.json');

export function getContent() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function updateContent(patch) {
  const current = getContent();
  const next = {
    ...current,
    ...patch,
    contact: { ...current.contact, ...(patch.contact || {}) },
    director: { ...current.director, ...(patch.director || {}) },
    hero: { ...current.hero, ...(patch.hero || {}) },
    team: patch.team ?? current.team,
  };
  fs.writeFileSync(DATA_PATH, JSON.stringify(next, null, 2) + '\n');
  return next;
}
