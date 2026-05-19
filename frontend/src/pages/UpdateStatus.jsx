import {

  useEffect,
  useState

} from "react";

import axios from "axios";

function UpdateStatus() {

  const [complaints, setComplaints]
  = useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    const response =
    await axios.get(

      "http://localhost:5000/api/complaints"
    );

    setComplaints(response.data);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await axios.put(

      `http://localhost:5000/api/complaints/${id}`,

      { status }
    );

    fetchComplaints();
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">

        Update Complaint Status

      </h1>

      <div className="grid gap-6">

        {

          complaints.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-2xl font-bold">

                {item.title}
              </h2>

              <p className="mt-2">

                Status:
                {item.status}
              </p>

              <button

                onClick={() =>
                  updateStatus(
                    item._id,
                    "Resolved"
                  )
                }

                className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
              >

                Mark Resolved

              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default UpdateStatus;