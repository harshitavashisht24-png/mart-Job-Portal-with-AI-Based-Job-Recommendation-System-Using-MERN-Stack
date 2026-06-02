import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold">
            Total Users
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold">
            Total Jobs
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold">
            Total Applications
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-4">
            {stats.totalApplications}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;