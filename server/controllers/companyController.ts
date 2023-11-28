import { Request, Response } from "express";
import * as dbService from "../services/dbService";
import { validationResult, body } from "express-validator";

export const getAllCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const companies = await dbService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getCompanyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const CompanyId = req.params.id;

  try {
    const company = await dbService.getCompanyById(CompanyId);

    if (company) {
      res.json(company);
    } else {
      res.status(404).json({
        error: "Company not found",
      });
    }
  } catch (error) {
    console.error("Error getting company by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCompany = async (req: any, res: Response): Promise<void> => {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array(), success: false });
    return;
  }
  const { name, email, total_capital } = req.body;

  try {
    await dbService.createCompany(name, email, total_capital);
    res.json({ message: "Company created successfully", success: true });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCompany = async (req: any, res: Response): Promise<void> => {
  const CompanyId = req.params.id;
  const { name, email, total_capital } = req.body;

  try {
    const result = await dbService.updateCompany(
      CompanyId,
      name,
      email,
      total_capital
    );

    if (result) {
      res.json({ message: "Company updated successfully" });
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCompany = async (req: any, res: Response): Promise<void> => {
  const CompanyId = req.params.id;

  try {
    const result = await dbService.deleteCompany(CompanyId);
    if (result) {
      res.json({ message: "Company deleted succesfully" });
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
