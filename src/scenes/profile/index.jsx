import React, { useState } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { AccountDetailsForm } from './account/account-details-form';
import AccountInfo from './account/account-info';

export default function Profile() {
  // State to trigger a refresh
  const [refresh, setRefresh] = useState(false);

  // Function to handle refresh after updating details
  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  return (
    <Box m="20px">
      <Header title="Profile" subtitle="Welcome to your profile, customize and update your details."/>
      <Stack spacing={3}>
        <div></div>
        <Grid container spacing={3}>
          <Grid item lg={3} md={6} xs={15}>
            <AccountInfo refresh={refresh} /> {/* Pass refresh state */}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountDetailsForm onUpdateSuccess={handleRefresh} /> {/* Pass the refresh handler */}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
