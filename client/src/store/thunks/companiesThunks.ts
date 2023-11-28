import api from "../../services/api";
import {
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
} from "../slices/companiesSlice";
import { AppThunk } from "../store";
import toast from "react-hot-toast";

// fetch companies here
export const fetchCompaniesThunk = (): AppThunk => async (dispatch: any) => {
  try {
    dispatch(fetchCompaniesStart());

    const response = await api.get("/companies");
    const data = response.data;
    dispatch(fetchCompaniesSuccess(data));
  } catch (error: any) {
    dispatch(fetchCompaniesFailure(error.message));
  }
};

export const fetchCompanyById =
  (companyId: number): AppThunk =>
  async (dispatch: any) => {
    try {
      dispatch(fetchCompanyByIdStart());

      const response = await api.get(`/companies/${companyId}`);
      const data = response.data;

      dispatch(fetchCompanyByIdSuccess(data));
    } catch (error: any) {
      dispatch(fetchCompanyByIdFailure(error.message));
    }
  };
export const createCompany =
  (name: string, email: string, total_capital: number): AppThunk =>
  async (dispatch: any) => {
    try {
      dispatch(createCompanyStart());

      const response = await api.post("/companies", {
        name,
        email,
        total_capital,
      });
      const data = await response.data;

      dispatch(createCompanySuccess(data));
    } catch (error: any) {
      console.log("iam here!");
      if (error.response && error.response.data && error.response.data.errors) {
        // If there are validation errors, dispatch them

        console.log(error.response.data.errors);
        error.response.data.errors.forEach((validationError: any) => {
          toast.error(validationError.msg);
        });
        dispatch(createCompanyFailure(error.response.data.errors));
      } else {
        // If it's not a validation error, dispatch a generic error message
        toast.error("An error occurred while creating the company.");
        dispatch(
          createCompanyFailure("An error occurred while creating the company.")
        );
      }
    }
  };

export const updateCompany =
  (
    companyId: number,
    name: string,
    email: string,
    total_capital: number
  ): AppThunk =>
  async (dispatch: any) => {
    try {
      dispatch(updateCompanyStart());

      const response = await api.put(`/companies/${companyId}`, {
        name,
        email,
        total_capital,
      });
      const data = response.data;

      dispatch(updateCompanySuccess(data));
    } catch (error: any) {
      dispatch(updateCompanyFailure(error.message));
    }
  };

export const deleteCompany =
  (companyId: number): AppThunk =>
  async (dispatch: any) => {
    try {
      dispatch(deleteCompanyStart());

      await api.delete(`/companies/${companyId}`);

      dispatch(deleteCompanySuccess(companyId));
    } catch (error: any) {
      dispatch(deleteCompanyFailure(error.message));
    }
  };
