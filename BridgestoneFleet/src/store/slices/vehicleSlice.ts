import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from '../../types';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle;
  loading: boolean;
  error?: string;
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload;
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const {
  setVehicles,
  setSelectedVehicle,
  updateVehicle,
  setLoading,
  setError,
  clearError,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;