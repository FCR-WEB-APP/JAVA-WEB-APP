
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material'; 
import SunLogo from "../assets/Sun Logo.jpg";
import SunLogo from "../assets/Sun Logo.jpg"

const Navbar = ({ userName }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar className="flex justify-between items-center px-6 py-2">
  
        <Box className="flex items-center">
          <img
            src={SunLogo}   
            alt="Sun Logo"
            className="w-32"   
          />
        </Box>
 
        <Box className="flex items-center justify-center flex-grow">
          <img
            src={SunLogo}   
            alt="SunLogo Logo"
            className="max-w-56"   
          />
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
