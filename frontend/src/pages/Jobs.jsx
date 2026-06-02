import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {
    const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

 useEffect(() => {
  fetchJobs();
  fetchRecommendations();
}, []);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };
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

    setRecommendedJobs(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/applications/apply",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };
  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase()) ||
  job.company.toLowerCase().includes(search.toLowerCase()) ||
  job.location.toLowerCase().includes(search.toLowerCase())
);
const isRecommended = (jobId) => {
  const job = recommendedJobs.find(
    (j) => j._id === jobId
  );

  return job && job.matchPercentage >= 80;
};
 
  return (
  <div className="max-w-6xl mx-auto">

    <div className="text-center py-12">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Smart Job Portal
      </h1>

      <p className="text-xl text-gray-600 mb-6">
        Find Your Dream Job Using AI-Powered Recommendations
      </p>

      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Browse Jobs
        </button>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
          View Recommendations
        </button>
      </div>
    </div>
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Available Jobs
      </h1>
      <input
  type="text"
  placeholder="Search by title, company, or location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 border rounded-lg mb-6 shadow-sm"
/>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              {job.title}
            </h2>
            {isRecommended(job._id) && (
  <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
    ⭐ AI Recommended
  </span>
)}

            <p className="mt-2">
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong>
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ₹{job.salary}
              </span>
            </p>

            <p className="mt-3">
              <strong>Description:</strong>
            </p>

            <p className="text-gray-600">
              {job.description}
            </p>

            <p className="mt-3">
              <strong>Skills:</strong>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => applyJob(job._id)}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;