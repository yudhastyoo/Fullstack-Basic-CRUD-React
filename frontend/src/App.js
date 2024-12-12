import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
