import { useDataController } from "./useDataController";
import initialDb from "../data/mockData.json";

export function useRegistry() {
  const apartments = useDataController("apartments", initialDb.apartments);
  const residents = useDataController("residents", initialDb.residents);
  const bills = useDataController("bills", initialDb.bills);
  const fee_types = useDataController("fee_types", initialDb.fee_types);
  const vehicles = useDataController("vehicles", initialDb.vehicles);
  const users = useDataController("users", initialDb.users);
  const absence_logs = useDataController(
    "absence_logs",
    initialDb.absence_logs,
  );

  return {
    apartments: apartments.data,
    residents: residents.data,
    bills: bills.data,
    fee_types: fee_types.data,
    vehicles: vehicles.data,
    users: users.data,
    absence_logs: absence_logs.data,
    isLoading: apartments.loading,
  };
}
