import {

  Routes,
  Route

} from "react-router-dom";

import Navbar from "./components/Navbar";

import AddComplaint from "./pages/AddComplaint";

import ComplaintList from "./pages/ComplaintList";

import UpdateStatus from "./pages/UpdateStatus";

import AIAnalysis from "./pages/AIAnalysis";
import Login from "./pages/Login";

import Signup from "./pages/Signup";


function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<AddComplaint />}
        />

        <Route
          path="/complaints"
          element={<ComplaintList />}
        />

        <Route
          path="/update"
          element={<UpdateStatus />}
        />


        <Route
          path="/ai"
          element={<AIAnalysis />}
        />
        <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/signup"
  element={<Signup />}
/>

      </Routes>

    </div>
  );
}

export default App;