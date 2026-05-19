import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="bg-blue-600 text-white p-4 flex gap-6 text-lg shadow-lg">

      <Link to="/">
        Add Complaint
      </Link>

      <Link to="/complaints">
        Complaints
      </Link>

      <Link to="/update">
        Update Status
      </Link>
      <Link to="/login">
  Login
</Link>

<Link to="/signup">
  Signup
</Link>

      <Link to="/ai">
        AI Analysis
      </Link>

    </div>
  );
}

export default Navbar;