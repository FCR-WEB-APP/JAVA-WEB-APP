import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material'; 
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed
import { useNavigate } from 'react-router-dom'; // To redirect to the login page

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show a warning confirmation before logging out
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'You will be redirected to the login page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading state for 2 seconds before showing the logout message
        Swal.fire({
          title: 'Logging Out...',
          text: 'Please wait while we log you out.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        // After 2 seconds, show the logout success message and redirect
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been successfully logged out.',
            confirmButtonColor: '#3085d6',
            timer: 2000, // Auto close after 2 seconds
          }).then(() => {
            // Redirect to login page
            navigate('/login');
          });
        }, 2000); // 2-second loader delay
      }
    });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar className="flex justify-between items-center px-6 py-2">
        <Box className="flex items-center">
          {/* <img src={Sun} alt="Sun Logo" className="max-w-4" /> */}
        </Box>

        <Box className="flex items-center justify-center flex-grow">
          {/* <img src={Sun} alt="Sun Logo" className="max-w-4" /> */}
        </Box>

        <Box className="flex items-center space-x-4">
          <IconButton color="primary">
            <Notifications fontSize="small" /> 
          </IconButton>

          <Box className="flex items-center space-x-2">
            <IconButton color="primary">
              <AccountCircle fontSize="small" />   
            </IconButton>
            <Typography variant="body2" className="text-black text-sm">
              {userName}
            </Typography>
          </Box>

          {/* Logout Button with Styling */}
          <Button
            color="error"  // Make the button red for more visibility
            variant="contained"  // Make it a filled button
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#d32f2f',  // Darker red on hover
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',  // Enhance shadow on hover
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
