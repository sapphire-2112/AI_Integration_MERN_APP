import { useState } from "react";

import axios from "axios";

function Signup() {

  const [email, setEmail]
  = useState("");

  const [password, setPassword]
  = useState("");

  const [role, setRole]
  = useState("user");

  const handleSignup = async () => {

    try {

      const response =
      await axios.post(

        "http://localhost:5000/signup",

        {
          email,
          password,
          role
        }
      );

      alert(response.data.message);

    } catch(err) {

      alert("Signup Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">

          Signup

        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select

            className="border p-3 rounded-lg"

            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button

            onClick={handleSignup}

            className="bg-blue-600 text-white p-3 rounded-lg"
          >

            Signup

          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;