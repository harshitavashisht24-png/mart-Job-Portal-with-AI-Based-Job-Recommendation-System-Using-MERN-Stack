import { useState } from "react";
import API from "../services/api";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/upload/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div>
      <h1>Upload Resume</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeUpload;