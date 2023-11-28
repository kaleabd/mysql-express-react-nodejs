import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";
import { fetchCompaniesThunk } from "./store/thunks/companiesThunks";
import CompaniesList from "./components/CompaniesList";

// material tailwind components
import { Button, Card } from "@material-tailwind/react";
//
const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies, loading } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    dispatch(fetchCompaniesThunk() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const TABLE_HEAD = ["Name", "Email", "Capital", "Options"];

  return (
    <div className="flex flex-col m-12 p-5 gap-2 ">
      <div>
        <Button className="bg-blue-500" onClick={() => navigate("/create")}>
          Add Company +
        </Button>
      </div>
      <Card>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompaniesList companies={companies} />
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Companies;
