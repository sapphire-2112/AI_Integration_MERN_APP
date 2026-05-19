import {

  useEffect,
  useState

} from "react";

import axios from "axios";

function ComplaintList() {

  const [complaints, setComplaints]
  = useState([]);

  const [location, setLocation]
  = useState("");

  const [category, setCategory]
  = useState("");

  /* =========================
     Fetch All Complaints
  ========================= */

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response =
      await axios.get(

        "http://localhost:5000/api/complaints"
      );

      setComplaints(response.data);

    } catch(err) {

      console.log(err);
    }
  };

  /* =========================
     Search By Location
  ========================= */

  const searchLocation = async () => {

    try {

      const response =
      await axios.get(

        `http://localhost:5000/api/complaints/search?location=${location}`
      );

      setComplaints(response.data);

    } catch(err) {

      console.log(err);
    }
  };

  /* =========================
     Filter By Category
  ========================= */

  const filterCategory = async () => {

    try {

      const response =
      await axios.get(

        `http://localhost:5000/api/complaints/category/${category}`
      );

      setComplaints(response.data);

    } catch(err) {

      console.log(err);
    }
  };

  /* =========================
     Delete Complaint
  ========================= */

  const deleteComplaint = async (id) => {

    try {

      const token =
      localStorage.getItem("token");

      await axios.delete(

        `https://ai-integration-mern-app.onrender.com/api/complaints/${id}`,

        {
          headers: {

            Authorization: token
          }
        }
      );

      alert("Complaint Deleted");

      fetchComplaints();

    } catch(err) {

      console.log(err);

      alert(
        "Only admin can delete complaint"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">

        Complaint List

      </h1>

      {/* =========================
          Search + Filter Section
      ========================= */}

      <div className="flex flex-wrap gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by Location"
          className="border p-3 rounded-lg bg-white"
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <button

          onClick={searchLocation}

          className="bg-blue-600 text-white px-6 rounded-lg"
        >

          Search

        </button>

        <input
          type="text"
          placeholder="Filter by Category"
          className="border p-3 rounded-lg bg-white"
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <button

          onClick={filterCategory}

          className="bg-green-600 text-white px-6 rounded-lg"
        >

          Filter

        </button>

        <button

          onClick={fetchComplaints}

          className="bg-gray-700 text-white px-6 rounded-lg"
        >

          Reset

        </button>

      </div>

      {/* =========================
          Complaint Cards
      ========================= */}

      <div className="grid gap-6">

        {

          complaints.map((item) => (

            <div

              key={item._id}

              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-2xl font-bold text-blue-600">

                {item.title}

              </h2>

              <p className="mt-3">

                <span className="font-bold">

                  Description:
                </span>

                {" "}

                {item.description}

              </p>

              <p className="mt-2">

                <span className="font-bold">

                  Name:
                </span>

                {" "}

                {item.name}

              </p>

              <p className="mt-2">

                <span className="font-bold">

                  Email:
                </span>

                {" "}

                {item.email}

              </p>

              <p className="mt-2 text-blue-600">

                <span className="font-bold">

                  Category:
                </span>

                {" "}

                {item.category}

              </p>

              <p className="mt-2">

                <span className="font-bold">

                  Location:
                </span>

                {" "}

                {item.location}

              </p>

              <p className="mt-2">

                <span className="font-bold">

                  Status:
                </span>

                {" "}

                {item.status}

              </p>

              <p className="mt-2 text-gray-500">

                <span className="font-bold">

                  Created:
                </span>

                {" "}

                {

                  new Date(
                    item.createdAt
                  ).toLocaleString()
                }

              </p>

              {/* =========================
                  Delete Button
              ========================= */}

              <button

                onClick={() =>
                  deleteComplaint(item._id)
                }

                className="bg-red-600 text-white px-5 py-2 rounded-lg mt-5 hover:bg-red-700"
              >

                Delete Complaint

              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default ComplaintList;