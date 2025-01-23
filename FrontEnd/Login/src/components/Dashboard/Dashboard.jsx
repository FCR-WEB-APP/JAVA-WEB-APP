import React, { useState } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl, 
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
function DashboardOfSrCR({ loggedInUser }) {

  const navigate = useNavigate();

  const handlePlayClickForSrCR = (task) => {
    console.log("Task clicked:", task); 
    navigate("/srcreditreviewer");
  };
  
  const handlePlayClickForAssignCR = (task) => {
    console.log("Task clicked:", task); 
    navigate("/  srcrassign");
  };

  const [groupTasks, setGroupTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch group tasks from the backend
  const fetchGroupTasks = async () => {
    try {
      const role = 'Sr. Credit Reviewer';
      const response = await axios.get(`/api/tasks/group-tasks?role=${role}`);
      const tasks = Array.isArray(response.data) 
        ? response.data.map((task) => ({
            id: task.caseRefNo || '',
            reviewId: task.caseRefNo || '',
            childReviewId: '',
            division: task.divisionName || '',
            groupName: task.groupName || '',
            status: task.status || '',
            assignedTo: task.assignedTo || '',
            role: task.role || '',
            createdDate: task.createdDate || '',
          }))
        : [];
      setGroupTasks(tasks);
    } catch (error) {
      console.error('Error fetching group tasks:', error);
    }
  };
  
  useEffect(() => {
    fetchGroupTasks();
  }, []);
 

  const [myTasks, setMyTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    reviewId: '',
    groupName: '',
    division: '',
  });

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleButtonClick = (taskType) => {
    setSelectedTask(taskType);
  };

  const handlePlayClick = (task) => {
    setMyTasks([task]);
    setSelectedTask('my');
  };

  const handleDialogOpen = () => {
    setIsModalOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsModalOpen(false);
  };
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = () => {
    console.log('Form Values:', formValues);
    handleDialogClose();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false)
  const [newCase, setNewCase] = useState({
    reviewId: "",
    groupName: "",
    division: "",
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
  console.log(name);
  const handleCreateCase = async () => {
    if (newCase.reviewId && newCase.groupName && newCase.division) {
      // Prepare payload excluding createdDate and updatedDate
      const casePayload = {
        caseRefNo: newCase.reviewId,  
        groupName: newCase.groupName,
        divisionName: newCase.division,
        activityLevel: null,
        status: "Pending", 
        assignedTo: "Unassigned", 
        planing: null,
        fieldWork: null,
        actions: null,
      };
  
      try {
        const response = await axios.post(
          'http://localhost:1000/api/addcasedetails',
          casePayload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${staticJWTToken}`,  
              'username': name
            },
          }
        );
  
        if (response.status === 200) {
          alert('Case created successfully!');
          setGroupTasks((prev) => [...prev, response.data.data]); 
          setNewCase({ reviewId: '', groupName: '', division: '' });
        } else {
          alert('Failed to create case. Please try again.');
        }
      } catch (error) {
        console.error('Error creating case:', error);
        alert('An error occurred while creating the case.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };
  

  

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
          <h1 className="text-2xl font-semibold">Cases</h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"
            >
              <RefreshIcon className="text-black" />
            </button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#f27013', color: 'white' }}
              onClick={handleModalOpen}
            >
              Create Case
            </Button>

          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <Button
            variant="contained"
            onClick={() => setSelectedTask('group')}
            sx={{
              fontSize: '1rem',
              backgroundColor: selectedTask === 'group' ? '#f27013' : 'gray',
              color: 'white',
            }}
          >
            Group Task
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedTask('my')}
            sx={{
              fontSize: '1rem',
              backgroundColor: selectedTask === 'my' ? '#f27013' : 'gray',
              color: 'white',
            }}
          >
            My Task
          </Button>
        </div>
        <div className="mt-6">
          {selectedTask === 'group' && (
            <TableContainer component={Paper}>
              <Table>
              <TableHead>
                  <TableRow>
                  <TableCell>Review ID</TableCell>
                    <TableCell>ChildReview ID</TableCell>
                    <TableCell>Issue ID</TableCell>
                    <TableCell>Track Issue ID</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Division</TableCell>
                    <TableCell>Current Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Created Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {groupTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <PlayArrowIcon
                          className="text-green-500 cursor-pointer"
                          onClick={() => handlePlayClick(task)}
                        />
                      </TableCell>
                      <TableCell>{task.reviewId}</TableCell>
                      <TableCell>{task.childReviewId}</TableCell>
                      <TableCell>{task.issueId}</TableCell>
                      <TableCell>{task.trackIssueId}</TableCell>
                      <TableCell>{task.groupName}</TableCell>
                      <TableCell>{task.division}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.role}</TableCell>
                      <TableCell>{task.createdDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          )}
          {selectedTask === 'my' && (
            <TableContainer component={Paper}>
              <Table>
              <TableHead>
                  <TableRow>
                  <TableCell>Start Case</TableCell>
                    <TableCell>Review ID</TableCell>
                    <TableCell>ChildReview ID</TableCell>
                    <TableCell>Issue ID</TableCell>
                    <TableCell>Track Issue ID</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Division</TableCell>
                    <TableCell>Current Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Created Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myTasks.map((task) => (
                    <TableRow key={task.id}>
                       <TableCell>
                        <PlayArrowIcon
                          className="text-green-500 cursor-pointer"
                          onClick={() => handlePlayClickForSrCR(task)}
                          onDoubleClick={() => handlePlayClickForAssignCR(task)}
                        />
                      </TableCell>
                      <TableCell>{task.reviewId}</TableCell>
                      <TableCell>{task.childReviewId}</TableCell>
                      <TableCell>{task.issueId}</TableCell>
                      <TableCell>{task.trackIssueId}</TableCell>
                      <TableCell>{task.groupName}</TableCell>
                      <TableCell>{task.division}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.role}</TableCell>
                      <TableCell>{task.createdDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          )}
          {!selectedTask && <p>Select a task to view content.</p>}
        </div>
      </div>

      {/* Modal for Create Case */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Create Case</h2>
          <TextField
            label="Review ID"
            variant="outlined"
            size="small"
            name="reviewId"
            value={newCase.reviewId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Group Name</InputLabel>
            <Select
              name="groupName"
              value={newCase.groupName}
              onChange={handleInputChange}
            >
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="AMBIQ">AMBIQ</MenuItem>
              <MenuItem value="ASSETS">ASSETS</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Division</InputLabel>
            <Select
              name="division"
              value={newCase.division}
              onChange={handleInputChange}
            >
              <MenuItem value="FIXED">FIXED</MenuItem>
              <MenuItem value="T&M">T&M</MenuItem>
              <MenuItem value="IIB">IIB</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCase}
            fullWidth
            sx={{ mt: 2,  backgroundColor: '#f27013', color: 'white'}}                

          >
            Create Case
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DashboardOfSrCR;
