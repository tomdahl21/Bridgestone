import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceRequest } from '../../types';

interface ServiceRequestState {
  serviceRequests: ServiceRequest[];
  activeRequest?: ServiceRequest;
  loading: boolean;
  error?: string;
}

const initialState: ServiceRequestState = {
  serviceRequests: [],
  loading: false,
};

const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    setServiceRequests: (state, action: PayloadAction<ServiceRequest[]>) => {
      state.serviceRequests = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    addServiceRequest: (state, action: PayloadAction<ServiceRequest>) => {
      state.serviceRequests.unshift(action.payload);
    },
    updateServiceRequest: (state, action: PayloadAction<ServiceRequest>) => {
      const index = state.serviceRequests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.serviceRequests[index] = action.payload;
      }
    },
    setActiveRequest: (state, action: PayloadAction<ServiceRequest>) => {
      state.activeRequest = action.payload;
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
  setServiceRequests,
  addServiceRequest,
  updateServiceRequest,
  setActiveRequest,
  setLoading,
  setError,
  clearError,
} = serviceRequestSlice.actions;

export default serviceRequestSlice.reducer;