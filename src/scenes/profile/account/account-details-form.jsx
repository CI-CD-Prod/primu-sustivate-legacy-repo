import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, InputLabel, OutlinedInput, Grid, Container, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';
import { fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';

export function AccountDetailsForm({ onUpdateSuccess }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState(''); // Add jobTitle state

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [organisationError, setOrganisationError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orgId, setOrgId] = useState(null);

  const [stage, setStage] = useState('UPDATE_PROFILE');

  useEffect(() => {
    async function loadUserAttributes() {
      try {
        const attributes = await fetchUserAttributes();
        console.log('Fetched Cognito attributes:', attributes); // Log Cognito user attributes

        setName(attributes.name || '');
        setSurname(attributes.family_name || '');
        setOrganisation(attributes['custom:Organisation'] || '');
        setEmail(attributes.email || '');
        setPhoneNumber(attributes.phone_number || '');
        setLocation(attributes['custom:Location'] || '');

        // Fetch OrgId and JobTitle from RDS with Bearer token
        const orgResponse = await fetch(`https://loadbalancer-dev.sustivate.com/api/sustivate/user/${encodeURIComponent(attributes.email)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('Access_Token')}`, // Include the JWT token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!orgResponse.ok) {
          throw new Error('Failed to fetch organization details');
        }

        // Ensure response is not empty before parsing as JSON
        const responseText = await orgResponse.text();
        if (!responseText) {
          throw new Error('Empty response from the server');
        }

        const orgData = JSON.parse(responseText);
        console.log('Fetched org data:', orgData); // Log the organization data

        // Set OrgId and JobTitle
        setOrgId(orgData.organization.orgId);
        setJobTitle(orgData.jobTitle || ''); // Set the jobTitle from the response

      } catch (error) {
        console.error('Error fetching user details:', error);
        setGeneralError('Unable to load your profile details.');
      }
    }

    loadUserAttributes();
  }, []);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleUpdateDetails = async (event) => {
    event.preventDefault();

    setNameError('');
    setSurnameError('');
    setOrganisationError('');
    setPhoneNumberError('');
    setLocationError('');
    setGeneralError('');
    setSuccessMessage('');

    let isValid = true;

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Invalid phone number. Format: +1234567890');
      isValid = false;
    }

    if (!isValid) return;

    const updatedAttributes = {};

    if (name) updatedAttributes.name = name;
    if (surname) updatedAttributes.family_name = surname;
    if (organisation) updatedAttributes['custom:Organisation'] = organisation;
    if (phoneNumber) updatedAttributes.phone_number = phoneNumber;
    if (location) updatedAttributes['custom:Location'] = location;

    if (Object.keys(updatedAttributes).length === 0) {
      setGeneralError('No changes to update');
      return;
    }

    try {
      // Update Cognito attributes
      await updateUserAttributes({
        userAttributes: updatedAttributes,
      });

      // Update attributes in Postgres
      const userPayload = {
        firstName: name,
        lastName: surname,
        email,
        phoneNum: phoneNumber,
        jobTitle: jobTitle, // Include jobTitle in the payload
        organization: {
          orgId: orgId,
          organizationName: organisation,
          location: location,
        },
      };

      console.log('User payload to update in RDS:', userPayload); // Log the user payload

      const response = await fetch(`https://loadbalancer-dev.sustivate.com/api/sustivate/users/update/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('Access_Token')}`, // Include the JWT token in the Authorization header using Bearer scheme.
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user: ${errorData.message || response.status}`);
      }

      setSuccessMessage('Details updated successfully.');
      setStage('SUCCESS_MESSAGE');

      // Trigger the refresh in the parent component
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating details:', error);
      setGeneralError('An error occurred while updating details');
    }
  };

  const renderUpdateProfileButton = () => (
    <Card
      sx={{
        backgroundColor: colors.primary[400],
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        padding: 2,
        textAlign: 'center',
      }}
    >
      <CardHeader title="Update Profile" />
      <CardContent>
        <Typography variant="body1">
          Click the button below to update your profile information.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setStage('INPUT_FORM')}
        >
          Update Profile
        </Button>
      </CardActions>
    </Card>
  );

  const renderInputForm = () => (
    <form onSubmit={handleUpdateDetails}>
      <Card
        sx={{
          backgroundColor: colors.primary[400],
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
        }}
      >
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {generalError && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="error">{generalError}</Alert>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                />
                {nameError && <Typography color="error" variant="body2">{nameError}</Typography>}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Surname</InputLabel>
                <OutlinedInput
                  label="Surname"
                  name="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  error={!!surnameError}
                />
                {surnameError && <Typography color="error" variant="body2">{surnameError}</Typography>}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Organisation</InputLabel>
                <OutlinedInput
                  label="Organisation"
                  name="organisation"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  error={!!organisationError}
                />
                {organisationError && <Typography color="error" variant="body2">{organisationError}</Typography>}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                  value={email}
                  readOnly
                  disabled
                  sx={{
                    color: 'text.disabled',
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput
                  label="Phone number"
                  name="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!phoneNumberError}
                />
                {phoneNumberError && <Typography color="error" variant="body2">{phoneNumberError}</Typography>}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <OutlinedInput
                  label="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={!!locationError}
                />
                {locationError && <Typography color="error" variant="body2">{locationError}</Typography>}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Job Title</InputLabel>
                <OutlinedInput
                  label="Job Title"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  error={!!locationError}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="secondary">Save details</Button>
          <Button
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
            }}
            onClick={() => setStage('UPDATE_PROFILE')}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </form>
  );

  const renderSuccessMessage = () => (
    <Card
      sx={{
        backgroundColor: colors.primary[400],
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        padding: 2,
        textAlign: 'center',
      }}
    >
      <CardHeader title="Success" />
      <CardContent>
        <Typography variant="body1">
          Information has been updated successfully!
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setStage('UPDATE_PROFILE')}
        >
          Update Again
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: colors.primary[10],
        padding: "2em",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[100]} !important`,
        },
      }}
    >
      {stage === 'UPDATE_PROFILE' && renderUpdateProfileButton()}
      {stage === 'INPUT_FORM' && renderInputForm()}
      {stage === 'SUCCESS_MESSAGE' && renderSuccessMessage()}
    </Container>
  );
}
