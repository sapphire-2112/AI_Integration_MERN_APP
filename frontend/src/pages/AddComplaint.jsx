import { useState } from "react";

import axios from "axios";

function AddComplaint() {

  const [formData, setFormData]
  = useState({

    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
    status: "Pending"
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
      await axios.post(

        "http://localhost:5000/api/complaints",

        formData
      );

      alert(response.data.message);

    } catch(err) {

      console.log(err);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">

          Complaint Registration

        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >

            Submit Complaint

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddComplaint;