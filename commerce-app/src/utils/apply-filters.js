/**
 * Filters an array of items based on filter criteria, searching across all item properties.
 * @param {Array} items - The array of items to filter.
 * @param {Object} filters - An object representing the current filter state.
 * @returns {Array} - The filtered array of items.
 */
function applyFilters(items, filters) {
  return items.filter((item) => {
    let matchesSearch = true;
    let matchesCategory = true;

    if (filters.search) {
      const regex = new RegExp(filters.search, 'i'); // 'i' for case-insensitive
      matchesSearch = Object.values(item).some(prop => regex.test(String(prop)));
    }

    if (filters.category && filters.category !== 'all') {
      matchesCategory = item.category === filters.category;
    }

    return matchesSearch && matchesCategory;
  });
}

export default applyFilters;
