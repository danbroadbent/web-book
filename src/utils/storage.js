const STORAGE_PREFIX = 'web-book';

export function savePosition(bookId, position) {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}:${bookId}:position`,
      JSON.stringify(position)
    );
  } catch (e) {
    console.warn('Failed to save position', e);
  }
}

export function loadPosition(bookId) {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}:${bookId}:position`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function clearPosition(bookId) {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}:${bookId}:position`);
  } catch (e) {
    console.warn('Failed to clear position', e);
  }
}
