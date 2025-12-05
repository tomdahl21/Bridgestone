import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../types';

interface InvoiceState {
  invoices: Invoice[];
  selectedInvoice?: Invoice;
  loading: boolean;
  error?: string;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.unshift(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    setSelectedInvoice: (state, action: PayloadAction<Invoice>) => {
      state.selectedInvoice = action.payload;
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
  setInvoices,
  addInvoice,
  updateInvoice,
  setSelectedInvoice,
  setLoading,
  setError,
  clearError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;