import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GmailDetection() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isSpam, setIsSpam] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict/gmail", {
        message: emailText,
      });

      const prediction = response.data.prediction === "0" ? "Not Spam" : "Spam";
      setResult(prediction);

      if (prediction === "Spam") {
        setIsSpam(true);
        alert("⚠️ Spam detected!");
      } else {
        setIsSpam(false);
        alert("✅ Not Spam");
      }
    } catch (err) {
      console.error(err);
      setResult("Error connecting to backend");
      setIsSpam(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-300 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Gmail Detection</h2>

        <textarea
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          placeholder="Type your email here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2"
          onClick={handleSubmit}
        >
          Check Result
        </button>

        <button
          className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 mb-2"
          onClick={() => navigate("/next")}
        >
          Back
        </button>

        {/* Report button only if Spam */}
        {isSpam && (
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            onClick={() =>
              navigate("/reports", {
                state: { type: "Gmail", message: emailText },
              })
            }
          >
            Report
          </button>
        )}

        {result && (
          <p className="mt-4 text-center font-semibold text-lg">
            Result: {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default GmailDetection;
