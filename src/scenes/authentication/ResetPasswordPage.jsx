import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Grid, Box, TextField, Button, Typography, IconButton, InputAdornment, useTheme, Alert } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ColorModeContext, tokens } from '../../theme';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [username, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [step, setStep] = useState('REQUEST_RESET');
  
  const [usernameError, setUsernameError] = useState('');
  const [confirmationCodeError, setConfirmationCodeError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleResetPassword = async () => {
    // Clear previous error messages
    setUsernameError('');
    setGeneralError('');

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
      setGeneralError(error.message || 'An error occurred during password reset request');
    }
  };

  const handleResetPasswordNextSteps = (output) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        console.log(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
        setStep('CONFIRM_RESET');
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        navigate('/login');
        break;
    }
  };

  const handleConfirmResetPassword = async () => {
    // Clear previous error messages
    setConfirmationCodeError('');
    setNewPasswordError('');
    setGeneralError('');
    setPasswordsMatch(true);

    let isValid = true;

    if (!confirmationCode) {
      setConfirmationCodeError('Confirmation code is required');
      isValid = false;
    }
    if (!newPassword) {
      setNewPasswordError('New password is required');
      isValid = false;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      isValid = false;
    }

    if (!isValid) return;

    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
      console.log('Password reset confirmed.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      setGeneralError(error.message || 'An error occurred during password confirmation');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box position="relative" height="100vh">
        {/* ICONS */}
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
          {/* <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton> */}
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
                Reset Password
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
          <Grid container spacing={3}>
            {step === 'REQUEST_RESET' && (
              <>
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
                  <Button variant="contained" color="secondary" onClick={handleResetPassword}>
                    Request Password Reset &gt;&gt;
                  </Button>
                </Grid>
              </>
            )}
            {step === 'CONFIRM_RESET' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirmation Code"
                    variant="outlined"
                    value={confirmationCode}
                    onChange={(evt) => setConfirmationCode(evt.target.value)}
                    error={!!confirmationCodeError}
                    helperText={confirmationCodeError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    variant="outlined"
                    value={newPassword}
                    onChange={(evt) => setNewPassword(evt.target.value)}
                    error={!!newPasswordError}
                    helperText={newPasswordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    variant="outlined"
                    value={confirmNewPassword}
                    onChange={(evt) => setConfirmNewPassword(evt.target.value)}
                    error={!passwordsMatch}
                    helperText={!passwordsMatch ? "Passwords do not match" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                            edge="end"
                          >
                            {showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" onClick={handleConfirmResetPassword}>
                    Confirm Reset Password &gt;&gt;
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" component={Link} to="/login">
                Back to Login
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPasswordPage;
