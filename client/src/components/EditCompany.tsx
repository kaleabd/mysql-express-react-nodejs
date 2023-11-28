import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateCompany } from "../store/thunks/companiesThunks";
// material tailwind components
import { Button, Typography, Card, Input } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
//

interface CompanyDetailsProps {
  id: number | null;
  name: string;
  email: string;
  total_capital: number | null;
}

const EditCompany: React.FC = () => {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector(
    (state: RootState) => state.companies
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<CompanyDetailsProps>({
    id: null,
    name: "",
    email: "",
    total_capital: null,
  });

  useEffect(() => {
    const fetchCompanyDetails = () => {
      try {
        const company = companies.find((company) => company.id === Number(id));

        if (company) {
          setFormData({
            id: company.id,
            name: company.name,
            email: company.email,
            total_capital: company.total_capital,
          });
        } else {
          console.error("Company not found");
        }
      } catch (error: any) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [dispatch, id, companies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      updateCompany(
        formData.id!,
        formData.name,
        formData.email,
        Number(formData.total_capital) || 0
      )
    );
    navigate("/");
  };

  if (error) {
    return <h1>Error occurred: {error}</h1>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mr-12 mt-5">
        <Link to="/" className="flex gap-3">
          <ArrowLeftIcon className="w-6 h-6"/>
          <span>Back to home</span>
        </Link>
      </div>

      <div className="flex flex-col justify-center h-[85vh] items-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="mb-4">
            Update Company Details
          </Typography>
          <form>
            <div className="mb-1 flex flex-col gap-6 w-80 mb-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Company Name
              </Typography>
              <Input
                crossOrigin={true}
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="your company name..."
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                crossOrigin={true}
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Total Capital
              </Typography>
              <Input
                name="total_capital"
                value={formData.total_capital || ""}
                onChange={handleChange}
                type="number"
                crossOrigin={true}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              color="blue"
              className="w-full"
            >
              {loading ? "Updating..." : "Update Company"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditCompany;
