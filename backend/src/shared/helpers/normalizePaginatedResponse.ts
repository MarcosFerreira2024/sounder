function normalizePaginatedResponse<T>(items: T[], page: number | undefined) {
  return {
    items,
    page: page ?? 1,
    totalItems: items.length,
  };
}
export { normalizePaginatedResponse };
