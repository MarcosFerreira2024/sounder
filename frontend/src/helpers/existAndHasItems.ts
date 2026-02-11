function existAndHasItems<T>(list?: T[] | null): list is T[] {
  if (!list) return false;
  return Array.isArray(list) && list.length > 0;
}

export default existAndHasItems;
