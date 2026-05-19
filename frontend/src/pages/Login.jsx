import { useState } from "react";

import axios from "axios";

function Login() {

  const [email, setEmail]
  = useState("");

  const [password, setPassword]
  = useState("");

  const handleLogin = async () => {

    try {

      const response =
      await axios.post(

        "https://ai-integration-mern-app.onrender.com/login",

        {
          email,
          password
        }
      );

      localStorage.setItem(

        "token",

        response.data.token
      );

      alert("Login Successful");

    } catch(err) {

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">

          Login

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

          <button

            onClick={handleLogin}

            className="bg-blue-600 text-white p-3 rounded-lg"
          >

            Login

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;