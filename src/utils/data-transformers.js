export const getGroupedApartmentData = (apartments, residents, vehicles, bills, query = "") => {
  const joined = apartments.map((apt) => ({
    ...apt,
    residents: residents.filter((r) => r.apartment_id === apt.id),
    vehicles: vehicles.filter((v) => v.apartment_id === apt.id),
    bills: bills.filter((b) => b.apartment_id === apt.id),
    hasUnpaidBills: bills.some((b) => b.apartment_id === apt.id && b.status === "unpaid"),
  }));

  if (!query) return joined;

  const lowerQuery = query.toLowerCase();
  return joined.filter(unit =>
    unit.id.includes(query) ||
    unit.residents.some(r => r.name.toLowerCase().includes(lowerQuery))
  );
};
