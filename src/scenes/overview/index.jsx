import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Button, CircularProgress, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { fetchUserAttributes } from 'aws-amplify/auth';

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userDetails, setUserDetails] = useState({ email: "", organizationName: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const attributes = await fetchUserAttributes();
        console.log("Fetched attributes:", attributes); // Log the entire attributes response

        const email = attributes.email;
        const organizationName = attributes['custom:Organisation'];
        setUserDetails({ email, organizationName });
        console.log("Fetched email:", email);
        console.log("Fetched organizationName:", organizationName);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (userDetails.email) {
        const endpoint = `https://loadbalancer-dev.sustivate.com/api/sustivate/results/${encodeURIComponent(userDetails.email)}`;

        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('Access_Token')}`, //Include the JWT token in the Authorization header using Bearer scheme.
              'Content-Type': 'application/json',
            },
            credentials: 'include' // Include credentials if needed
          });

          console.log(JSON.stringify(response));
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // Sort results by date from latest to oldest
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setResults(data);
        } catch (error) {
          console.error("Error fetching results:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [userDetails.email]);

  const displayedResults = showAll ? results : results.slice(0, 5);

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: colors.primary[10],
        "& .pro-sidebar-inner": {
          background: `${colors.primary[100]} !important`,
        },
        padding: "2em",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Assessment Overview
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : results.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No results found.
        </Typography>
      ) : (
        displayedResults.map((result) => (
          <Paper
            key={result.resultId}
            elevation={3}
            style={{ padding: "2em", marginTop: "2em" }}
            sx={{
              backgroundColor: colors.primary[400],
              "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Assessment Date: {new Date(result.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Environment Score: {result.environmentScore.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Social Score: {result.socialScore.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Governance Score: {result.governanceScore.toFixed(2)}
            </Typography>
          </Paper>
        ))
      )}
      {results.length > 5 && !showAll && !loading && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAll(true)}
          sx={{ marginTop: "2em" }}
        >
          Show More
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/assessments"
        sx={{ marginTop: "2em" }}
      >
        Back to Assessment
      </Button>
    </Container>
  );
};

export default Overview;
