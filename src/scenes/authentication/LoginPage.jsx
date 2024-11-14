import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';  // Import useLocation
import { Container, Grid, Box, TextField, Button, Typography, IconButton, InputAdornment, useTheme, Alert } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ColorModeContext, tokens } from '../../theme';
import { signIn, signOut } from 'aws-amplify/auth';

function LoginPage(props) {
  const navigate = useNavigate();
  const location = useLocation();  // Get the location object
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Pre-populate username if passed in state
  const [username, setUsername] = useState(location.state?.username || '');  // Retrieve username from state or set empty
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Clear previous error messages
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Sign out any existing user before attempting a new sign-in
      try {
        await signOut();
      } catch (error) {
        // No user was signed in or an error occurred during sign out
      }

      const { isSignedIn, nextStep } = await signIn({
        username,
        password,
      });

      if (isSignedIn) {
        props.updateAuthStatus(true);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      setGeneralError(err.message || 'An error occurred during login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box position="relative" height="100vh">
        <Box position="absolute" top={8} right={16} display="flex" zIndex={1000}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <Box my={5} mt={15}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} display="flex" justifyContent="center">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/assets/Logomark_Green_Variation.png"
                  alt="Logo"
                  style={{ width: '10%', height: 'auto', marginRight: '20px' }} // Add marginRight for space
                />
                <img
                  src="/assets/Logotype_Primary.png"
                  alt="Logo"
                  style={{ width: '50%', height: 'auto' }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                Login
              </Typography>
            </Grid>
          </Grid>
          {generalError && (
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <Alert severity="error">{generalError}</Alert>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                error={!!usernameError}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" onClick={handleLogin}>
                Login
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="secondary" component={Link} to="/register">
                Register
              </Button>
              &nbsp;&nbsp;
              <Button 
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }} 
                component={Link} 
                to="/"
              >
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Grid item xs={12}>
              <Typography 
                component={Link} 
                to="/reset-password"
                sx={{
                  color: colors.blueAccent[700],
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  display: 'inline-block',
                  cursor: 'pointer'
                }}
              >
                Forgot Password
              </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
