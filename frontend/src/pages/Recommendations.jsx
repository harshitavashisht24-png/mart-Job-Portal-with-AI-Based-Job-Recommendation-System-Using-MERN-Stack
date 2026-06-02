import { useEffect, useState } from "react";
import API from "../services/api";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        AI Recommended Jobs
      </h1>

      {recommendations.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-blue-600">
            {job.title}
          </h2>

          <p className="mt-2">
            <strong>Company:</strong> {job.company}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-white ${
                job.matchPercentage >= 80
                  ? "bg-green-500"
                  : job.matchPercentage >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              Match: {job.matchPercentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;