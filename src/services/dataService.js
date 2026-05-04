import db from "../data/mockData.json";

export const dataService = {
  async getResidents() {
    return db.residents.map((res) => ({
      ...res,
      apt_area: db.apartments.find((a) => a.id === res.apartment_id)?.area || 0,
    }));
  },
};
