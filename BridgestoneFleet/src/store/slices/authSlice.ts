import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
  selectedFleetId?: string;
  biometricEnabled: boolean;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  biometricEnabled: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = undefined;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.token = undefined;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.token = undefined;
      state.selectedFleetId = undefined;
      state.error = undefined;
    },
    selectFleet: (state, action: PayloadAction<string>) => {
      state.selectedFleetId = action.payload;
    },
    enableBiometric: (state) => {
      state.biometricEnabled = true;
    },
    disableBiometric: (state) => {
      state.biometricEnabled = false;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  selectFleet,
  enableBiometric,
  disableBiometric,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;