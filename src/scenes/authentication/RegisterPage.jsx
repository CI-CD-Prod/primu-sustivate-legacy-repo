import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Grid, Box, TextField, Button, Typography, IconButton, InputAdornment, useTheme, Alert, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ColorModeContext, tokens } from '../../theme';
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import countryData from '../../data/countries.json';
import industryData from '../../data/industries.json';

const poolData = {
    UserPoolId: 'eu-west-1_DUYb9kZ4E',
    ClientId: '6b1doja0ajp0cev9a2c2j95tak',
};

const userPool = new CognitoUserPool(poolData);

function RegisterPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [step, setStep] = useState(1);
    const [name, setName] = useState('Lorenzo');
    const [surname, setSurname] = useState('Tahata');
    const [password, setPassword] = useState('Mbuthuma#12');
    const [email, setEmail] = useState('kenan.mbuthuma+dev46@prim-u.com');
    const [phoneNumber, setPhoneNumber] = useState('867548877');
    const [countryCode, setCountryCode] = useState('+27'); 
    const [jobTitle, setJobTitle] = useState('Developer');
    const [organisation, setOrganisation] = useState('Prim-U');
    const [location, setLocation] = useState('South Africa');
    const [industry, setIndustry] = useState('Information Technology');
    const [showPassword, setShowPassword] = useState(false);

    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [organisationError, setOrganisationError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [industryError, setIndustryError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const restrictedDomains = [
        "gmail.com", "yahoo.com", "outlook.com", "aol.com", "protonmail.com",
        "zoho.com", "yandex.com", "mail.com", "gmx.com", "icloud.com",
        "fastmail.com", "tutanota.com", "mail.ru", "hushmail.com", "airmail.net",
        "lycos.com", "netcourrier.com", "zimbra.com", "rediffmail.com", "mailinator.com"
    ];

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        const domain = email.split('@')[1];
        return !restrictedDomains.includes(domain.toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{5,14}$/;  
        return phoneRegex.test(phoneNumber);
    };

    const handleNext = () => {
        if (step === 1) {
            let isValid = true;

            setNameError('');
            setSurnameError('');
            setPasswordError('');
            setEmailError('');
            setPhoneNumberError('');
            setJobTitleError('');

            if (!name) {
                setNameError('Name is required');
                isValid = false;
            }
            if (!surname) {
                setSurnameError('Surname is required');
                isValid = false;
            }
            if (!password || password.length < 8) {
                setPasswordError('Password must be at least 8 characters long');
                isValid = false;
            }
            if (!email || !validateEmail(email)) {
                setEmailError('Invalid email domain, Please do not use personal email');
                isValid = false;
            }
            if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
                setPhoneNumberError('Invalid phone number');
                isValid = false;
            }
            if (!jobTitle) {
                setJobTitleError('Job Title is required');
                isValid = false;
            }

            if (isValid) {
                setStep(2);
            }
        }
    };

    const resendConfirmationCode = (username) => {
        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                console.error("Error resending confirmation code:", err);
                return;
            }
            console.log("Confirmation code resent:", result);
        });
    };

    const checkUserStatus = (username, password) => {
        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: () => {
                    resolve('CONFIRMED');
                },
                onFailure: (err) => {
                    if (err.code === 'UserNotConfirmedException') {
                        resolve('UNCONFIRMED');
                    } else if (err.code === 'NotAuthorizedException' || err.code === 'UserNotFoundException') {
                        resolve('NOT_FOUND');
                    } else {
                        reject(err);
                    }
                }
            });
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setOrganisationError('');
        setLocationError('');
        setIndustryError('');
        setGeneralError('');

        let isValid = true;

        if (!organisation) {
            setOrganisationError('Organisation is required');
            isValid = false;
        }
        if (!location) {
            setLocationError('Location is required');
            isValid = false;
        }
        if (!industry) {
            setIndustryError('Industry is required');
            isValid = false;
        }

        if (!isValid) return;

        const username = email;
        const formattedPhoneNumber = `${countryCode}${phoneNumber}`;  

        try {
            const userStatus = await checkUserStatus(username, password);

            if (userStatus === 'CONFIRMED') {
                navigate('/login');
            } else if (userStatus === 'UNCONFIRMED') {
                resendConfirmationCode(username);
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/validate', { state: { username, name, surname, email, phoneNumber, jobTitle, organisation, location, industry } });
                }, 7000);
            } else {
                const attributeList = [
                    new CognitoUserAttribute({ Name: "email", Value: email }),
                    new CognitoUserAttribute({ Name: "phone_number", Value: formattedPhoneNumber }),
                    new CognitoUserAttribute({ Name: "custom:Organisation", Value: organisation }),
                    new CognitoUserAttribute({ Name: "custom:Location", Value: location }),
                    new CognitoUserAttribute({ Name: "custom:Industry", Value: industry }),
                    new CognitoUserAttribute({ Name: "custom:JobTitle", Value: jobTitle }),
                    new CognitoUserAttribute({ Name: "name", Value: name }),
                    new CognitoUserAttribute({ Name: "family_name", Value: surname })
                ];

                userPool.signUp(username, password, attributeList, null, (err, result) => {
                    if (err) {
                        console.error("Error during sign up:", err);
                        setGeneralError(err.message || 'An error occurred during registration');
                        return;
                    }

                    setOpenSnackbar(true);
                    setTimeout(() => {
                        navigate('/validate', { state: { username, name, surname, email, phoneNumber, jobTitle, organisation, location, industry } });
                    }, 7000);
                });
            }
        } catch (error) {
            console.error("Error checking user status:", error);
            setGeneralError("An error occurred while checking user status.");
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                                Register
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
                    {step === 1 && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    placeholder="name"
                                    value={name}
                                    onChange={evt => setName(evt.target.value)}
                                    error={!!nameError}
                                    helperText={nameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Surname"
                                    variant="outlined"
                                    placeholder="surname"
                                    value={surname}
                                    onChange={evt => setSurname(evt.target.value)}
                                    error={!!surnameError}
                                    helperText={surnameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    placeholder="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={evt => setEmail(evt.target.value)}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    placeholder="password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    value={password}
                                    onChange={evt => setPassword(evt.target.value)}
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
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel shrink={!!countryCode}>Country Code</InputLabel>
                                        <Select
                                            value={countryCode}
                                            onChange={(evt) => setCountryCode(evt.target.value)}
                                            label="Country Code"
                                            renderValue={(selected) => selected}
                                        >
                                            {countryData.map((country) => (
                                                <MenuItem key={country.country_id} value={country.phone_code}>
                                                    {`${country.country_name} (${country.phone_code})`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        variant="outlined"
                                        placeholder="1234567890"
                                        value={phoneNumber}
                                        onChange={evt => setPhoneNumber(evt.target.value)}
                                        error={!!phoneNumberError}
                                        helperText={phoneNumberError}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Job Title"
                                    variant="outlined"
                                    placeholder="job title"
                                    value={jobTitle}
                                    onChange={evt => setJobTitle(evt.target.value)}
                                    error={!!jobTitleError}
                                    helperText={jobTitleError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleNext}
                                >
                                    Next &gt;&gt;
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
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
                    )}
                    {step === 2 && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Organisation"
                                    variant="outlined"
                                    value={organisation}
                                    onChange={evt => setOrganisation(evt.target.value)}
                                    error={!!organisationError}
                                    helperText={organisationError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" error={!!locationError}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                        label="Location"
                                        value={location}
                                        onChange={evt => setLocation(evt.target.value)}
                                    >
                                        {countryData.map((country) => (
                                            <MenuItem key={country.country_id} value={country.country_name}>
                                                {country.country_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {locationError && <Typography color="error" variant="body2">{locationError}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" error={!!industryError}>
                                    <InputLabel>Industry</InputLabel>
                                    <Select
                                        label="Industry"
                                        value={industry}
                                        onChange={evt => setIndustry(evt.target.value)}
                                    >
                                        {industryData.map((industry) => (
                                            <MenuItem key={industry.industry_id} value={industry.industry_name}>
                                                {industry.industry_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {industryError && <Typography color="error" variant="body2">{industryError}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleRegister}
                                >
                                    Register &gt;&gt;
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                    sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                    }}
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={7000}
                onClose={handleCloseSnackbar}
                message={`A confirmation email has been sent to ${email}`}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                    },
                }}
            />
        </Container>
    );
}

export default RegisterPage;
