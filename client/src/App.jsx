import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Application from "./pages/Application";
import RecrutLogin from "./components/RecrutLogin/RecrutLogin";
import { useContext } from "react";
import { contextData } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";

function App() {
  const { showRecrut } = useContext(contextData);
  return (
    <>
      {showRecrut && <RecrutLogin />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/application" element={<Application />} />
        {/* Nested Routes for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-application" element={<ViewApplications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
