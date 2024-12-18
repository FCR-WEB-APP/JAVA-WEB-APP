import { TextField, Button, Container, Grid, Box } from '@mui/material';
import mashreqLogo from '../assets/Mashreq logo.jpg';
import microsoftLogo from '../assets/Microsoft_logo.jpg';
import loginRightSideLogo from '../assets/Login_rightside_logo-removebg-preview.png';
import Typography from '@mui/material/Typography';

function Login() {
  return (
    <Container maxWidth="lg" className="min-h-screen">
      {/* Grid for 40% Left and 60% Right with Gap */}
      <Grid container className="min-h-screen" spacing={2}>
        
        {/* Left Side (40%) */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          className="flex flex-col justify-center items-center bg-white shadow-lg p-6"
        >
          {/* Centered Logo and Login Form */}
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            width="100%" 
            style={{ maxWidth: '350px' }}
          >
            {/* Logo */}
            <Box 
              className="mb-4" 
              style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <img 
                src={mashreqLogo} 
                alt="Mashreq Logo" 
                style={{ width: '100px', height: '100px' }}
              />
            </Box>


            <Typography 
              variant="h4" 
              align="center" 
              style={{ marginBottom: '20px', fontWeight: 'bold' }}
            >
              Login
            </Typography>

        
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
            />


            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
            />

        
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              style={{ marginTop: '16px', padding: '12px 0' }}
            >
              SIGN IN
            </Button>

            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              startIcon={
                <img 
                  src={microsoftLogo} 
                  alt="Microsoft Logo" 
                  style={{ width: '20px', height: '20px' }}
                />
              }
              style={{ marginTop: '12px', padding: '12px 60px' }}
            >
              Sign in with Microsoft
            </Button>
          </Box>
        </Grid>

        <Grid 
          item 
          xs={12} 
          md={8} 
          className="flex items-center justify-center bg-gray-200"
         
        >
          <img 
            src={loginRightSideLogo} 
            alt="Right Side Logo" 
            style={{ 
                 width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
