import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from SmsDetection/GmailDetection
  const { type, message } = location.state || { type: "", message: "" };

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaintData = {
      name,
      email,
      details,
      detectedType: type,
      spamMessage: message,
    };

    console.log("Complaint Submitted:", complaintData);

    alert("✅ Your complaint has been submitted successfully!");
    navigate("/next"); // go back to main page after submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Report Spam</h2>

        {/* Show detected spam message */}
        {message && (
          <div className="mb-4 p-3 border rounded bg-gray-100">
            <p className="text-sm">
              <strong>Detected as Spam ({type}):</strong>
            </p>
            <p className="text-red-600">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Additional details (optional)"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Submit Complaint
          </button>

          <button
            type="button"
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;
