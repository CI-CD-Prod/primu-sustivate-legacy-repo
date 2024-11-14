import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Grid, Box, TextField, Button, Typography, IconButton, InputAdornment, useTheme, Alert } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ColorModeContext, tokens } from '../../theme';
import { confirmSignUp } from 'aws-amplify/auth';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

function ValidatePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  const [username, setUserName] = useState(location.state?.username || '');
  const [authenticationCode, setAuthenticationCode] = useState('');
  const [showAuthenticationCode, setShowAuthenticationCode] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [authenticationCodeError, setAuthenticationCodeError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [message, setMessage] = useState('');

  const { name, surname, email, phoneNumber, jobTitle, organisation, location: orgLocation, industry } = location.state || {};

  const userPool = new CognitoUserPool({
    UserPoolId: 'eu-west-1_DUYb9kZ4E',
    ClientId: '6b1doja0ajp0cev9a2c2j95tak',
  });

  const handleRegisterConfirmation = async () => {
    setUsernameError('');
    setAuthenticationCodeError('');
    setGeneralError('');

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (!authenticationCode) {
      setAuthenticationCodeError('Authentication code is required');
      isValid = false;
    }

    if (!isValid) return;

    try {
      await confirmSignUp({
        username,
        confirmationCode: authenticationCode
      });

      const organizationPayload = {
        organizationName: organisation,
        location: orgLocation,
        industry,
      };

      const orgResponse = await fetch('https://loadbalancer-dev.sustivate.com/api/sustivate/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizationPayload),
        mode: 'cors',
        credentials: 'same-origin',
      });

      if (!orgResponse.ok) {
        // Instead of displaying the error on the form, log it to the console
        console.error(`Failed to add organization: ${orgResponse.status}`);
        return; // Exit function to prevent further execution
      }

      const userPayload = {
        firstName: name,
        lastName: surname,
        email,
        phoneNum: phoneNumber,
        jobTitle,
      };

      const userResponse = await fetch(`https://loadbalancer-dev.sustivate.com/api/sustivate/users?organizationName=${encodeURIComponent(organisation)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
        mode: 'cors',
        credentials: 'same-origin',
      });

      if (!userResponse.ok) {
        // Log the error without displaying it to the user
        console.error(`Failed to add user: ${userResponse.status}`);
        return; // Exit function to prevent further execution
      }

      setMessage('User Successfully Confirmed!');

      setTimeout(() => {
        navigate('/login', { state: { username } });
      }, 3000);
    } catch (err) {
      setGeneralError(err.message || 'An error occurred during confirmation');
    }
  };

  const handleResendCode = () => {
    if (!username) {
      setUsernameError('Username is required to resend code');
      return;
    }

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setGeneralError(err.message || 'Error resending code');
      } else {
        setMessage('Verification code resent successfully.');
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Box position="relative" height="100vh">
        <Box
          position="absolute"
          top={8}
          right={16}
          display="flex"
          zIndex={1000}
        >
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
                  style={{ width: '10%', height: 'auto', marginRight: '20px' }}
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
                Validate
              </Typography>
            </Grid>
          </Grid>
          {generalError && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="error">{generalError}</Alert>
              </Grid>
            </Grid>
          )}
          {message && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="success">{message}</Alert>
              </Grid>
            </Grid>
          )}
          <Box my={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  variant="outlined"
                  value={username}
                  onChange={evt => setUserName(evt.target.value)}
                  error={!!usernameError}
                  helperText={usernameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Authentication Code"
                  type={showAuthenticationCode ? "text" : "password"}
                  variant="outlined"
                  value={authenticationCode}
                  onChange={evt => setAuthenticationCode(evt.target.value)}
                  error={!!authenticationCodeError}
                  helperText={authenticationCodeError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowAuthenticationCode(!showAuthenticationCode)}
                          edge="end"
                        >
                          {showAuthenticationCode ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRegisterConfirmation}
                >
                  Validate &gt;&gt;
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  color="secondary2"
                  onClick={handleResendCode}
                >
                  Resend Code
                </Button>
                &nbsp;&nbsp;
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[800],
                    color: colors.grey[100],
                  }}
                  component={Link}
                  to="/"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ValidatePage;
