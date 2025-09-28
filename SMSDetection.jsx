import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SmsDetection() {
  const [smsText, setSmsText] = useState("");
  const [result, setResult] = useState("");
  const [isSpam, setIsSpam] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict/sms", {
        message: smsText,
      });

      const prediction = response.data.prediction === "1" ? "Spam" : "Not Spam";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-5xl font-bold mb-4 text-red-600">SMS Fraud Detection</h2>

      <textarea
        className="w-full max-w-md p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        rows={5}
        placeholder="Enter SMS text here..."
        value={smsText}
        onChange={(e) => setSmsText(e.target.value)}
      />

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Check Result
        </button>

        <button
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => navigate("/next")}
        >
          Back
        </button>

        {/* Report button only if Spam */}
        {isSpam && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() =>
              navigate("/reports", {
                state: { type: "SMS", message: smsText },
              })
            }
          >
            Report
          </button>
        )}
      </div>

      {result && (
        <p className="text-lg font-medium">
          Result: <span className="font-bold">{result}</span>
        </p>
      )}
    </div>
  );
}

export default SmsDetection;
