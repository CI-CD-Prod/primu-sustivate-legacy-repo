import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Stack, Typography, Container, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme'; 
import { fetchUserAttributes } from 'aws-amplify/auth';

const AccountInfo = ({ refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const attributes = await fetchUserAttributes();
        console.log("Fetched attributes", attributes);

        const userDetails = {
          name: attributes.name,
          surname: attributes.family_name,
          email: attributes.email,
          phoneNumber: attributes.phone_number,
          organisation: attributes['custom:Organisation'],
          location: attributes['custom:Location'],
          avatar: '/assets/avatar.png',
        };
        setUser(userDetails);
      } catch (err) {
        console.log('Error fetching user details:', err);
        setError('Error fetching user details.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [refresh]); // Re-fetch data when the refresh prop changes

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: colors.primary[10],
        padding: "2em",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[100]} !important`,
        },
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            backgroundColor: colors.primary[400],
            "& .pro-sidebar-inner": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <CardContent>
            {error && (
              <Alert severity="error">{error}</Alert>
            )}
            {!error && user && (
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <Stack spacing={1} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{user.name} {user.surname}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Typography variant="body2">{user.phoneNumber}</Typography>
                  <Typography variant="body2">{user.organisation}</Typography>
                  <Typography variant="body2">{user.location}</Typography>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default AccountInfo;
