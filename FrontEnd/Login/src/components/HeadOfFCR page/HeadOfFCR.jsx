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
    DialogActions,
Card,
DialogContent,
DialogTitle,
Dialog,
 
 
  } from "@mui/material";
  import { ExpandMore, ExpandLess } from "@mui/icons-material";
  import FolderIcon from "@mui/icons-material/Folder";
  import { useState, useEffect} from "react";
  import DeleteIcon from "@mui/icons-material/Delete";
  
 
  import CancelIcon from "@mui/icons-material/Cancel";
  import PreviewIcon from '@mui/icons-material/Preview';



  import { useNavigate } from 'react-router-dom';
  import Swal from "sweetalert2";
  import axios from "axios";
  function HeadOfFCR({loggedInUser}) {

        
        
      
        const navigate = useNavigate();
      
        const sublitToCreditReviewer = () => {
          navigate("/dashtoAssign");
        };
       
      
        {/************ Planning & Assigning Stage *********/ }  
        const [planningValue, setPlanningValue] = useState("");
        const [assignee, setAssignee] = useState("");
        const [selectedCase, setSelectedCase] = useState("");
        
      
        const handlePlanningChange = (event) => {
          setPlanningValue(event.target.value);
        };
    
        const handleAssigneeChange = (event) => {
            setAssignee(event.target.value);
          };
          const handleSaveAndClose = () => {
            const formData = {
              planning: planningValue,
              assignee: assignee,
            };
          
            if (!formData.planning || !formData.assignee) {
              alert("Please fill out all required fields before saving.");
              return;
            }
          
        
            console.log("Saving form data:", formData);
          
        
            fetch("https://Here we will add our API to save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to save data.");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Data saved successfully:", data);
          
                alert("Form saved successfully!");
              })
              .catch((error) => {
                console.error("Error saving data:", error);
                alert("An error occurred while saving the form. Please try again.");
              });
          };

           {/************ Planning & Assigning Stage *********/ }

           
            {/************ Additional System Info *********/ }

    const [selectedCommentType, setSelectedCommentType] = useState("All");
    const [additionalInfoExpanded, setAdditionalInfoExpanded] = useState(false);
    const toggleAdditionalInfo = () => {
    setAdditionalInfoExpanded(!additionalInfoExpanded);
  };

  const commentsData = [
    {
      id: 1,
      role: "Admin",
      category: "General",
      dateTime: "2024-12-19T10:30:00Z",
      description: "This is a sample comment.",
      user: "Tejas",
      type: "Manual",
    },
    {
      id: 2,
      role: "User",
      category: "Technical",
      dateTime: "2024-12-18T14:45:00Z",
      description: "Another comment here.",
      user: "Santosh",
      type: "MAIL",
    },
    {
      id: 3,
      role: "Credit Reviewer",
      category: "Technical",
      dateTime: "2024-12-18T14:45:00Z",
      description: "Another comment here.",
      user: "Lokesh",
      type: "MAIL",
    },
    {
      id: 2,
      role: "User",
      category: "Technical",
      dateTime: "2024-12-18T14:45:00Z",
      description: "Another comment here.",
      user: "Mayur",
      type: "Manual",
    }
  ];

  
  const [selectedSection, setSelectedSection] = useState("Case Audit");
  const [viewAudit, setViewAudit] = useState(false); 
  useEffect(() => {
    setViewAudit(false);
  }, [selectedCase]);

  const handleViewAuditClick = () => {
    setViewAudit(true); 
  };
  const caseData = [
    {
      caseRefNumber: "C12345",
      createdDate: "2024-12-01",
      status: "Case Created",
      steps: [
        {
          status: "Case Created",
          updateDate: "2024-12-01",
          actionBy: "John Doe",
          creditReviewer: null,
          spocName: "SPOC", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case sent to Head of FCR",
          updateDate: "2024-12-02",
          actionBy: "Alice Smith",
          creditReviewer: null,
          spocName: "HOR", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case Approved Head of FCR",
          updateDate: "2024-12-03",
          actionBy: "Bob Johnson",
          creditReviewer: null,
          spocName: "Head of FCR", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case sent to Credit Reviewer",
          updateDate: "2024-12-04",
          actionBy: "Charlie Brown",
          creditReviewer: "Head of FCR",
          spocName: "John Doe",  
          seniorCreditReviewer: null,
        },
        {
          status: "ChildIssue sent to SPOC",
          updateDate: "2024-12-05",
          actionBy: "James Bond",
          creditReviewer: "Credit Reviewer",
          spocName: "Johnny Sins",
          seniorCreditReviewer: null,
        },
        {
          status: "SPOC Responded to ChildIssue",
          updateDate: "2024-12-06",
          actionBy: "James Bond",
          creditReviewer: "SPOC",
          spocName: "Johnny Sins",
          seniorCreditReviewer: null,
        },
        {
          status: "Case Submitted to Senior Credit Reviewer",
          updateDate: "2024-12-07",
          actionBy: "Jasprit Bumbrah",
          creditReviewer: "SPOC",
          spocName: "Johnny Sins",
          seniorCreditReviewer: "James Bond",
        },
        {
          status: "Case Closed By Senior Credit Reviewer",
          updateDate: "2024-12-08",
          actionBy: "Jasprit Bumbrah",
          creditReviewer: "Senior Credit Reviewer",
          spocName: "Johnny Sins",
          seniorCreditReviewer: "James Bond",
        },
      ],
    },
    {
      caseRefNumber: "C12346",
      createdDate: "2024-12-10",
      status: "Case Created",
      steps: [
        {
          status: "Case Created",
          updateDate: "2024-12-10",
          actionBy: "Emma Watson",
          creditReviewer: null,
          spocName: "Admin", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case sent to Head of FCR",
          updateDate: "2024-12-11",
          actionBy: "Lucas Brown",
          creditReviewer: null,
          spocName: "Admin", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case Approved Head of FCR",
          updateDate: "2024-12-12",
          actionBy: "Sophia Lee",
          creditReviewer: null,
          spocName: "Head of FCR", 
          seniorCreditReviewer: null,
        },
        {
          status: "Case sent to Credit Reviewer [Priya Sharma]",
          updateDate: "2024-12-13",
          actionBy: "Ethan Green",
          creditReviewer: "Head of FCR",
          spocName: "Priya Sharma", 
          seniorCreditReviewer: null,
        },
        {
          status: "ChildIssue sent to SPOC",
          updateDate: "2024-12-14",
          actionBy: "Santosh",
          creditReviewer: "Credit Reviewer",
          spocName: "Priya Sharma",
          seniorCreditReviewer: null,
        },
        {
          status: "SPOC Responded to ChildIssue",
          updateDate: "2024-12-15",
          actionBy: "Santosh",
          creditReviewer: "SPOC",
          spocName: "Priya Sharma",
          seniorCreditReviewer: null,
        },
        {
          status: "Case Submitted to Senior Credit Reviewer",
          updateDate: "2024-12-16",
          actionBy: "Bandaru",
          creditReviewer: "SPOC",
          spocName: "Priya Sharma",
          seniorCreditReviewer: "Santosh",
        },
        {
          status: "Case Closed By Senior Credit Reviewer",
          updateDate: "2024-12-17",
          actionBy: "Bandaru",
          creditReviewer: "Senior Credit Reviewer",
          spocName: "Priya Sharma",
          seniorCreditReviewer: "Santosh",
        },
      ],
    },
  ];
  
  
  const getActivityName = (status, caseItem) => {
    switch (status) {
      case "Case Created":
        return caseItem.steps.find(step => step.status === "Case Created")?.spocName || "-";
      case "Case sent to Head of FCR":
        return caseItem.steps.find(step => step.status === "Case sent to Head of FCR")?.headOfReviewer || "-";
      case "Case Approved Head of FCR":
        return caseItem.steps.find(step => step.status === "Case Approved Head of FCR")?.spocName || "-";
      case "Case sent to Credit Reviewer":
        return caseItem.steps.find(step => step.status.includes("Case sent to Credit Reviewer"))?.creditReviewer || "-";
      case "ChildIssue sent to SPOC":
        return caseItem.steps.find(step => step.status === "ChildIssue sent to SPOC")?.spocName || "-";
      case "SPOC Responded to ChildIssue":
        return caseItem.steps.find(step => step.status === "SPOC Responded to ChildIssue")?.creditReviewer || "-";
      case "Case Submitted to Senior Credit Reviewer":
        return caseItem.steps.find(step => step.status === "Case Submitted to Senior Credit Reviewer")?.seniorCreditReviewer || "-";
      case "Case Closed By Senior Credit Reviewer":
        return caseItem.steps.find(step => step.status === "Case Closed By Senior Credit Reviewer")?.seniorCreditReviewer || "-";
      default:
        return "-";
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);  
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);  
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));  
  };

  {/************ Additional System Info *********/ }
























//  First modifications
   const [groupTasks, setGroupTasks] = useState([]);
     const [selectedTask, setSelectedTask] = useState(null);
     const [myTasks, setMyTasks] = useState([]);
     const [isDialogOpen, setIsDialogOpen] = useState(false);
     const [formValues, setFormValues] = useState({
       reviewId: '',
       groupName: '',
       division: '',
     });

  const staticJWTToken = localStorage.getItem('Bearer');

  const decodeJWT = (token) => {
    if (!token || token.split(".").length !== 3) {
      throw new Error("Invalid token format");
    }
    const payload = token.split(".")[1];  // Get the payload part
    const decodedPayload = JSON.parse(atob(payload));  // Decode from Base64 to 
    console.log(decodedPayload);
    return decodedPayload;
  };
  
  const decodedToken = decodeJWT(staticJWTToken);
  const name = decodedToken.sub;
  const roles = decodedToken.roles;
  console.log("name is ",name);
  const roleDisplay = Array.isArray(roles) ? roles.join(', ') : roles;
  console.log("roles are :",roles);


  
      
       
  const handlePlayClick = async (task) => {
    // Prepare the payload based on the clicked task and your logic.
    const payload = {
      caseRefNo: task.caseRefNo, // Pass the caseRefNo to identify the task
      actions: "Submit to Sr.CreditReviewer", // This is the action when clicking
      status: task.status, // Keep the existing status
      assignedTo: "", // Update the assigned_to value
      activityLevel:"Sr.CreditReviewer",
      updatedDate: new Date().toISOString(), // Set current date as updated date
      planing: task.planing, // Keep the existing planing
      fieldWork: task.fieldWork, // Keep the existing fieldWork
    };
  
    // Send the payload to the backend to update the task
    try {
      const response = await axios.post(
        'http://localhost:1001/api/submitTaskLeader', // API endpoint to update task
        payload,
        {
          headers: {
            'Authorization': `Bearer ${staticJWTToken}`,
            'username': name,
          },
        }
      );
  
      if (response.status === 200) {
        // On success, update the frontend task and move it to 'My Task'
        navigate("/dashtoAssign");
        setGroupTasks((prevTasks) => prevTasks.filter(t => t.caseRefNo !== task.caseRefNo)); // Remove from group tasks
        setMyTasks((prevTasks) => [...prevTasks, { ...task, assignedTo: "Sr.CreditReviewer" }]); // Add to my tasks
        setMyTasks([task]);
        setSelectedTask('my');
        Swal.fire({
          icon: 'success',
          title: 'Task Updated',
          text: 'The task has been successfully updated.',
          confirmButtonColor: '#3085d6',
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Task',
          text: 'There was an issue updating the task.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'An error occurred while updating the task. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };
  
  












  // Second Modificaiton
  
  const [open, setOpen] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);
      const [file, setFile] = useState(null);

    const handleClose = () => {
        setOpen(false);
      }; 
      const handleDeleteFileForObligor = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
    };

        
        const handleFileUploadForObligor = (file) => {
          if (file) {
              setUploadedFiles((prevFiles) => [
                  ...prevFiles,
                  { fileName: file.name, fileSize: file.size },
              ]);
              uploadFile(file);
          }
      };
      const handleClickOpen = (index) => {
        setFileIndex(index);
        setOpen(true);
      };

      const handleSubmitToDashboard = (event) => {
        event.preventDefault();

        // Validation for file upload
        if (
            (planningValue === "Planning Completed" || planningValue === "Planning in-Progress") &&
            !file
        ) {
            Swal.fire({
                icon: "warning",
                title: "Upload Required",
                text: "Please upload a document before submitting.",
            });
            return;
        }

      

        // Show loader and simulate submission
        if (file) {
            uploadFile(file);
        }

        Swal.fire({
            title: "Submitting...",
            text: "Please wait while we process your submission.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            timer: 3000,
            timerProgressBar: true,
        }).then(() => {
            // After the loader, show success message
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Your form has been submitted successfully!",
            });

            setPlanningValue("");
            setAssignee("");
            setFile(null);

            navigate("/dashboardfcr");
        });
    };

   const handleFileDelete = () => {
      setFile(null);
    };
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    

    const uploadFile = async (file) => {
      const uploadFileId = Date.now(); // Example of using current timestamp for unique ID
      const formData = new FormData();
      formData.append('file', file);

      try {
          const response = await axios.post(
              `http://localhost:1001/api/upload/addFile/${uploadFileId}`,
              formData,
              {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${staticJWTToken}`,
                      'username': name
                  },
              }
          );

          if (response.status === 201) {
              console.log('File uploaded successfully:', response.data);
              // Handle success (add the uploaded file details to the state)
              setUploadedFiles((prevFiles) => [
                  ...prevFiles,
                  { fileName: file.name, fileSize: file.size, fileUrl: response.data.fileUrl } // Assuming the response contains a URL for the uploaded file
              ]);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
          // Handle error (e.g., show error message)
          setOpen(false);
          Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error uploading the file. Please try again.",
          });
      }
  };
  

 
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

  <Box
  className="mb-6 p-4"
  sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
>
  <Typography variant="h6" className="text-orange-500 font-bold mb-4">
    Planning & Action Stage
  </Typography>
  <Box className="bg-white p-4 rounded-lg shadow-sm">
    <Box className="flex flex-wrap items-center space-x-4 gap-4">
      <TextField
        select
        label="Take Action"
        value={assignee}
        onChange={handleAssigneeChange}
        className="w-full sm:w-1/3"
        size="small"
        sx={{ backgroundColor: "white" }}
      >
        <MenuItem value="User A">Approve</MenuItem>
        <MenuItem value="User B">Reject</MenuItem>
      </TextField>

      {/* Container for right-aligned buttons */}
  
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#f27013',
                '&:hover': {
                  backgroundColor: '#d95b0f',
                },
              }}
              onClick={handleSubmitToDashboard}
            >
              Submit
            </Button>

            <Box>
      <PreviewIcon 
        onClick={handleClickOpen} 
        sx={{ cursor: 'pointer', color: '#f27013', '&:hover': { color: '#e0600d' } }} 
      />
      {/* Dialog for File Upload */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <Card className="p-4" style={{ width: '400px' }}>
          <Button
  variant="outlined"
  component="label"
  sx={{
    borderColor: '#f27013',
    color: '#f27013',
    '&:hover': {
      borderColor: '#e0600d',
      color: '#f27013',
    }
  }}
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
    </Box>
  
        
          </Box>

          <Box
            className="flex justify-end"
            sx={{ marginTop: 4 }}
          >
           <Button
  variant="contained"
  className="text-white"
  onClick={handleSaveAndClose}
  sx={{
    backgroundColor: '#f27013',
    '&:hover': {
      backgroundColor: '#d95b0f',
    },
  }}
>
  Save & Close
</Button>

          </Box>
                  
          
        </Box>
      </Box>
  
      </Box>
 
 
   
 
  
  {/* Save & Close Button */}
  <Box className="flex justify-end mt-4">
    <Button
      variant="contained"
      className="bg-orange-500 text-white hover:bg-orange-600"
      onClick={handleSaveAndClose}
    >
      Save & Close
    </Button>
  </Box>
 

 
<Box
  className="mt-6 p-4"
  sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
>
  <Typography variant="h6" className="text-orange-500 font-bold mb-4">
    Additional System Info
    <IconButton
      onClick={toggleAdditionalInfo}
      sx={{ marginLeft: "auto" }}
    >
      {additionalInfoExpanded ? (
        <ExpandLess className="text-orange-500" />
      ) : (
        <ExpandMore className="text-orange-500" />
      )}
    </IconButton>
  </Typography>
  {additionalInfoExpanded && (
    <Box className="bg-white p-4 rounded-lg shadow-sm">
      <Box className="flex flex-wrap space-x-4 mb-4">
        {["All Comments", "File Upload", "Case Audit"].map((section) => (
          <Button
            key={section}
            variant={selectedSection === section ? "contained" : "outlined"}
            className={`${
              selectedSection === section
                ? "bg-orange-500 text-white"
                : "text-orange-500 border-orange-500"
            }`}
            onClick={() => setSelectedSection(section)}
            sx={{ marginBottom: "10px" }}
          >
            {section}
          </Button>
        ))}
      </Box>

      {selectedSection === "All Comments" && (
        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend" className="text-orange-500">
              COMMENTS
            </FormLabel>
            <RadioGroup
              value={selectedCommentType}
              onChange={(e) => setSelectedCommentType(e.target.value)}
              row
              sx={{ flexDirection: { xs: "column", sm: "row" } }}  
            >
              {["All", "Manual", "MAIL"].map((type) => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={type}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Table */}
          <Table className="mt-4" sx={{ width: "100%", overflowX: "auto" }}>
            <TableHead>
              <TableRow>
                {[
                  "Comment ID",
                  "Comment By Role",
                  "Category Of Comment",
                  "Comment Date Time",
                  "Comment DESC",
                  "Comment By User",
                  "Actions",
                ].map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {commentsData
                .filter((comment) => {
                  if (selectedCommentType === "All") return true;
                  return comment.type === selectedCommentType;
                })
                .map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>{comment.id}</TableCell>
                    <TableCell>{comment.role}</TableCell>
                    <TableCell>{comment.category}</TableCell>
                    <TableCell>
                      {new Date(comment.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{comment.description}</TableCell>
                    <TableCell>{comment.user}</TableCell>
                    <TableCell>{comment.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {selectedSection === "File Upload" && (
        <Box>
          <Typography className="text-gray-700">
            Please upload your case documents here!
          </Typography>
          <input
            type="file"
            id="file-input"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              className="bg-orange-500 text-white mt-4"
              sx={{ size: "small" }} 
            >
              Upload File
            </Button>
          </label>
          <Box mt={2}>
            {uploadedFiles.length > 0 && (
              <>
                <Typography className="text-gray-700">
                  <strong>Uploaded Files:</strong>
                </Typography>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 mt-2"
                    >
                      <span>{file.name}</span>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Box>
        </Box>
      )}

      {selectedSection === "Case Audit" && (
        <Box>
          <FormControl fullWidth className="mb-4">
            <InputLabel id="select-case-label">Select Case</InputLabel>
            <Select
              labelId="select-case-label"
              id="select-case"
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              label="Select Case"
            >
              {caseData.map((caseItem) => (
                <MenuItem
                  key={caseItem.caseRefNumber}
                  value={caseItem.caseRefNumber}
                >
                  {caseItem.caseRefNumber} - {caseItem.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCase && !viewAudit && (
            <Button
              variant="contained"
              className="bg-orange-500 text-white mt-4"
              onClick={handleViewAuditClick}
              sx={{ size: "small" }}  
            >
              View Audit
            </Button>
          )}

          {viewAudit && selectedCase && (
            <Box>
              <Table className="mt-4" sx={{ width: "100%", overflowX: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Case Ref Number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Update Date</TableCell>
                    <TableCell>Action By</TableCell>
                    <TableCell>Activities</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {caseData
                    .filter((caseItem) => caseItem.caseRefNumber === selectedCase)
                    .map((caseItem) =>
                      caseItem.steps.map((step, index) => (
                        <TableRow key={`${caseItem.caseRefNumber}-${index}`}>
                          <TableCell>{caseItem.caseRefNumber}</TableCell>
                          <TableCell>{step.status}</TableCell>
                          <TableCell>{caseItem.createdDate}</TableCell>
                          <TableCell>{step.updateDate}</TableCell>
                          <TableCell>{step.actionBy}</TableCell>
                          <TableCell>{getActivityName(step.status, caseItem)}</TableCell>
                        </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )}
</Box>
    </div>
  )
}

export default HeadOfFCR
