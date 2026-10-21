import { describe, expect, it } from 'vitest';
import pkg from '../package.json';
import en from '../messages/en.json';
import fr from '../messages/fr.json';
import { RELEASE } from '../lib/release';

// Every leaf path of a message file, with array indexes, so both locales must match exactly.
function paths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => paths(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => paths(child, `${prefix}.${key}`));
  }
  return [prefix];
}

describe('messages', () => {
  it('keeps French and English keys and list lengths identical', () => {
    expect(paths(en).sort()).toEqual(paths(fr).sort());
  });

  it('never ships an empty string', () => {
    for (const path of paths(fr)) {
      expect(path, path).not.toBe('');
    }
  });
});

describe('release', () => {
  it('matches the package version', () => {
    expect(RELEASE.version).toBe(pkg.version);
  });
});
