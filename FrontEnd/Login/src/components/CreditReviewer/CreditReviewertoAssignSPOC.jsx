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
import axios from 'axios'

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
import FolderIcon from "@mui/icons-material/Folder";
import CancelIcon from "@mui/icons-material/Cancel";
function CreditReviewertoAssignSPOC({ loggedInUser },{initialChildRows = [] }) {
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

  const [obligourId, setObligorId] = useState("");

  const [isObservationModalVisible, setObservationModalVisible] =
    useState(false);

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

  const handleAddObligor = () => {
    setIsAddObligorVisible(!isAddObligorVisible);
  };
  
  const handleCloseModal = () => {
    setIsAddObligorVisible(false);
  };

  const decodeJWT = (token) => {
    if (!token || token.split(".").length !== 3) {
      throw new Error("Invalid token format");
    }
    const payload = token.split(".")[1];  // Get the payload part
    const decodedPayload = JSON.parse(atob(payload));  // Decode from Base64 to 
    console.log(decodedPayload);
    return decodedPayload;
  };
  const token = localStorage.getItem('Bearer');
  
  const decodedToken = decodeJWT(token);
  const name = decodedToken.sub;
  
  const handleAddObligorToTable = async () => {
    if (obligourId && division && cifId && premId) {
      const newObligor = {
        obligourId: obligourId,
        divisionName: division,
        cifId: cifId,
        premId: premId,
        childReviewId: null,
        assignedTo: null,
        status: null,
        activityLevel: null,
        actions: null,
      };
  
      try {

  
        const response = await axios.post("http://localhost:1000/api/obligour/add", newObligor, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "username": name,
          },
        });
        console.log(response);
  
        // Add returned data to local obligors array
        const savedObligor = response.data;
        setObligors([
          ...obligors,
          { 
            ...savedObligor, 
            // childReviewId: obligors.length + 1, 
            childReviewId: Math.floor(Math.random() * (999 - 500 + 1)) + 500,
            division: savedObligor.divisionName, 
          },
        ]);
  
        // Reset input fields
        setObligorId("");
        setDivision("");
        setCifId("");
        setPremId("");
        
        // Close modal before showing Swal
        handleCloseModal();
  
        // SweetAlert2 success effect
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Obligor added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        handleCloseModal(); // Close modal on error
  
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to add obligor.",
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


  // const handleClarification = (obligor) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: `You are about to send clarification for Obligor: ${obligor.obligorName}.`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, clarify!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Add obligor to Work on Child Issue table, leaving other fields empty
  //       const newChildRow = {
  //         childReviewId: obligor.childReviewId,
  //         obligourId: obligor.obligourId,
  //         premId: obligor.premId, // Empty
  //         cifId: obligor.cifId,  // Empty
  //         division: obligor.divisionName, // Empty
  //         reviewStatus: "in-Progress", // Empty
  //         createdBy:loggedInUser, // Empty
  //       };
  
  //       // Add the new row to the table
  //       setChildRows((prevRows) => [...prevRows, newChildRow]);
  
  //       Swal.fire({
  //         icon: "success",
  //         title: "Clarification Sent!",
  //         text: `Clarification sent for Obligor: ${obligor.obligorName}.`,
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //     }
  //   });
  // };
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
        // Prepare newChildRow object
        const newChildRow = {
          obligourId: obligor.obligourId,
          childReviewId: obligor.childReviewId,
          premId: obligor.premId, 
          cifId: obligor.cifId,  
          //division: obligor.divisionName, 
          //reviewStatus: "in-Progress",
          divisionName: obligor.divisionName,
          status: "in-Progress",
          createdBy: loggedInUser,
          assignedTo: null,
          caseRefNo: null,
          activityLevel: null,
          
        };
      //  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlNwb2MgLFNyLkNyZWRpdFJldmlld2VyLCBDcmVkaXRSZXZpZXdlcixIZWFkT2ZGY3IiLCJzdWIiOiJMb2tlc2giLCJpYXQiOjE3Mzc0Nzk2MTgsImV4cCI6MTczNzQ4MzIxOH0.k76QW1fbo1OIbfTKS8a_6d774BnFNcIwiVnSYu5wSQg";
        // Axios POST request
        axios
          .post("http://localhost:1000/api/childReview/add", newChildRow, {
            headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
             "username":name,
            },
          })
          .then((response) => {
            // Update the childRows state with the new row
            setChildRows((prevRows) => [...prevRows, response.data]);
  
            Swal.fire({
              icon: "success",
              title: "Clarification Sent!",
              text: `Clarification sent for Obligor: ${obligor.obligorName}.`,
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response?.data?.message || "Failed to send clarification.",
            });
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
  

  const [assignee, setAssignee] = useState("");
    const [file, setFile] = useState(null);
    const handleAssigneeChange = (event) => {
        setAssignee(event.target.value);
      };
      const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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
      document.getElementById("addViewButton").focus();  // Focus on the button after modal is closed

    };

 
  
  const handleQuerySubmit = () => {
    setQueryDetails([
      ...queryDetails,
      { queryText, createdOn: new Date().toLocaleString(), createdBy: "User" },
    ]);
    setQueryText("");
    handleModalClose();
  };

  // const [lastQueryId, setLastQueryId] = useState(0); // Initial value for queryId


  
  // const handleQuerySubmit = (childReviewId) => {
  //   // Increment lastQueryId for the next query
  //   const newQueryId = lastQueryId + 1;

  //   const newQuery = {
  //     queryId: newQueryId,
  //     childReviewId: childReviewId,
  //     queryDescription: queryText,
  //     response: null, // Empty initially
  //     caseRefNo: null, // Setting other fields as null
  //     assignedTo: null,
  //     status: null,
  //   };

  //   const jwtToken =
  //     "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlNwb2MgLFNyLkNyZWRpdFJldmlld2VyLCBDcmVkaXRSZXZpZXdlcixIZWFkT2ZGY3IiLCJzdWIiOiJMb2tlc2giLCJpYXQiOjE3Mzc0Nzk2MTgsImV4cCI6MTczNzQ4MzIxOH0.k76QW1fbo1OIbfTKS8a_6d774BnFNcIwiVnSYu5wSQg";

  //   axios
  //     .post("http://localhost:1000/api/query/add", newQuery, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${jwtToken}`,
  //         "username":"Lokesh",
  //       },
  //     })
  //     .then((response) => {
  //       // Update lastQueryId and add new query to state
  //       setLastQueryId(newQueryId);
  //       setQueryDetails((prevDetails) => [
  //         ...prevDetails,
  //         {
  //           queryText,
  //           createdOn: new Date().toLocaleString(),
  //           createdBy: loggedInUser,
  //         },
  //       ]);
  //       setQueryText("");

  //       Swal.fire({
  //         icon: "success",
  //         title: "Query Submitted!",
  //         text: `Query with ID ${response.data.queryId} has been successfully submitted.`,
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.response?.data?.message || "Failed to submit the query.",
  //       });
  //     });
  // };
  

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

  {
    /********   SPOC *********/
  }
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSPOC, setSelectedSPOC] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);

  
  
  // Sample data for child reviews

  const divisionDetails = {
    GroupA: {
      Division1: ["SPOC1", "SPOC2", "SPOC3", "SPOC4", "SPOC5"],
      Division2: ["SPOC6", "SPOC7", "SPOC8", "SPOC9", "SPOC10"],
      Division3: ["SPOC11", "SPOC12", "SPOC13", "SPOC14", "SPOC15"],
      Division4: ["SPOC16", "SPOC17", "SPOC18", "SPOC19", "SPOC20"],
      Division5: ["SPOC21", "SPOC22", "SPOC23", "SPOC24", "SPOC25"],
    },
    GroupB: {
      Division1: ["SPOC26", "SPOC27", "SPOC28", "SPOC29", "SPOC30"],
      Division2: ["SPOC31", "SPOC32", "SPOC33", "SPOC34", "SPOC35"],
      Division3: ["SPOC36", "SPOC37", "SPOC38", "SPOC39", "SPOC40"],
      Division4: ["SPOC41", "SPOC42", "SPOC43", "SPOC44", "SPOC45"],
      Division5: ["SPOC46", "SPOC47", "SPOC48", "SPOC49", "SPOC50"],
    },
    GroupC: {
      Division1: ["SPOC51", "SPOC52", "SPOC53", "SPOC54", "SPOC55"],
      Division2: ["SPOC56", "SPOC57", "SPOC58", "SPOC59", "SPOC60"],
      Division3: ["SPOC61", "SPOC62", "SPOC63", "SPOC64", "SPOC65"],
      Division4: ["SPOC66", "SPOC67", "SPOC68", "SPOC69", "SPOC70"],
      Division5: ["SPOC71", "SPOC72", "SPOC73", "SPOC74", "SPOC75"],
    },
    GroupD: {
      Division1: ["SPOC76", "SPOC77", "SPOC78", "SPOC79", "SPOC80"],
      Division2: ["SPOC81", "SPOC82", "SPOC83", "SPOC84", "SPOC85"],
      Division3: ["SPOC86", "SPOC87", "SPOC88", "SPOC89", "SPOC90"],
      Division4: ["SPOC91", "SPOC92", "SPOC93", "SPOC94", "SPOC95"],
      Division5: ["SPOC96", "SPOC97", "SPOC98", "SPOC99", "SPOC100"],
    },
    GroupE: {
      Division1: ["SPOC101", "SPOC102", "SPOC103", "SPOC104", "SPOC105"],
      Division2: ["SPOC106", "SPOC107", "SPOC108", "SPOC109", "SPOC110"],
      Division3: ["SPOC111", "SPOC112", "SPOC113", "SPOC114", "SPOC115"],
      Division4: ["SPOC116", "SPOC117", "SPOC118", "SPOC119", "SPOC120"],
      Division5: ["SPOC121", "SPOC122", "SPOC123", "SPOC124", "SPOC125"],
    },
  };

  const toggleSpocSection = () => {
    setIsSpocSectionOpen((prevState) => !prevState);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setSelectedDivision("");
    setSelectedSPOC("");
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedSPOC("");
  };

  const handleSPOCChange = (event) => {
    setSelectedSPOC(event.target.value);
  };

  const handleDoubleClick = (type, value) => {
    if (type === "group") {
      setSelectedGroup(selectedGroup === value ? "" : value);
    } else if (type === "division") {
      setSelectedDivision(selectedDivision === value ? "" : value);
    } else if (type === "spoc") {
      setSelectedSPOC(selectedSPOC === value ? "" : value);
    }
  };

  const toggleSPOC = () => setAdditionalInfoExpanded((prev) => !prev);

  {
    /********   SPOC *********/
  }

  {
    /********    Additional System Info *********/
  }

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
    },
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
        return (
          caseItem.steps.find((step) => step.status === "Case Created")
            ?.spocName || "-"
        );
      case "Case sent to Head of FCR":
        return (
          caseItem.steps.find(
            (step) => step.status === "Case sent to Head of FCR"
          )?.headOfReviewer || "-"
        );
      case "Case Approved Head of FCR":
        return (
          caseItem.steps.find(
            (step) => step.status === "Case Approved Head of FCR"
          )?.spocName || "-"
        );
      case "Case sent to Credit Reviewer":
        return (
          caseItem.steps.find((step) =>
            step.status.includes("Case sent to Credit Reviewer")
          )?.creditReviewer || "-"
        );
      case "ChildIssue sent to SPOC":
        return (
          caseItem.steps.find(
            (step) => step.status === "ChildIssue sent to SPOC"
          )?.spocName || "-"
        );
      case "SPOC Responded to ChildIssue":
        return (
          caseItem.steps.find(
            (step) => step.status === "SPOC Responded to ChildIssue"
          )?.creditReviewer || "-"
        );
      case "Case Submitted to Senior Credit Reviewer":
        return (
          caseItem.steps.find(
            (step) => step.status === "Case Submitted to Senior Credit Reviewer"
          )?.seniorCreditReviewer || "-"
        );
      case "Case Closed By Senior Credit Reviewer":
        return (
          caseItem.steps.find(
            (step) => step.status === "Case Closed By Senior Credit Reviewer"
          )?.seniorCreditReviewer || "-"
        );
      default:
        return "-";
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  {
    /********    Additional System Info *********/
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
      {/********  Field Work Stage ******* */}
      <Box
  className="mt-6 p-4"
  sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Title Section */}
    <Typography variant="h6" className="text-orange-500 font-bold">
      Field Work Stage
      <IconButton onClick={handleFieldWorkStageToggle}>
        {isFieldWorkStageExpanded ? (
          <ExpandLess className="text-orange-500" />
        ) : (
          <ExpandMore className="text-orange-500" />
        )}
      </IconButton>
    </Typography>

    {/* Action Section */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Dropdown */}
      <TextField
        select
        label="Take Action"
        value={assignee}
        onChange={handleAssigneeChange}
        size="small"
        sx={{ backgroundColor: "white", width: 200 }}
      >
        <MenuItem value="User A">Submit to SPOC</MenuItem>
      </TextField>

      {/* File Upload */}
      <input
        type="file"
        accept="application/pdf,application/vnd.ms-excel"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload"> 
        <IconButton
          component="span"
          sx={{
            backgroundColor: "#f27013",
            color: "white",
            "&:hover": { backgroundColor: "#ed7315" },
          }}
          aria-label="Upload File"
        >
          <FolderIcon />
        </IconButton>
      </label>

      {/* Submit Button */}
      <Button
        variant="contained"
        className="bg-orange-500 text-white hover:bg-orange-600"
        sx={{backgroundColor:'#f27013'}}
      >
        Submit
      </Button>
    </Box>
  </Box>

  {/* Additional Content */}
  {file && (
    <Box display="flex" alignItems="center" mt={2}>
      <Typography variant="body2" sx={{ marginRight: 1 }}>
        {file.name}
      </Typography>
      <IconButton
        color="error"
        onClick={handleFileDelete}
        sx={{
          backgroundColor: "#f44336",
          color: "white",
          "&:hover": { backgroundColor: "#d32f2f" },
        }}
        aria-label="Delete File"
      >
        <CancelIcon />
      </IconButton>
    </Box>
  )}


        <Box className="bg-white p-4 rounded-lg shadow-sm">
          {isFieldWorkStageExpanded && (
            <Box className="mt-4">
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
               <Button
  variant="contained"
  startIcon={<AddIcon />}
  onClick={handleAddObligor}
  sx={{
    backgroundColor: '#f27013',
    color: 'white',
    '&:hover': {
      backgroundColor: '#e0600d'
    }
  }}
>
  Add New Obligor
</Button>

              </Box>

              {/* Modal for Add New Obligor */}
              <Modal open={isAddObligorVisible} onClose={handleCloseModal}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 800, // Increased width
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 8, // Increased padding
                  }}
                >
                  <Typography variant="h6" className="text-center mb-4">
                    Add New Obligor
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Obligor"
                        value={obligourId}
                        onChange={(e) => setObligorId(e.target.value)}
                        fullWidth
                        size="small"
                        error={!obligourId} // Validation
                        helperText={!obligourId ? "Obligor is required" : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        select
                        label="Division"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        fullWidth
                        size="small"
                        error={!division}
                        helperText={!division ? "Division is required" : ""}
                      >
                        <MenuItem value="Special Assets">
                          Special Assets
                        </MenuItem>
                        <MenuItem value="AMIQB">AMIQB</MenuItem>
                        <MenuItem value="Bank">Bank</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CIF ID"
                        value={cifId}
                        onChange={(e) => setCifId(e.target.value)}
                        fullWidth
                        size="small"
                        error={!cifId} // Validation
                        helperText={!cifId ? "CIF ID is required" : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="PREM ID"
                        value={premId}
                        onChange={(e) => setPremId(e.target.value)}
                        fullWidth
                        size="small"
                        error={!premId} // Validation
                        helperText={!premId ? "PREM ID is required" : ""}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          if (obligourId && division && cifId && premId) {
                            handleAddObligorToTable();
                          } else {
                            alert("Please fill all required fields.");
                          }
                        }}
                        className="bg-orange-500 text-white hover:bg-orange-600"
                      >
                        Add Obligor
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>

              <Box sx={{ marginTop: 4 }}>
                <Typography
                  variant="h6"
                  className="text-gray-700 font-bold mb-2"
                >
                  Obligor Details
                </Typography>
                <TableContainer component={Paper}>
  <Table >
    <TableHead>
      <TableRow>
        <TableCell>Child Review ID</TableCell>
        <TableCell>Division</TableCell>
        <TableCell>Obligor ID</TableCell>
        <TableCell>PREM ID</TableCell>
        <TableCell>CIF ID</TableCell>
        <TableCell>Send For Clarification</TableCell>
        <TableCell>Add/View Observation</TableCell>
        <TableCell>Delete</TableCell>
        <TableCell>View/Upload</TableCell>
      </TableRow>
    </TableHead>
    <TableBody >
      {obligors.map((obligor, index) => (
        <TableRow key={index}>
          <TableCell>{obligor.childReviewId}</TableCell>
          <TableCell>{obligor.divisionName}</TableCell>
          <TableCell>{obligor.obligourId}</TableCell>
          <TableCell>{obligor.premId}</TableCell>
          <TableCell>{obligor.cifId}</TableCell>
          
          <TableCell>
  <SearchOffIcon
    sx={{ cursor: 'pointer', color: '#f27013', '&:hover': { color: '#e0600d' } }}
    onClick={() => handleClarification(obligor)}
  />
</TableCell>


          <TableCell>
            <ArrowCircleRightTwoToneIcon  sx={{ cursor: 'pointer', color: '#f27013', '&:hover': { color: '#e0600d' } }}
              onClick={() => setObservationModalVisible(true)}
            />
          </TableCell>
          
          <TableCell>
            <DeleteIcon 
             sx={{ cursor: 'pointer', color: '#f27013', '&:hover': { color: '#e0600d' } }}
            onClick={() => handleDelete(obligor)} />
          </TableCell>
          
          
                     
          <TableCell>
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
    </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


                <Modal
                  open={isObservationModalVisible}
                  onClose={() => {
                    setObservationModalVisible(false);
                    setObservationText(""); // Clear observation text when modal closes
                  }}
                >
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
                      Observations {selectedCase.obligorName}{" "}
                      {/* Displaying selected obligor's name */}
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
                          onChange={(e) => setObservationText(e.target.value)} // Update observation text
                        />
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          className="bg-green-500 text-white hover:bg-green-600 mt-4"
                          onClick={handleAddObservation} // Handle the addition of the observation
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
                          count={Math.ceil(uploadedFiles.length / rowsPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                          className="mt-4"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/********  Field Work Stage ******* */}

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
  <Typography
    variant="h6"
    sx={{ color: "#ff6f00", fontWeight: "bold", mb: 4 }}
  >
    Response & Remediation Stage
  </Typography>

  <FormControl fullWidth sx={{ mb: 4 }}>
    <InputLabel>Do You Want To Work On?</InputLabel>
    <Select
      value={selectedOption}
      onChange={handleOptionChange}
      label="Do You Want To Work On?"
    >
      <MenuItem value="workOnChildIssue">Work On Child Issue</MenuItem>
      <MenuItem value="workInIssue">Work In Issue</MenuItem>
    </Select>
  </FormControl>

  {/* Display Child Review Table or Issue Table based on selected option */}
  {selectedOption === "workOnChildIssue" ? (
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
                Obligour ID
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
                Division Name
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
                  {row.obligourId}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                  {row.premId}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                  {row.cifId}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                  {row.divisionName}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                  {row.status}
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
        ) : (
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
                      />
                      <TextField
                        label="Context"
                        variant="outlined"
                        name="context"
                        value={issueFields.context}
                        onChange={handleIssueFieldChange}
                      />
                      <TextField
                        label="Risk/Remediation"
                        variant="outlined"
                        name="riskRemediation"
                        value={issueFields.riskRemediation}
                        onChange={handleIssueFieldChange}
                      />
                      <TextField
                        label="FCR Recommendation"
                        variant="outlined"
                        name="fcrRecommendation"
                        value={issueFields.fcrRecommendation}
                        onChange={handleIssueFieldChange}
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
                      Raise
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
        )}
      </Box>

      {/********  SPOC ******* */}
      <Box
  className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out"
  sx={{
    boxShadow: 5,
    borderRadius: 3,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    position: "relative",
   
    padding: "20px",
    marginLeft: "16px",  
    marginRight: "16px",  
    marginTop: "20px",
  }}
>
  <Typography variant="h5" className="text-orange-600 font-semibold mb-5">
    SPOC
    <IconButton
      onClick={toggleAdditionalInfo}
      sx={{
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 1,
      }}
    >
      {additionalInfoExpanded ? (
        <ExpandLess className="text-orange-600" />
      ) : (
        <ExpandMore className="text-orange-600" />
      )}
    </IconButton>
  </Typography>

  {/* Check if the section is expanded */}
  {additionalInfoExpanded && (
    <Grid container spacing={4}>
      {/* Group Selection Column */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          borderRight: "2px solid #e0e0e0", // Vertical line separator
          paddingRight: "16px", // Add space to the right
        }}
      >
        <Typography
          variant="h6"
          className="text-gray-800 font-semibold mb-3"
        >
          Select a Group
        </Typography>
        <RadioGroup
          value={selectedGroup}
          onChange={handleGroupChange}
          sx={{ mb: 3 }}
        >
          {Object.keys(divisionDetails).map((group) => (
            <FormControlLabel
              key={group}
              value={group}
              control={<Radio sx={{ color: "#4A90E2" }} />}
              label={
                <Typography variant="body1" className="text-gray-700">
                  {group}
                </Typography>
              }
              onDoubleClick={() => handleDoubleClick("group", group)} // Double click to deselect
            />
          ))}
        </RadioGroup>
      </Grid>

      {/* Division Selection Column */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          borderRight: "2px solid #e0e0e0", // Vertical line separator
          paddingRight: "16px", // Add space to the right
        }}
      >
        {selectedGroup && (
          <>
            <Typography
              variant="h6"
              className="text-gray-800 font-semibold mb-3"
            >
              Select a Division in {selectedGroup}
            </Typography>
            <RadioGroup
              value={selectedDivision}
              onChange={handleDivisionChange}
              sx={{ mb: 3 }}
            >
              {Object.keys(divisionDetails[selectedGroup]).map(
                (division) => (
                  <FormControlLabel
                    key={division}
                    value={division}
                    control={<Radio sx={{ color: "#4A90E2" }} />}
                    label={
                      <Typography variant="body1" className="text-gray-700">
                        {division}
                      </Typography>
                    }
                    onDoubleClick={() =>
                      handleDoubleClick("division", division)
                    } // Double click to deselect
                  />
                )
              )}
            </RadioGroup>
          </>
        )}
      </Grid>

      {/* SPOC Selection Column */}
      <Grid item xs={12} sm={4}>
        {selectedDivision && (
          <>
            <Typography
              variant="h6"
              className="text-gray-800 font-semibold mb-3"
            >
              Select an SPOC in {selectedDivision}
            </Typography>
            <RadioGroup
              value={selectedSPOC}
              onChange={handleSPOCChange}
              sx={{ mb: 3 }}
            >
              {divisionDetails[selectedGroup][selectedDivision].map(
                (spoc) => (
                  <FormControlLabel
                    key={spoc}
                    value={spoc}
                    control={<Radio sx={{ color: "#4A90E2" }} />}
                    label={
                      <Typography variant="body1" className="text-gray-700">
                        {spoc}
                      </Typography>
                    }
                    onDoubleClick={() => handleDoubleClick("spoc", spoc)} // Double click to deselect
                  />
                )
              )}
            </RadioGroup>
          </>
        )}
      </Grid>
    </Grid>
  )}
</Box>

{/* SPOC */}


      {/* Additional System Information  */}
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
                onClick={() => setSelectedSection(section)}
                sx={{
                  marginBottom: "10px",
                  backgroundColor: selectedSection === section ? '#f27013' : 'transparent',
                  color: selectedSection === section ? 'white' : '#f27013',
                  borderColor: '#f27013',
                  '&:hover': {
                    backgroundColor: selectedSection === section ? '#e0600d' : '#f27013',
                    color: 'white',
                    borderColor: '#f27013'
                  }
                }}
              >
                {section}
              </Button>
            ))}
          </Box>
      
        

            {selectedSection === "All Comments" && (
              <Box>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="text-orange-500" >
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
                <Table
                  className="mt-4"
                  sx={{ width: "100%", overflowX: "auto" }}
                >
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
    sx={{
      backgroundColor: '#f27013',
      color: 'white',
      marginTop: '16px', // equivalent to mt-4 in Tailwind
      '&:hover': {
        backgroundColor: '#e0600d'
      },
      size: 'small'
    }}
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
                    <Table
                      className="mt-4"
                      sx={{ width: "100%", overflowX: "auto" }}
                    >
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
                          .filter(
                            (caseItem) =>
                              caseItem.caseRefNumber === selectedCase
                          )
                          .map((caseItem) =>
                            caseItem.steps.map((step, index) => (
                              <TableRow
                                key={`${caseItem.caseRefNumber}-${index}`}
                              >
                                <TableCell>{caseItem.caseRefNumber}</TableCell>
                                <TableCell>{step.status}</TableCell>
                                <TableCell>{caseItem.createdDate}</TableCell>
                                <TableCell>{step.updateDate}</TableCell>
                                <TableCell>{step.actionBy}</TableCell>
                                <TableCell>
                                  {getActivityName(step.status, caseItem)}
                                </TableCell>
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
  );
}
export default CreditReviewertoAssignSPOC;