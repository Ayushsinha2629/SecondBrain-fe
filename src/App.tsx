import { AdminDashboard } from "./pages/AdminDashboard";
import { Dashboard } from "./pages/Dashboard";
import { ModeratorDashboard } from "./pages/ModeratorDashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/moderator" element={<ModeratorDashboard/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;