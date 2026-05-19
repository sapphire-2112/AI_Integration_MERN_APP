import { useState } from "react";

import axios from "axios";

function AIAnalysis() {

  const [description, setDescription]
  = useState("");

  const [result, setResult]
  = useState("");

  const analyzeComplaint = async () => {

    const response =
    await axios.post(

      "http://localhost:5000/api/ai/analyze",

      { description }
    );

    setResult(response.data.result);
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[700px]">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">

          AI Complaint Analysis

        </h1>

        <textarea

          placeholder="Enter Complaint Description"

          className="border p-4 rounded-lg w-full h-[200px]"

          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button

          onClick={analyzeComplaint}

          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
        >

          Analyze Complaint

        </button>

        {

          result && (

            <div className="bg-gray-100 p-6 rounded-xl mt-6 whitespace-pre-wrap">

              {result}

            </div>
          )
        }

      </div>

    </div>
  );
}

export default AIAnalysis;