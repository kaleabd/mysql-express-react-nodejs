import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./Companies";
import AddCompany from "./components/AddCompany";
import EditCompany from "./components/EditCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/create" element={<AddCompany />}/>
        <Route path="/edit/:id" element={<EditCompany />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
