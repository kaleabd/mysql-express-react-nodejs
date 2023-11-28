import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../store/thunks/companiesThunks";
import { Button, Typography, Card, Input } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Toaster } from "react-hot-toast";

interface formDataProps {
  name: string;
  email: string;
  total_capital: number | null;
}
const AddCompany: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.companies);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataProps>({
    name: "",
    email: "",
    total_capital: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await dispatch(
      createCompany(
        formData.name,
        formData.email,
        formData.total_capital as number
      )
    );
    setFormData({
      name: "",
      email: "",
      total_capital: null,
    });

    // navigate("/");
  };
  console.log(error);

  return (
    <div className="flex flex-col">
      <Toaster position="top-right" reverseOrder={true} gutter={1} />
      <div className="flex justify-end mr-12 mt-5">
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span>Back to home</span>
        </Button>
      </div>

      <div className="flex flex-col justify-center h-[85vh] items-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="mb-4">
            Add Company
          </Typography>
          <form>
            <div className="flex flex-col gap-6 w-80 mb-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Company Name
              </Typography>
              <Input
                crossOrigin=""
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your company name..."
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>

              <Input
                crossOrigin=""
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
                value={
                  formData.total_capital === null ? "" : formData.total_capital
                }
                onChange={handleChange}
                type="number"
                crossOrigin=""
                size="lg"
                placeholder="Enter total capital..."
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
              {loading ? "Adding..." : "Add Company"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddCompany;
