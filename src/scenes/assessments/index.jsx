import React, { useState, useEffect } from "react";
import {
  Box, Button, Container, Typography, Paper, List, ListItem, ListItemText, Grid,
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemIcon, Card, CardContent
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { fetchUserAttributes } from 'aws-amplify/auth'; // Import user attributes fetching API

import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import questionsEnv from "./assessmentQues/questionsEnv";
import { getLeafIcon, RedLeafIcon, GreenLeafIcon, YellowLeafIcon } from "../../Icons/Icons";

const industryOptions = ["Ingredients", "Packaging", "Transportation", "Production", "Production waste", "Distribution"];

function App() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showStartPage, setShowStartPage] = useState(true);
  const [showIndustrySelector, setShowIndustrySelector] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [canProceed, setCanProceed] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", organizationName: "" });

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

  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setSelectedIndustries(
      value.includes("all") 
        ? industryOptions 
        : value
    );
  };

  const filteredQuestions = questionsEnv.filter(
    (q) =>
      q.Category !== "Environmental" ||
      selectedIndustries.includes(q.Industry)
  );

  const optionClicked = (score, optionId) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = { question: currentQuestion, score };

    const newSelectedOptions = { ...selectedOptions, [currentQuestion]: optionId };

    const newTotalScore = newResponses.reduce((acc, cur) => acc + cur.score, 0);

    setTotalScore(newTotalScore);
    setResponses(newResponses);
    setSelectedOptions(newSelectedOptions);
    setCanProceed(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < filteredQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setCanProceed(selectedOptions[currentQuestion + 1] !== undefined);
    } else {
      setShowResults(true);
      storeResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCanProceed(selectedOptions[currentQuestion - 1] !== undefined);
    }
  };

  const restartQuiz = () => {
    setTotalScore(0);
    setCurrentQuestion(0);
    setResponses([]);
    setSelectedOptions({});
    setShowResults(false);
    setShowStartPage(true);
    setShowIndustrySelector(false);
  };

  const startQuiz = () => {
    setShowIndustrySelector(true);
    setShowStartPage(false);
  };

  const startAssessment = () => {
    setShowIndustrySelector(false);
  };

  const cancelQuiz = () => {
    setTotalScore(0);
    setCurrentQuestion(0);
    setResponses([]);
    setSelectedOptions({});
    setShowResults(false);
    setShowStartPage(true);
    setShowIndustrySelector(false);
  };

  const calculateSectionScores = () => {
    const sections = [...new Set(filteredQuestions.map((q) => q.Section))];
    const sectionScores = sections.map((section) => {
      const sectionQuestions = filteredQuestions.filter((q) => q.Section === section);
      const sectionResponses = responses.filter(
        (response) => filteredQuestions[response.question].Section === section
      );
      const sectionScore =
        sectionResponses.reduce((acc, cur) => acc + cur.score, 0) /
        sectionQuestions.length;
      return { section, score: sectionScore.toFixed(2) };
    });
    return sectionScores;
  };

  const calculateCategoryScores = () => {
    const categories = [...new Set(filteredQuestions.map((q) => q.Category))];
    const categoryScores = categories.map((category) => {
      const categoryQuestions = filteredQuestions.filter((q) => q.Category === category);
      const categoryResponses = responses.filter(
        (response) => filteredQuestions[response.question].Category === category
      );
      const categoryScore =
        categoryResponses.reduce((acc, cur) => acc + cur.score, 0) /
        categoryQuestions.length;
      return { category, score: categoryScore.toFixed(2) };
    });
    return categoryScores;
  };

  const storeResults = async () => {
    const categoryScores = calculateCategoryScores();
    const environmentScore = parseFloat(categoryScores.find(score => score.category === "Environmental")?.score || 0).toFixed(2);
    const socialScore = parseFloat(categoryScores.find(score => score.category === "Social")?.score || 0).toFixed(2);
    const governanceScore = parseFloat(categoryScores.find(score => score.category === "Governance")?.score || 0).toFixed(2);

    const resultPayload = {
      environmentScore,
      socialScore,
      governanceScore
    };

    const { email, organizationName } = userDetails;
    const endpoint = `https://loadbalancer-dev.sustivate.com/api/sustivate/submit-result?userEmail=${encodeURIComponent(email)}&organizationName=${encodeURIComponent(organizationName)}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('Access_Token')}`
        },
        body: JSON.stringify(resultPayload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Results successfully stored");
    } catch (error) {
      console.error("Error storing results:", error);
    }
  };

  const sectionScores = calculateSectionScores();
  const categoryScores = calculateCategoryScores();

  const getCategoryCard = (category, score) => (
    <Grid item xs={12} md={4} key={category}>
      <Card sx={{ textAlign: 'center', padding: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontSize: "4rem" }}>{getLeafIcon(score)}</Typography> {/* Increase leaf icon size */}
          <Typography variant="body1">Your Result for</Typography>
          <Typography variant="h6" fontWeight="bold">{category}</Typography>
          <Typography variant="body2">{parseFloat(score).toFixed(2)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box m="20px">
      <Header title="Assessments" subtitle="Take this Assessment to get your ESG Rating" />

      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: colors.primary[10], // Set background color here
          "& .pro-sidebar-inner": {
            background: `${colors.primary[100]} !important`,
          },
          padding: "2em",
          height: "600px", // Adjust the height value as needed
        }}
      >
        {showStartPage ? (
          <Paper
            elevation={3}
            style={{ padding: "2em", textAlign: "center" }}
            sx={{
              backgroundColor: colors.primary[400], // Set background color here
              "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
              },
            }}
          >
            <Typography variant="h3" gutterBottom>
              Welcome to the Sustivate Assessment
            </Typography>
            <Typography variant="body1" gutterBottom>
              This assessment will help evaluate your company's sustainability practices.
            </Typography>
            <Button variant="contained" color="secondary" onClick={startQuiz}>
              Start Assessment
            </Button>
          </Paper>
        ) : showIndustrySelector ? (
          <Paper
            elevation={3}
            style={{ padding: "2em", textAlign: "center" }}
            sx={{
              backgroundColor: colors.primary[400], // Set background color here
              "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Select Industries for Environmental Questions
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Industries</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                multiple
                value={selectedIndustries}
                 label="Industries"
                onChange={handleIndustryChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {industryOptions.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    <ListItemIcon>
                      <Checkbox checked={selectedIndustries.includes(industry)} />
                    </ListItemIcon>
                    <ListItemText primary={industry} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={startAssessment} sx={{ marginTop: "1em" }}>
              Start Assessment
            </Button>
          </Paper>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Sustivate Assessment
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Score: {totalScore}
            </Typography>
            {showResults ? (
              <Paper
                elevation={3}
                style={{ padding: "2em" }}
                sx={{
                  backgroundColor: colors.primary[400], // Set background color here
                  "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Your Score:
                </Typography>
                <Grid container spacing={3}>
                  {getCategoryCard("Environment", categoryScores.find(score => score.category === "Environmental")?.score || 0)}
                  {getCategoryCard("Social", categoryScores.find(score => score.category === "Social")?.score || 0)}
                  {getCategoryCard("Governance", categoryScores.find(score => score.category === "Governance")?.score || 0)}
                </Grid>
                {/* Add the leaf information here */}
                <Box mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                    <Typography variant="h4" sx={{ fontSize: "2rem" }}><GreenLeafIcon/></Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                      <Typography variant="h5" fontWeight="bold">
                        Green Leaf:
                      </Typography>
                      <Typography variant="body1">
                        Represents a high score in the Environmental category.
                      </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                    <Typography variant="h4" sx={{ fontSize: "2rem" }}><YellowLeafIcon/></Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                      <Typography variant="h5" fontWeight="bold">
                        Yellow Leaf:
                      </Typography>
                      <Typography variant="body1">
                        Represents a moderate score in the Environmental category.
                      </Typography>
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                    <Typography variant="h4" sx={{ fontSize: "2rem" }}><RedLeafIcon/></Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                      <Typography variant="h5" fontWeight="bold">
                        Red Leaf:
                      </Typography>
                      <Typography variant="body1">
                        Represents a low score in the Environmental category.
                      </Typography>
                    </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3} textAlign="center">
                  {/* <Button variant="contained" color="secondary" onClick={restartQuiz}>
                    Restart Assessment
                  </Button> */}
                  <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} component={Link} to="/home">
                    Back To Home
                  </Button>
                </Box>
              </Paper>
            ) : (
              <Paper
                elevation={3}
                style={{ padding: "2em" }}
                sx={{
                  backgroundColor: colors.primary[400], // Set background color here
                  "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Question {currentQuestion + 1}/{filteredQuestions.length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {filteredQuestions[currentQuestion]?.text || "Question not found"}
                </Typography>
                <List>
                  {filteredQuestions[currentQuestion]?.options.map((option) => (
                    <ListItem
                      key={option.id}
                      button
                      selected={selectedOptions[currentQuestion] === option.id}
                      onClick={() => optionClicked(option.score, option.id)}
                    >
                      <ListItemText primary={option.text} />
                    </ListItem>
                  ))}
                </List>
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={previousQuestion} disabled={currentQuestion === 0}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary" onClick={nextQuestion} disabled={!canProceed} sx={{ marginLeft: 2 }}>
                    {currentQuestion + 1 === filteredQuestions.length ? "Finish" : "Next"}
                  </Button>
                  <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={cancelQuiz}>
                    Cancel
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
