import { useDataController } from "./useDataController";
import initialDb from "../data/mockData.json";

export function useRegistry() {
  const apartments = useDataController("apartments", initialDb.apartments);
  const residents = useDataController("residents", initialDb.residents);
  const bills = useDataController("bills", initialDb.bills);
  const feeTypes = useDataController("fee_types", initialDb.fee_types);
  const vehicles = useDataController("vehicles", initialDb.vehicles);
  const users = useDataController("users", initialDb.users);
  const absenceLogs = useDataController(
    "absence_logs",
    initialDb.absence_logs,
  );

  return {
    apartments: apartments.data,
    setApartments: apartments.setData,
    residents: residents.data,
    setResidents: residents.setData,
    bills: bills.data,
    setBills: bills.setData,
    feeTypes: feeTypes.data,
    setFeeTypes: feeTypes.setData,
    vehicles: vehicles.data,
    setVehicles: vehicles.setData,
    users: users.data,
    setUsers: users.setData,
    absenceLogs: absenceLogs.data,
    setAbsenceLogs: absenceLogs.setData,
    isLoading: apartments.loading,
  };
}
