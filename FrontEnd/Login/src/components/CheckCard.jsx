import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Pagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Grid,
    
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useState } from "react";

function CheckCard({ loggedInUser }) {
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedSPOC, setSelectedSPOC] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState('workOnChildIssue');
    const rowsPerPage = 10;
    const [issueTemplate, setIssueTemplate] = useState('');
    const [scoreCardTheme, setScoreCardTheme] = useState('');

    const [openCreateIssueDialog, setOpenCreateIssueDialog] = useState(false);
    const [openDivisionDetailsDialog, setOpenDivisionDetailsDialog] = useState(false); // Separate state for division details dialog

    const childReviews = Array.from({ length: 50 }, (_, index) => ({
        childReviewId: index + 1,
        division: `Division${index + 1}`,
        obligorName: `Obligor ${index + 1}`,
        cifId: `CIF${1000 + index}`,
        spoc: `SPOC${index + 1}`,
    }));

    const issueReviews = Array.from({ length: 50 }, (_, index) => ({
        reviewId: index + 1,
        issueId: `Issue${index + 1}`,
        caseStatus: `Status${index % 3 + 1}`,
        raiseIssueTemplate: `Template${index + 1}`,
    }));

    const divisionDetails = {
        Division1: {
            groups: {
                Group1: ["SPOC1", "SPOC2", "SPOC3", "SPOC4", "SPOC5"],
                Group2: ["SPOC6", "SPOC7", "SPOC8", "SPOC9", "SPOC10"],
            },
        },
        Division2: {
            groups: {
                Group1: ["SPOC11", "SPOC12", "SPOC13", "SPOC14", "SPOC15"],
                Group2: ["SPOC16", "SPOC17", "SPOC18", "SPOC19", "SPOC20"],
            },
        },
    };

    const paginatedChildRows = childReviews.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const paginatedIssueRows = issueReviews.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleSPOCClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDivision(null);
        setSelectedGroup(null);
        setSelectedSPOC(null);
        setIssueTemplate('');
        setScoreCardTheme('');
    };


    const handleDivisionChange = (division) => {
        setSelectedDivision(division);
        setSelectedGroup(null);
        setSelectedSPOC(null);
    };

    const handleGroupChange = (group) => {
        setSelectedGroup(group);
        setSelectedSPOC(null);
    };

    const handleSPOCChange = (spoc) => {
        setSelectedSPOC(spoc);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
   

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCreateButtonClick = () => {
        setOpenCreateIssueDialog(true); // Open Create Issue dialog
    };

    const handleCloseCreateIssueDialog = () => {
        setOpenCreateIssueDialog(false);
    };

    const handleOpenDivisionDetailsDialog = () => {
        setOpenDivisionDetailsDialog(true); // Open Division Details dialog
    };

    const handleCloseDivisionDetailsDialog = () => {
        setOpenDivisionDetailsDialog(false); // Close Division Details dialog
    };

  



    // Create Issue Form
    const [issueTemplateOpen, setIssueTemplateOpen] = useState(true);
    const [scoreCardThemeOpen, setScoreCardThemeOpen] = useState(true);
    

    const [issueFields, setIssueFields] = useState({
        issue: '',
        context: '',
        riskRemediation: '',
        fcrRecommendation: ''
    });
    const [scoreCardFields, setScoreCardFields] = useState({
        managementResponse: '',
        wrmResponse: ''
    });

  

    const handleIssueTemplateChange = (event) => {
        setIssueTemplate(event.target.value);
        setIssueTemplateOpen(!issueTemplateOpen); // Toggle dropdown visibility
    };

    const handleScoreCardThemeChange = (event) => {
        setScoreCardTheme(event.target.value);
        setScoreCardThemeOpen(!scoreCardThemeOpen); // Toggle dropdown visibility
    };

    const handleIssueFieldChange = (event) => {
        setIssueFields({ ...issueFields, [event.target.name]: event.target.value });
    };

    const handleScoreCardFieldChange = (event) => {
        setScoreCardFields({ ...scoreCardFields, [event.target.name]: event.target.value });
    };


    //Logic for Upload Files
     // States for file upload
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openUploadSection, setOpenUploadSection] = useState(false);


  // Handle file upload
  const handleFileUpload1 = (e) => {
    const newFiles = e.target.files;
    const fileList = Array.from(newFiles).map((file, index) => ({
      id: index,
      name: file.name,
      uploadedOn: new Date().toLocaleString(),
      uploadedBy: 'User', // Replace with dynamic user info if needed
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

  // Handle file delete
  const handleFileDelete = (fileId) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
    setUploadedFiles(updatedFiles);
  };

  // Handle pagination change
 
  // Uploaded files pagination
  const paginatedFiles = uploadedFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleUploadToggle = () => {
    setOpenUploadSection(!openUploadSection);
  };
    return (
        <div>
            <Box className="mt-6 p-4" sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px", border: "1px solid #ddd", boxShadow: 3 }}>
                <Typography variant="h6" sx={{ color: "#ff6f00", fontWeight: "bold", mb: 4 }}>
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
                {selectedOption === 'workOnChildIssue' ? (
                    <Box className="bg-white p-4 rounded-lg shadow-sm" sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
                        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            Child Review ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            Division
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            Obligor Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            CIF ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            SPOC
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid #ddd" }}>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedChildRows.map((row, index) => (
                                        <TableRow
                                            key={row.childReviewId}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                "&:hover": { backgroundColor: "#f1f1f1" },
                                            }}
                                        >
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.childReviewId}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.division}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.obligorName}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.cifId}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                                                <Button variant="text" color="primary" size="small" onClick={handleSPOCClick} sx={{ textTransform: "capitalize" }}>
                                                    {row.spoc}
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    sx={{ textTransform: "capitalize" }}
                                                    onClick={() => alert(`Submit for ID: ${row.childReviewId}`)}
                                                >
                                                    Submit
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
                            color="primary"
                            sx={{
                                mt: 2,
                                "& .Mui-selected": { backgroundColor: "#ff6f00", color: "#ffffff" },
                            }}
                        />
                    </Box>
                ) : (
                    <Box className="bg-white p-4 rounded-lg shadow-sm" sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
                        <Typography variant="h6" sx={{ color: "#ff6f00", fontWeight: "bold", mb: 4 }}>
                            Work in Issue
                        </Typography>
                        <div>
            <Button variant="contained" color="primary" onClick={handleCreateButtonClick}>
                Create Issue
            </Button>

            <Dialog open={openCreateIssueDialog} onClose={handleCloseCreateIssueDialog} maxWidth="md" fullWidth>
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
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Close">Close</MenuItem>
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
              {openUploadSection ? <ExpandLessIcon /> : <ExpandMoreIcon />} Upload Documents
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
                      {paginatedFiles.map((file, index) => (
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
          <Box sx={{ width: '800px', left: 0, top: '80px', ml: 2, mt: 4 }}>
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
    >
      Raise
    </Button>
  </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                       
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
                        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}>
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
                                    {paginatedIssueRows.map((row, index) => (
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
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.reviewId}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.issueId}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.caseStatus}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>{row.raiseIssueTemplate}</TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                                                <Button variant="contained" color="secondary" size="small">Delete</Button>
                                            </TableCell>
                                            <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                                                <Button variant="contained" color="primary" size="small">View/Upload</Button>
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
                                "& .Mui-selected": { backgroundColor: "#ff6f00", color: "#ffffff" },
                            }}
                        />
                    </Box>
                )}
                
            </Box>

            
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Division Details</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Divisions
                            </Typography>
                            <Stack spacing={2}>
                                {Object.keys(divisionDetails).map((division, index) => (
                                    <FormControlLabel
                                        key={division}
                                        control={
                                            <Radio
                                                checked={selectedDivision === division}
                                                onChange={() => handleDivisionChange(division)}
                                                sx={{
                                                    "&.Mui-checked": { color: "#ff6f00" },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "8px",
                                                    borderRadius: "8px",
                                                    backgroundColor: selectedDivision === division ? "#ffecd9" : "#ffffff",
                                                    border: selectedDivision === division ? "2px solid #ff6f00" : "1px solid #ddd",
                                                    transition: "all 0.3s",
                                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                                }}
                                            >
                                                {`${index + 1}. ${division}`}
                                            </Box>
                                        }
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Groups
                            </Typography>
                            {selectedDivision && (
                                <Stack spacing={2}>
                                    {Object.keys(divisionDetails[selectedDivision].groups).map((group, index) => (
                                        <FormControlLabel
                                            key={group}
                                            control={
                                                <Radio
                                                    checked={selectedGroup === group}
                                                    onChange={() => handleGroupChange(group)}
                                                    sx={{
                                                        "&.Mui-checked": { color: "#ff6f00" },
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        padding: "8px",
                                                        borderRadius: "8px",
                                                        backgroundColor: selectedGroup === group ? "#ffecd9" : "#ffffff",
                                                        border: selectedGroup === group ? "2px solid #ff6f00" : "1px solid #ddd",
                                                        transition: "all 0.3s",
                                                        "&:hover": { backgroundColor: "#f9f9f9" },
                                                    }}
                                                >
                                                    {`${index + 1}. ${group}`}
                                                </Box>
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                SPOCs
                            </Typography>
                            {selectedGroup && (
                                <Stack spacing={2}>
                                    {divisionDetails[selectedDivision].groups[selectedGroup].map((spoc, index) => (
                                        <FormControlLabel
                                            key={spoc}
                                            control={
                                                <Radio
                                                    checked={selectedSPOC === spoc}
                                                    onChange={() => handleSPOCChange(spoc)}
                                                    sx={{
                                                        "&.Mui-checked": { color: "#ff6f00" },
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        padding: "8px",
                                                        borderRadius: "8px",
                                                        backgroundColor: selectedSPOC === spoc ? "#ffecd9" : "#ffffff",
                                                        border: selectedSPOC === spoc ? "2px solid #ff6f00" : "1px solid #ddd",
                                                        transition: "all 0.3s",
                                                        "&:hover": { backgroundColor: "#f9f9f9" },
                                                    }}
                                                >
                                                    {`${index + 1}. ${spoc}`}
                                                </Box>
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            
        </div>
    );
}

export default CheckCard;
