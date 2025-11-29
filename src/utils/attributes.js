export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function parseAttribute(value, type) {
  if (value === null) return null;
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return value !== 'false';
    default:
      return value;
  }
}
