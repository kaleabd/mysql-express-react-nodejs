import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCompany } from "../store/thunks/companiesThunks";
import { useDispatch } from "react-redux";

// material tailwind components
import { Button, Typography } from "@material-tailwind/react";
//

interface CompanyDetailsProps {
  id: number | null;
  name: string;
  email: string;
  total_capital: number | null;
}

const CompanyItem: React.FC<{ company: CompanyDetailsProps }> = ({
  company,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (companyId: number) => {
    await dispatch(deleteCompany(companyId));
  };

  const classes = "p-4";

  return (
    <tr className="bg-white border-b  hover:bg-gray-50 ">
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {company.name}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {company.email}
        </Typography>
      </td>
      <td>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {company.total_capital}
        </Typography>
      </td>
      <td className="p-4 flex gap-5">
        <Button
          variant="outlined"
          color="blue"
          onClick={() => navigate(`/edit/${company.id}`)}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          color="red"
          onClick={() => handleDelete(Number(company.id))}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CompanyItem;
