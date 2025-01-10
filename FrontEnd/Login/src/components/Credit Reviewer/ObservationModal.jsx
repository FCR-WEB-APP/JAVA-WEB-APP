import React, { useState } from "react";
import { Modal, Box, Grid, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ObservationModal = ({ isObservationModalVisible, setObservationModalVisible }) => {
  // State for handling the observations and file uploads
  const [observationText, setObservationText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Handler for adding observations
  const handleAddObservation = () => {
    if (observationText) {
      alert(`Observation Added: ${observationText}`);
      setObservationText(""); // Clear the textarea after submission
    }
  };

  // Handler for file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: uploadedFiles.length + 1,
        name: file.name,
        uploadedOn: new Date().toLocaleString(),
        uploadedBy: "Admin",
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };

  // Handler for deleting a file
  const handleFileDelete = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  // Handler for pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get the current page's files based on pagination
  const paginatedFiles = uploadedFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Modal open={isObservationModalVisible} onClose={() => setObservationModalVisible(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 6,
        }}
      >
        <Typography variant="h6" className="text-center mb-4">
          Observations
        </Typography>
        <Grid container spacing={4}>
          {/* Left Half */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" className="mb-2">
              Observations
            </Typography>
            <TextField
              multiline
              rows={5}
              fullWidth
              placeholder="Write your observations here..."
              value={observationText}
              onChange={(e) => setObservationText(e.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="bg-green-500 text-white hover:bg-green-600 mt-4"
              onClick={handleAddObservation}
            >
              Add
            </Button>
          </Grid>

          {/* Right Half */}
          <Grid item xs={6}>
            <Typography variant="subtitle1" className="mb-2">
              Drag and Drop Your Files or Browse
            </Typography>
            <input
              type="file"
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ccc",
                borderRadius: "4px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onChange={handleFileUpload}
            />
            <Button
              variant="contained"
              className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
              fullWidth
            >
              Upload
            </Button>

            {/* Uploaded Files Table */}
            <TableContainer component={Paper} className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Uploaded On</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedFiles.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.uploadedOn}</TableCell>
                      <TableCell>{file.uploadedBy}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleFileDelete(file.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Pagination
              count={Math.ceil(uploadedFiles.length / rowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              className="mt-4"
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ObservationModal;
