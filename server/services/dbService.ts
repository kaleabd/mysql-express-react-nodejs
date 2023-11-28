import mysql from "mysql2/promise";
import { config } from "dotenv";

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "companies",
});

export const getAllCompanies = async (): Promise<any> => {
  const [rows] = await db.execute("SELECT * FROM companies_info");
  return rows;
};

export const getCompanyById = async (
  companyId: string
): Promise<any | null> => {
  const [rows] = await db.execute("SELECT * FROM companies_info WHERE id = ?", [
    companyId,
  ]);

  if (Array.isArray(rows)) {
    return rows.length > 0 ? rows[0] : null;
  } else {
    return null;
  }
};

export const createCompany = async (
  name: string,
  email: string,
  total_capital: number
): Promise<void> => {
  await db.execute(
    "INSERT INTO companies_info (name, email, total_capital) VALUES (?, ?, ?)",
    [name, email, total_capital]
  );
};

export const updateCompany = async (
  companyId: string,
  name: string,
  email: string,
  total_capital: number
): Promise<boolean> => {
  const [result] = await db.execute(
    "UPDATE companies_info SET name = ?, email = ?, total_capital = ? WHERE id = ?",
    [name, email, total_capital, companyId]
  );

  return Boolean(result);
};
export const deleteCompany = async (companyId: string): Promise<boolean> => {
  const [result] = await db.execute("DELETE FROM companies_info WHERE id = ?", [
    companyId,
  ]);
  return Boolean(result);
};
