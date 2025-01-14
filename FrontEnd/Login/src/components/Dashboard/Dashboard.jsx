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

  const [selectedTask, setSelectedTask] = useState(null);
  const [groupTasks, setGroupTasks] = useState([
    { id: 1, reviewId: '12345', childReviewId: '67890', division: 'Mashreq', groupName: 'Fixed', status: 'Active', assignedTo: 'Santosh', role: 'Sr. Credit Reviewer', createdBy: 'Sr. Credit Reviewer' },
    { id: 2, reviewId: '54321', childReviewId: '98765', division: 'Finance', groupName: 'T&M', status: 'Pending', assignedTo: 'Tejas', role: 'Credit Reviewer', createdBy: 'Sr. Credit Reviewer' },
    { id: 3, reviewId: '13579', childReviewId: '24680', division: 'Assets', groupName: 'T&M', status: 'In Progress', assignedTo: 'Mayur', role: 'SPOC', createdBy: 'Sr. Credit Reviewer' },
    { id: 4, reviewId: '24680', childReviewId: '13579', division: 'Mashreq', groupName: 'Fixed', status: 'Completed', assignedTo: 'Lokesh', role: 'Head Of FCR', createdBy: 'Sr. Credit Reviewer' },
    { id: 5, reviewId: '11223', childReviewId: '44556', division: 'AMBEQ', groupName: 'Eidiko', status: 'Active', assignedTo: 'Pilli', role: 'Credit Reviewer', createdBy: 'Sr. Credit Reviewer' },
  ]);
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

  const handleCreateCase = () => {
    if (newCase.reviewId && newCase.groupName && newCase.division) {
      const newTask = {
        id: groupTasks.length + 1,
        reviewId: newCase.reviewId,
        childReviewId: "N/A",
        division: newCase.division,
        groupName: newCase.groupName,
        status: "New",
        assignedTo: "N/A",
        role: "N/A",
        createdBy: "User",
      };
      setGroupTasks((prev) => [...prev, newTask]);
      setNewCase({ reviewId: "", groupName: "", division: "" });
      handleModalClose();
    } else {
      alert("Please fill in all fields.");
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
                    <TableCell>Start Case</TableCell>
                    <TableCell>Review ID</TableCell>
                    <TableCell>ChildReview ID</TableCell>
                    <TableCell>Division</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Current Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Created By</TableCell>
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
                      <TableCell>{task.division}</TableCell>
                      <TableCell>{task.groupName}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.role}</TableCell>
                      <TableCell>{task.createdBy}</TableCell>
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
                    <TableCell>Division</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Current Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Created By</TableCell>
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
                      <TableCell>{task.division}</TableCell>
                      <TableCell>{task.groupName}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.role}</TableCell>
                      <TableCell>{task.createdBy}</TableCell>
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
              <MenuItem value="Mashreq">Bank</MenuItem>
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
              <MenuItem value="T&M">API-C</MenuItem>
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
