import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fleet } from '../../types';

interface FleetState {
  fleets: Fleet[];
  selectedFleet?: Fleet;
  loading: boolean;
  error?: string;
}

const initialState: FleetState = {
  fleets: [],
  loading: false,
};

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    setFleets: (state, action: PayloadAction<Fleet[]>) => {
      state.fleets = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setSelectedFleet: (state, action: PayloadAction<Fleet>) => {
      state.selectedFleet = action.payload;
    },
    updateFleet: (state, action: PayloadAction<Fleet>) => {
      const index = state.fleets.findIndex(fleet => fleet.id === action.payload.id);
      if (index !== -1) {
        state.fleets[index] = action.payload;
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
  setFleets,
  setSelectedFleet,
  updateFleet,
  setLoading,
  setError,
  clearError,
} = fleetSlice.actions;

export default fleetSlice.reducer;