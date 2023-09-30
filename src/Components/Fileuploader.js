import React, { useState, useEffect } from "react";
import "../Components/form.css";
import Snackbar from "@mui/material/Snackbar";

function FileUploader({ files, updatedfiles }) {
  const [selectedFiles, setSelectedFiles] = useState(files || []);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setSelectedFiles(files || []);
  }, [files]);

  useEffect(() => {
    updatedfiles(selectedFiles);
  }, [selectedFiles, updatedfiles]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    e.target.value = "";
    console.log(newFiles);
    const duplicates = newFiles.some((newFile) =>
      selectedFiles.includes(newFile.name)
    );

    if (duplicates) {
      // Show a Snackbar warning for duplicate files
      setIsSnackbarOpen(true);
    } else {
      // Append the new file names to the existing selectedFiles
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...newFiles.map((file) => file.name),
      ]);
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleRemoveFile = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileName);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        multiple
        onChange={handleFileChange}
        id="file-input"
        style={{ display: "none" }}
      />
      <label htmlFor="file-input" className="file-input-label">
        Choose files
      </label>
      {selectedFiles && selectedFiles.length !== 0 && (
        <div className="file-previews">
          {selectedFiles.map((fileName, index) => (
            <div key={index} className="file-preview">
              <span>{fileName}</span>
              <button onClick={() => handleRemoveFile(fileName)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="File(s) already uploaded."
      ></Snackbar>
    </div>
  );
}

export default React.memo(FileUploader);
