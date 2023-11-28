import CompanyItem from "./CompanyItem";

const CompaniesList = ({ companies }: any) => {
  return (
    <>
      {companies.map((company: any) => (
        <CompanyItem key={company.id} company={company} />
      ))}
    </>
  );
};

export default CompaniesList;
