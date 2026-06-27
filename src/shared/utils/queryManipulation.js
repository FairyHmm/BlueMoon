export const normalizeSearch = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();

export const searchTerms = (query) =>
  normalizeSearch(query).split(/\s+/).filter(Boolean);

export const matchesSearch = (term, ...values) =>
  values.some((value) => normalizeSearch(value).includes(term));
