import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Applications</h1>

      {applications.map((app) => (
        <div key={app._id}>
          <h2>{app.jobId?.title}</h2>
          <p>Company: {app.jobId?.company}</p>
          <p>Location: {app.jobId?.location}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyApplications;