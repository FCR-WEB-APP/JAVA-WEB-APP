import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
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
  function SPOCScreenForChild({ loggedInUser },{initialChildRows = [] }) {
    {
      /********  Field Work Stage ******* */
    }
  
    const [isFieldWorkStageExpanded, setIsFieldWorkStageExpanded] =
      useState(false);
    const [observationText, setObservationText] = useState("");
    const [isAddObligorVisible, setIsAddObligorVisible] = useState(false);
    const [division, setDivision] = useState("");
    const [cifId, setCifId] = useState("");
    const [premId, setPremId] = useState("");
  
    const [obligors, setObligors] = useState([]);
  
    const [obligorId, setObligorId] = useState("");
  
    const [isObservationModalVisible, setObservationModalVisible] =
      useState(false);
    const handleAddObligor = () => {
      setIsAddObligorVisible(!isAddObligorVisible);
    };
  
    const handleCloseModal = () => {
      setIsAddObligorVisible(false);
    };
  
    // const handleAddObligorToTable = () => {
    //   if (obligorId && division && cifId && premId) {
    //     const newObligor = {
    //       childReviewId: obligors.length + 1, // Generate a unique ID
    //       obligorName: obligorId,
    //       division,
    //       cifId,
    //       premId,
    //     };
    
    //     setObligors([...obligors, newObligor]);
    //     setObligorId("");
    //     setDivision("");
    //     setCifId("");
    //     setPremId("");
    //     setIsAddObligorVisible(false);
    
    //     // SweetAlert2 success effect
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success",
    //       text: "Obligor added successfully!",
    //       timer: 2000,
    //       showConfirmButton: false,
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: "Please fill all required fields.",
    //     });
    //   }
    // };


    const handleAddObligorToTable = async () => {
      if (obligorId && division && cifId && premId) {
        // Construct the data to send to the backend
        const newObligor = {
          obligorName: obligorId, // Adjust this key to match your Obligour entity
          division,
          cifId,
          premId,
        };
    
        try {
          // Send the data to the backend using fetch
          const response = await fetch("/api/obligour/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${yourJwtToken}`, // Replace with actual token if applicable
            },
            body: JSON.stringify(newObligor),
          });
    
          if (response.ok) {
            const savedObligor = await response.json();
    
            // Update the UI with the new data
            setObligors([...obligors, { ...savedObligor, childReviewId: obligors.length + 1 }]);
            setObligorId("");
            setDivision("");
            setCifId("");
            setPremId("");
            setIsAddObligorVisible(false);
    
            // SweetAlert2 success effect
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Obligor added successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            const errorText = await response.text();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `Failed to add obligor: ${errorText}`,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `An error occurred: ${error.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill all required fields.",
        });
      }
    };
    
  
     const [childRows, setChildRows] = useState([]);
  
    const handleClarification = (obligor) => {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to send clarification for Obligor: ${obligor.obligorName}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clarify!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Add obligor to Work on Child Issue table, leaving other fields empty
          const newChildRow = {
            childReviewId: obligor.childReviewId,
            obligorName: obligor.obligorName,
            premId: obligor.premId, // Empty
            cifId: obligor.cifId,  // Empty
            division: obligor.division, // Empty
            reviewStatus: "in-Progress", // Empty
            createdBy:loggedInUser, // Empty
          };
    
          // Add the new row to the table
          setChildRows((prevRows) => [...prevRows, newChildRow]);
    
          Swal.fire({
            icon: "success",
            title: "Clarification Sent!",
            text: `Clarification sent for Obligor: ${obligor.obligorName}.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    };
    const handleDelete = (obligor) => {
      setObligors(
        obligors.filter((item) => item.childReviewId !== obligor.childReviewId)
      );
    };
  
    const handleUpload = (obligor) => {
      alert(`Uploading or Viewing documents for Obligor: ${obligor.obligorName}`);
    };
  
    const handleAddObservation = () => {
      if (observationText) {
        alert(`Observation Added: ${observationText}`);
        setObservationText("");
      }
    };
  
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
  
    const handleFieldWorkStageToggle = () => {
      setIsFieldWorkStageExpanded(!isFieldWorkStageExpanded);
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
    const [isSpocSectionOpen, setIsSpocSectionOpen] = useState(false);
     const [openModal, setOpenModal] = useState(false);
    const [queryText, setQueryText] = useState("");
    const [queryDetails, setQueryDetails] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedCase, setSelectedCase] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleModalOpen = () => {
      setOpenModal(true);
    };
  
    const handleModalClose = () => {
      setOpenModal(false);
    };
  
    const handleQuerySubmit = () => {
      setQueryDetails([
        ...queryDetails,
        { queryText, createdOn: new Date().toLocaleString(), createdBy: "User" },
      ]);
      setQueryText("");
      handleModalClose();
    };
  
    const handleDelete1 = (index) => {
      const updatedQueries = [...queryDetails];
      updatedQueries.splice(index, 1);
      setQueryDetails(updatedQueries);
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
      setSelectedDivision(null);
      setSelectedGroup(null);
      setSelectedSPOC(null);
      setIssueTemplate("");
      setScoreCardTheme("");
    };
  
    const handleRaiseIssue = (issueId) => {
      console.log("Raising issue for ID:", issueId);
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
  
    const childReviews = Array.from({ length: 50 }, (_, index) => ({
      childReviewId: index + 1,
      obligorName: `Obligor ${index + 1}`,
      premId: `PREM${index + 100}`,
      cifId: `CIF${1000 + index}`,
      division: `Division${index + 1}`,
      reviewStatus: `Status ${index % 3 === 0 ? "Pending" : "Completed"}`,
      createdBy: `User ${index + 1}`,
    }));
  
    // const issueReviews = Array.from({ length: 50 }, (_, index) => ({
    //   reviewId: index + 1,
    //   issueId: `Issue${index + 1}`,
    //   caseStatus: `Status${(index % 3) + 1}`,
    //   raiseIssueTemplate: `Template${index + 1}`,
    // }));
    const [formData, setFormData] = useState({
      reviewId: "",
      issueId: "",
      reviewStatus: "",
    });
  
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
  
  
  const handleFileDeleteForChildIssueFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);  // Remove file at the given index
    setUploadedFiles(newFiles);
  };
  
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
  
  
   
    const paginatedQueries = queryDetails.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  
    const [selectedFilter, setSelectedFilter] = useState("All");
  
    const filteredReviews = childReviews.filter((review) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter.startsWith("Division")) {
        return review.division === selectedFilter;
      }
      if (selectedFilter.startsWith("SPOC")) {
        return review.spocName === selectedFilter;
      }
      return true;
    });
  
   
    
  
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
      sx={{ backgroundColor: "#f27013" }}
    >
      Submit
    </Button>
  </Box>
  </Box>


  
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel>Do You Want To Work On?</InputLabel>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        label="Do You Want To Work On?"
      >
        <MenuItem value="workOnChildIssue">Work On Child Issue</MenuItem>
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
         <TableContainer
          component={Paper}
          sx={{ boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Select
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Child Review ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Obligor ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Prem ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  CIF ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Division
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Review Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Created By
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  Add/View Query
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childRows.map((row, index) => (
                <TableRow
                  key={row.childReviewId}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    <RadioGroup>
                      <FormControlLabel
                        value={row.childReviewId}
                        control={<Radio />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.childReviewId}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.obligorName}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.premId}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.cifId}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.division}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.reviewStatus}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {row.createdBy}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={handleModalOpen}
                      sx={{
                        textTransform: "capitalize",
                        position: "relative",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "5px",
                          backgroundColor: "#f55e1d", // Green line
                        },
                        "&:hover": {
                          backgroundColor: "#f55e1d",
                          color: "#fff",
                        },
                      }}
                    >
                      Add/View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
              <Pagination
                count={Math.ceil(childReviews.length / rowsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              />
  
              <Modal open={openModal} onClose={handleModalClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: 3,
                    width: {
                      xs: "90%", // For small screens (xs), set the width to 90% of the screen width
                      sm: "500px", // For medium screens (sm), set the width to 500px
                      md: "900px", // For large screens (md), set the width to 900px
                    },
                    borderRadius: 2,
                    maxHeight: "80vh", // Set max height to 80% of the viewport height
                    overflow: "auto", // Make content scrollable if it overflows
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: "16px" }}
                  >
                    Query Details
                  </Typography>
  
                  <TextField
                    label="Query"
                    multiline
                    rows={4}
                    fullWidth
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    sx={{ marginBottom: "16px" }}
                  />
  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleQuerySubmit}
                    sx={{ marginBottom: "16px" }}
                  >
                    Add
                  </Button>
  
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    Query Responses
                  </Typography>
  
                  <TableContainer component={Paper} sx={{ marginBottom: "16px" }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                          <TableCell>SL No.</TableCell>
                          <TableCell>Query Sequence</TableCell>
                          <TableCell>Query Created On</TableCell>
                          <TableCell>Created By</TableCell>
                          <TableCell>Response</TableCell>
                          <TableCell>Response By</TableCell>
                          <TableCell>Response On</TableCell>
                          <TableCell>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedQueries.map((query, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {(page - 1) * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{query.createdOn}</TableCell>
                            <TableCell>{query.createdBy}</TableCell>
                            <TableCell>{query.queryText}</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>{new Date().toLocaleString()}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleDelete1((page - 1) * rowsPerPage + index)
                                }
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
                    count={Math.ceil(queryDetails.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  />
  
                  <Button
                    variant="outlined"
                    onClick={handleModalClose}
                    sx={{ width: "100%" }}
                  >
                    Close
                  </Button>
                </Box>
              </Modal>
            </Box>
          
        </Box>
      </div>
    );
  }
  export default SPOCScreenForChild;