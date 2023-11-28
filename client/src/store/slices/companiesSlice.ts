import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Company {
  id: number;
  name: string;
  email: string;
  total_capital: number;
}

interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    fetchCompaniesStart: (state) => {
      state.loading = true;
    },
    fetchCompaniesSuccess: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCompaniesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //fetch companies by id
    fetchCompanyByIdStart: (state) => {
      state.loading = true;
    },
    fetchCompanyByIdSuccess: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCompanyByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCompanyStart: (state) => {
      state.loading = true;
    },
    createCompanySuccess: (state, action: PayloadAction<Company>) => {
      state.companies = [...state.companies, action.payload];
      state.loading = false;
      state.error = null;
    },
    createCompanyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCompanyStart: (state) => {
      state.loading = true;
    },
    updateCompanySuccess: (state, action: PayloadAction<Company>) => {
      const updatedCompany = action.payload;
      const index = state.companies.findIndex(
        (c) => c.id === updatedCompany.id
      );
      if (index !== -1) {
        state.companies = [
          ...state.companies.slice(0, index),
          updatedCompany,
          ...state.companies.slice(index + 1),
        ];
      }
      state.loading = false;
      state.error = null;
    },
    updateCompanyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCompanyStart: (state) => {
      state.loading = true;
    },
    deleteCompanySuccess: (state, action: PayloadAction<number>) => {
      const companyId = action.payload;
      state.companies = state.companies.filter((c) => c.id !== companyId);
      state.loading = false;
      state.error = null;
    },
    deleteCompanyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const {
  fetchCompaniesStart,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  fetchCompanyByIdStart,
  fetchCompanyByIdSuccess,
  fetchCompanyByIdFailure,
  createCompanyStart,
  createCompanySuccess,
  createCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
} = companiesSlice.actions;

export default companiesSlice.reducer;
