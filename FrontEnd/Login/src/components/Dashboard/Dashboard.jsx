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
  Box,
  TablePagination
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Swal from 'sweetalert2';  // Make sure you have SweetAlert2 imported
import { useDispatch } from 'react-redux';
import { setCaseData } from '../features/caseSlice';
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

  const [myTasks, setMyTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    caseRefNo: '',
    groupName: '',
    divisionName: '',
  });

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleButtonClick = (taskType) => {
    setSelectedTask(taskType);
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
    caseRefNo: "",
    groupName: "",
    divisionName: "",
    // caseRefNo: newCase.reviewId,  
    // groupName: newCase.groupName,
    // divisionName: newCase.division,
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
    const fetchGroupTasks = async () => {
    try {
       const rolesParam = roles;  
       const response = await axios.get('http://localhost:1001/api/GroupTask', {
        params: {
          role: rolesParam, 
        },
        headers: {
          'Authorization': `Bearer ${staticJWTToken}`,  
          'username': name,   
        },
        
      });
  
       const tasks = Array.isArray(response.data.result)
        ? response.data.result.map((task) => ({
            id: task.caseRefNo || '',
            caseRefNo: task.caseRefNo || '',
            childReviewId: task.childReviewId || '',
            divisionName: task.divisionName || '',
            groupName: task.groupName || '',
            status: task.status || '',
            assignedTo: task.assignedTo || '',
            role: task.role || '',
            createdDate: task.createdDate || '',
          }))
        : [];
       setGroupTasks(tasks);
       console.log("Task of Group task :", tasks);
    } catch (error) {
      console.error('Error fetching group tasks:', error);
     }
  };
  
   useEffect(() => {
     fetchGroupTasks();
   }, []);
   const dispatch = useDispatch();
   

   const [createdDates, setCreatedDates] = useState({}); // Store created dates for each case


   const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

// Handle page change
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

// Handle rows per page change
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
  const handleCreateCase = async () => {

    if (newCase.reviewId && newCase.groupName && newCase.division) {
      Swal.fire({
        title: 'Creating Case...',
        html: 'Please wait while we process your case.',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      const casePayload = {
        caseRefNo: newCase.reviewId,  
        groupName: newCase.groupName,
        divisionName: newCase.division,
        activityLevel: roleDisplay,
        status: "inProgress", 
        assignedTo: "", 
        planing: "inProgress",
        fieldWork: "inProgress",
        actions: "Case Created",
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
  
        // console.log("Sending Case Payload:", casePayload);
        // console.log("Received Response:", response.data);

        if (response.status === 200) {
          // Close the modal
          handleModalClose();
          const caseData = response.data.data;
          console.log("checking case data: ", caseData)
          dispatch(setCaseData(caseData)); // Store in Redux
          const currentDate = new Date().toLocaleString();
          setCreatedDates(prev => ({
            ...prev,
            [response.data.data.id]: currentDate // Assume `response.data.data.id` is the case ID
          }));
  

           // Close the Swal loader and show success after 3 seconds
          setTimeout(() => {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Case Created Successfully',
              text: 'The case has been created and added.',
              confirmButtonColor: '#3085d6',
              timer: 2000,
            });
          }, 3000);  // Wait for 3 seconds before showing success
  
          setGroupTasks((prev) => [...prev, response.data.data]);
          //dispatch(setCaseData(response.data.data));

          // Clear form
          setNewCase({ reviewId: '', groupName: '', division: '' });
 
        } else {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Failed to Create Case',
            text: 'There was an issue creating the case. Please try again.',
            confirmButtonColor: '#d33',
          });
        }
      } catch (error) {
        Swal.close();
        console.error('Error creating case:', error);
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred',
          text: 'An error occurred while creating the case. Please try again.',
          confirmButtonColor: '#d33',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#f27013',
      });
    }
  };
  







  // const handlePlayClick = (task) => {
  //   setMyTasks([task]);
  //   setSelectedTask('my');
  // };

  const handlePlayClick = async (task) => {
    if(!task){
      return null;
    }
    const payload = {
      caseRefNo: task.caseRefNo, 
      actions: "Submit to Sr.CreditReviewer", 
      status: task.status, 
      assignedTo: name,  
      activityLevel:"Sr.CreditReviewer",
      updatedDate: new Date().toISOString(), 
      planing: task.planing,  
      fieldWork: task.fieldWork, 
    };


    try {
      const response = await axios.put(
        'http://localhost:1000/api/SubmitTaskLeader', 
        payload,
        {
          headers: {
            'Authorization': `Bearer ${staticJWTToken}`,
            'username': name,
          },
        }
      );
  
      if (response.status === 200) {
        setGroupTasks((prevTasks) => prevTasks.filter(t => t.caseRefNo !== task.caseRefNo)); 
        setMyTasks((prevTasks) => [...prevTasks, { ...task, assignedTo: "Sr.CreditReviewer" }]);  
        setMyTasks([task]);
        setSelectedTask('my');
        console.log("task :" , task);
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
        {selectedTask === "group" && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Case</TableCell>
              <TableCell>Case Ref No.</TableCell>
              <TableCell>ChildReview ID</TableCell>
              <TableCell>Issue ID</TableCell>
              <TableCell>Track Issue ID</TableCell>
              <TableCell>Group Name</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Activity Level</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <PlayArrowIcon
                      className="text-green-500 cursor-pointer"
                      onClick={() => handlePlayClick(task)}
                    />
                  </TableCell>
                  <TableCell>{task.caseRefNo}</TableCell>
                  <TableCell>{task.childReviewId}</TableCell>
                  <TableCell>{task.issueId}</TableCell>
                  <TableCell>{task.trackIssueId}</TableCell>
                  <TableCell>{task.groupName}</TableCell>
                  <TableCell>{task.divisionName}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{roleDisplay}</TableCell>
                  <TableCell>{createdDates[task.reviewId]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={groupTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    )}

    {selectedTask === "my" && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Case</TableCell>
              <TableCell>Case Ref No.</TableCell>
              <TableCell>ChildReview ID</TableCell>
              <TableCell>Issue ID</TableCell>
              <TableCell>Track Issue ID</TableCell>
              <TableCell>Group Name</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Activity Level</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <PlayArrowIcon
                      className="text-green-500 cursor-pointer"
                      onClick={() => handlePlayClickForSrCR(task)}
                      onDoubleClick={() => handlePlayClickForAssignCR(task)}
                    />
                  </TableCell>
                  <TableCell>{task.caseRefNo}</TableCell>
                  <TableCell>{task.childReviewId}</TableCell>
                  <TableCell>{task.issueId}</TableCell>
                  <TableCell>{task.trackIssueId}</TableCell>
                  <TableCell>{task.groupName}</TableCell>
                  <TableCell>{task.divisionName}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{roleDisplay}</TableCell>
                  <TableCell>{createdDates[task.id]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={myTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
