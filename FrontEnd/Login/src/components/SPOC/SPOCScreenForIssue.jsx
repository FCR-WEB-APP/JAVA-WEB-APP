import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  Select,
  Modal,
  TableContainer,
  Paper,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Card,
} from "@mui/material";
import { ExpandLess, ExpandMore, Add as AddIcon, ArrowCircleRightTwoTone } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import PreviewIcon from '@mui/icons-material/Preview';
import Swal from "sweetalert2";
function SPOCScreenForIssue({ loggedInUser },{initialChildRows = [] }) {
  {
    /********  Field Work Stage ******* */
  }




 

  const handleFileUpload1 = (e) => {
    const newFiles = e.target.files;
    const fileList = Array.from(newFiles).map((file, index) => ({
      id: index,
      name: file.name,
      uploadedOn: new Date().toLocaleString(),
      uploadedBy: "User", 
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

 

  

  const handleFileUploadForObligor = (file) => {
    setUploadedFiles([...uploadedFiles, { fileName: file.name, fileSize: file.size }]);
  };

  const handleDeleteFileForObligor = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };
  
 
  {
    /********  Field Work Stage ******* */
  }

  {
    /********   Response & Remediation Stage *********/
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("workOnChildIssue");
  const rowsPerPage = 10;
  const [issueTemplate, setIssueTemplate] = useState("");
  const [scoreCardTheme, setScoreCardTheme] = useState("");

  const [openCreateIssueDialog, setOpenCreateIssueDialog] = useState(false);

 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };





  
  const handleCreateButtonClick = () => {
    setOpenCreateIssueDialog(true); // Open Create Issue dialog
  };

  const handleCloseCreateIssueDialog = () => {
    setOpenCreateIssueDialog(false);
  };

  const [issueTemplateOpen, setIssueTemplateOpen] = useState(true);
  const handleIssueTemplateChange = (event) => {
    setIssueTemplate(event.target.value);
    setIssueTemplateOpen(!issueTemplateOpen); // Toggle dropdown visibility
  };

  const handleIssueFieldChange = (event) => {
    setIssueFields({ ...issueFields, [event.target.name]: event.target.value });
  };

  const handleScoreCardFieldChange = (event) => {
    setScoreCardFields({
      ...scoreCardFields,
      [event.target.name]: event.target.value,
    });
  };

  // Handle file delete
  const handleFileDelete = (fileId) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
    setUploadedFiles(updatedFiles);
  };
  

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIssueTemplate("");
    setScoreCardTheme("");
  };

 

  const handleSaveAndCloseDialog = () => {
    console.log("Saving issue details:", {
      issueFields,
      scoreCardFields,
      selectedOption,
    });

    handleCloseCreateIssueDialog();
  };

  const handleUploadToggle = () => {
    setOpenUploadSection(!openUploadSection);
  };

  
  // const issueReviews = Array.from({ length: 50 }, (_, index) => ({
  //   reviewId: index + 1,
  //   issueId: `Issue${index + 1}`,
  //   caseStatus: `Status${(index % 3) + 1}`,
  //   raiseIssueTemplate: `Template${index + 1}`,
  // }));
 

  const [issueReviews, setIssueReviews] = useState([]); 
 
// Function to handle "Create Issue" button click
const handleCreateIssue = () => {
  const newIssue = {
    reviewId: `REV-${Math.floor(1000 + Math.random() * 9000)}`,
    issueId: `ISSUE-${Math.floor(1000 + Math.random() * 9000)}`,
    caseStatus: ["Pending", "In Progress", "Completed"][
      Math.floor(Math.random() * 3)
    ],
    raiseIssueTemplate: `Template${Math.floor(1 + Math.random() * 100)}`,
  };
  setIssueReviews((prevIssues) => [...prevIssues, newIssue]); // Add new issue to the table
};



const handleDeleteIssue = (index) => {
   const updatedIssues = [...issueReviews];

   updatedIssues.splice(index, 1);

   setIssueReviews(updatedIssues);

  console.log(`Issue at index ${index} deleted successfully.`);
};

const [open, setOpen] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);



const handleClickOpen = (index) => {
  setFileIndex(index);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
}; 


// // Function to populate issueReviews
// const generateIssueReviews = () => {
//   const reviews = Array.from({ length: 50 }, (_, index) => ({
//     reviewId: `REV-${1000 + index}`,
//     issueId: `ISSUE-${1000 + index}`,
//     caseStatus: `Status${(index % 3) + 1}`,
//     raiseIssueTemplate: `Template${index + 1}`,
//   }));
//   setIssueReviews(reviews);
// };

// // Call generateIssueReviews on component mount
// useEffect(() => {
//   generateIssueReviews();
// }, []);
  // const issueReviews = () => {
  //   const randomReviewId = `REV-${Math.floor(1000 + Math.random() * 9000)}`;
  //   const randomIssueId = `ISSUE-${Math.floor(1000 + Math.random() * 9000)}`;
  //   const reviewStatuses = ["Pending", "In Progress", "Completed"];
  //   const randomReviewStatus =
  //     reviewStatuses[Math.floor(Math.random() * reviewStatuses.length)];

  //   setFormData({
  //     reviewId: randomReviewId,
  //     issueId: randomIssueId,
  //     reviewStatus: randomReviewStatus,
  //   });
  // };

  


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


 
 

 
  
  

  const [scoreCardThemeOpen, setScoreCardThemeOpen] = useState(true);

  const [issueFields, setIssueFields] = useState({
    issue: "",
    context: "",
    riskRemediation: "",
    fcrRecommendation: "",
  });
  const [scoreCardFields, setScoreCardFields] = useState({
    managementResponse: "",
    wrmResponse: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openUploadSection, setOpenUploadSection] = useState(false);

  const paginatedFiles = uploadedFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
 


  const [action, setAction] = useState("");

const handleActionSubmit = () => {
  if (action === "submitToReviewer") {
    console.log("Submitted to Credit Reviewer");
    // Add your submit logic here
  } else {
    console.log("No action selected");
  }
};



  {
    /********   Response & Remediation Stage *********/
  }

  return (
    <div>
      <Box className="p-4 border border-orange-500 rounded-lg bg-white shadow-md">
        {/* Case Details Section */}
        <Box
          className="mb-6 p-4"
          sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
        >
          <Typography variant="h6" className="text-orange-500 font-bold mb-4">
            Case Details
          </Typography>
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Grid container spacing={3}>
              {[
                { label: "Review ID ", value: "#FCR-202410210778" },
                { label: "Division", value: "abc" },
                { label: "Group Name", value: "kjdskhfj" },
                { label: "FCR user", value: loggedInUser },
                { label: "Roles", value: "Sr Credit Reviser" },
                { label: "Case Status", value: "Case Approved By Head of FCR" },
                {
                  label: "Case Created Date",
                  value: new Date().toLocaleDateString(),
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box className="flex items-center">
                    <Box
                      className="p-2 bg-orange-500 text-white text-center rounded-full"
                      sx={{ display: "inline-block", minWidth: "100px" }}
                    >
                      {item.label}
                    </Box>
                    <Typography className="text-gray-700 ml-4">
                      <strong>{item.value}</strong>
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    
     {/********   Response & Remediation Stage *********/} 
     <Box
  className="mt-6 p-4"
  sx={{
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: 3,
  }}
>
<Box className="flex items-center justify-between mb-4">
  <Typography
    variant="h6"
    sx={{ color: "#ff6f00", fontWeight: "bold", marginRight: "16px" }}
  >
    Response & Remediation Stage
  </Typography>

  <Box className="flex items-center space-x-4 ml-auto">
  <TextField
  select
  label="Take Action"
  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" // Responsive width, adjusts based on screen size
  size="small" // Use 'small' to reduce the size of the input field
  sx={{
    backgroundColor: "white",
    fontSize: { xs: "12px", sm: "14px", md: "14px" }, // Smaller font size based on screen size
    minWidth: 200, // Minimum width to prevent it from being too narrow on small screens
    height: "32px", // Further reduce the overall height of the TextField
    ".MuiInputBase-root": {
      padding: "4px 8px", // Reduce padding inside the TextField for smaller height
    },
    ".MuiSelect-select": {
      paddingTop: "4px", // Further reduce padding for select element
      paddingBottom: "4px", // Further reduce padding for select element
    },
    ".MuiMenuItem-root": {
      fontSize: "12px", // Adjust font size of the dropdown items
      height: "28px", // Reduce height of dropdown menu items even further
    }
  }}
>
  <MenuItem value="User A">Submit to Credit Reviewer</MenuItem>
</TextField>




    <Button
      variant="contained"
      className="bg-orange-500 text-white hover:bg-orange-600"
      sx={{ backgroundColor:'f27013', '&:hover': { backgroundColor: '#e0600d' } }}
    >
      Submit
    </Button>
  </Box>
  </Box>


  
  <FormControl sx={{ mb: 4, width: 'auto' }}>
  <InputLabel>Do You Want To Work On?</InputLabel>
  <Select
    value={selectedOption}
    onChange={handleOptionChange}
    label="Do You Want To Work On?"
    sx={{ minWidth: 350 }}  
  >
    <MenuItem value="workInIssue">Work on Issue</MenuItem>
  </Select>
</FormControl>

  {/* Display Child Review Table or Issue Table based on selected option */}

          <Box
            className="bg-white p-4 rounded-lg shadow-sm"
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #ddd",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ff6f00", fontWeight: "bold", mb: 4 }}
            >
              Work in Issue
            </Typography>
            <div>
            <Button
  variant="contained"
  onClick={handleCreateIssue}
  sx={{ backgroundColor: '#f27013', '&:hover': { backgroundColor: '#e0600d' } }}
>
  Create Issue
</Button>


              <Dialog
                open={openCreateIssueDialog}
                onClose={handleCloseCreateIssueDialog}
                maxWidth="md"
                fullWidth
              >
                <DialogTitle>Create Issue</DialogTitle>
                <DialogContent>
                  {/* Issue Template Dropdown */}
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Issue Template</InputLabel>
                    <Select
                      value={issueTemplate}
                      onChange={handleIssueTemplateChange}
                      label="Issue Template"
                    >
                      <MenuItem value="Open">Close</MenuItem>
                      <MenuItem value="Close">Open</MenuItem>
                    </Select>
                  </FormControl>

                  {issueTemplateOpen && (
                    <Stack spacing={2}>
                      <TextField
                        label="Issue"
                        variant="outlined"
                        name="issue"
                        value={issueFields.issue}
                        onChange={handleIssueFieldChange}
                        disabled 
                      />
                      <TextField
                        label="Context"
                        variant="outlined"
                        name="context"
                        value={issueFields.context}
                        onChange={handleIssueFieldChange
                        }
                        disabled 
                      />
                      <TextField
                        label="Risk/Remediation"
                        variant="outlined"
                        name="riskRemediation"
                        value={issueFields.riskRemediation}
                        onChange={handleIssueFieldChange}
                        disabled 
                      />
                      <TextField
                        label="FCR Recommendation"
                        variant="outlined"
                        name="fcrRecommendation"
                        value={issueFields.fcrRecommendation}
                        onChange={handleIssueFieldChange}
                        disabled 
                      />
                    </Stack>
                  )}

                  {/* Score Card Theme Dropdown */}
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Score Card Theme</InputLabel>
                  </FormControl>

                  {scoreCardThemeOpen && (
                    <Stack spacing={2}>
                      <TextField
                        label="Management Response"
                        variant="outlined"
                        name="managementResponse"
                        value={scoreCardFields.managementResponse}
                        onChange={handleScoreCardFieldChange}
                      />
                      <TextField
                        label="WRM Response"
                        variant="outlined"
                        name="wrmResponse"
                        value={scoreCardFields.wrmResponse}
                        onChange={handleScoreCardFieldChange}
                      />
                    </Stack>
                  )}
                  {/* File Upload Section */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" className="mb-2">
                      Drag and Drop Your Files or Browse
                    </Typography>

                    <Button
                      variant="contained"
                      className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
                      fullWidth
                      onClick={handleUploadToggle}
                    >
                      {openUploadSection ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}{" "}
                      Upload Documents
                    </Button>

                    {openUploadSection && (
                      <Box mt={2}>
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
                          onChange={handleFileUpload1}
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
                              {paginatedFiles.map((file) => (
                                <TableRow key={file.id}>
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

                        <Pagination
                          count={Math.ceil(paginatedFiles.length / rowsPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                          className="mt-4"
                        />
                      </Box>
                    )}
                  </Grid>
                  <Box
                    sx={{ width: "800px", left: 0, top: "80px", ml: 2, mt: 4 }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Issue Status</InputLabel>
                      <Select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        label="Issue Status"
                        IconComponent={ArrowDropDownIcon}
                      >
                        <MenuItem value="stay">Issue Stay</MenuItem>
                        <MenuItem value="drop">Issue Drop</MenuItem>
                        <MenuItem value="closed">Issue Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "orange",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "darkorange",
                        },
                      }}
                      onClick={handleSaveAndCloseDialog}
                    >
                      Save & Close
                    </Button>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary"></Button>
                  <Button onClick={handleCloseDialog} color="primary"></Button>
                </DialogActions>
              </Dialog>
            </div>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}
            >
              <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Select
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Review Id
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Issue Id
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Case Status
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Raise Issue Template
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            Delete
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
            View/Upload
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {issueReviews.map((row, index) => (
          <TableRow
            key={row.reviewId}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
              <input type="checkbox" />
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
              {row.reviewId}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
              {row.issueId}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
              {row.caseStatus}
            </TableCell>
            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#f27013", "&:hover": { backgroundColor: "#f57c00" }}}
                size="small"
                onClick={handleCreateButtonClick}              >
                Raise
              </Button>
            </TableCell>
            <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <DeleteIcon onClick={handleDeleteIssue} sx={{ color: '#f27013' }} />
</TableCell>

            <TableCell>
      <PreviewIcon 
        onClick={handleClickOpen} 
        style={{ cursor: 'pointer', color: '#f27013' }} 
      />
      
      {/* Dialog for File Upload */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <Card className="p-4" style={{ width: '400px' }}>
            <Button
              variant="outlined"
              component="label"
              color="primary"
              className="mb-4"
            >
              Upload File
              <input
                type="file"
                onChange={(e) => handleFileUploadForObligor(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </Button>

            {/* Table to list uploaded files */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell>Actions</TableCell> {/* Added Actions column for delete */}
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedFiles.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>{file.fileName}</TableCell>
                    <TableCell>{(file.fileSize / 1024).toFixed(2)} KB</TableCell>
                    <TableCell>
                      <DeleteIcon 
                        style={{ cursor: 'pointer', color: 'red' }} 
                        onClick={() => handleDeleteFileForObligor(index)} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(issueReviews.length / rowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                mt: 2,
                "& .Mui-selected": {
                  backgroundColor: "#ff6f00",
                  color: "#ffffff",
                },
              }}
            />
          </Box>
  
      </Box>
    </div>
  );
}
export default SPOCScreenForIssue;