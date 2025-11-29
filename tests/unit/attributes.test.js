import { describe, it, expect } from 'vitest';
import {
  kebabToCamel,
  camelToKebab,
  parseAttribute,
} from '../../src/utils/attributes.js';

describe('Attribute Utils', () => {
  describe('kebabToCamel', () => {
    it('converts kebab-case to camelCase', () => {
      expect(kebabToCamel('my-attribute')).toBe('myAttribute');
      expect(kebabToCamel('another-long-attribute')).toBe(
        'anotherLongAttribute'
      );
    });

    it('leaves single words alone', () => {
      expect(kebabToCamel('simple')).toBe('simple');
    });
  });

  describe('camelToKebab', () => {
    it('converts camelCase to kebab-case', () => {
      expect(camelToKebab('myAttribute')).toBe('my-attribute');
      expect(camelToKebab('anotherLongAttribute')).toBe(
        'another-long-attribute'
      );
    });

    it('leaves single words alone', () => {
      expect(camelToKebab('simple')).toBe('simple');
    });
  });

  describe('parseAttribute', () => {
    it('parses numbers', () => {
      expect(parseAttribute('123', 'number')).toBe(123);
      expect(parseAttribute('0', 'number')).toBe(0);
    });

    it('parses booleans', () => {
      expect(parseAttribute('true', 'boolean')).toBe(true);
      expect(parseAttribute('false', 'boolean')).toBe(false);
      expect(parseAttribute('', 'boolean')).toBe(true); // Empty attribute usually means true in HTML
    });

    it('returns strings by default', () => {
      expect(parseAttribute('some value', 'string')).toBe('some value');
    });

    it('returns null for null input', () => {
      expect(parseAttribute(null, 'number')).toBe(null);
    });
  });
});
