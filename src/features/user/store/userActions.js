import { useDbStore } from "../../../shared/store/useDbStore";

export const userActions = {
  logAbsence: (logEntry) => {
    const store = useDbStore.getState();
    const currentLogs = store.absence_logs || [];

    const newLog = {
      id: Date.now(),
      status: "pending",
      ...logEntry,
    };

    useDbStore.setState({
      absence_logs: [...currentLogs, newLog],
    });
  },

  registerVehicle: (vehicleEntry) => {
    const store = useDbStore.getState();
    const currentVehicles = store.vehicles || [];

    const newVehicle = {
      ...vehicleEntry,
      status: "pending",
    };

    useDbStore.setState({
      vehicles: [...currentVehicles, newVehicle],
    });
  },
};
