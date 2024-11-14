import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Box, IconButton, useTheme, Container, Grid, Button, Typography, styled } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Footer from '../footer/index'; // Import the Footer component

const HoverImage = styled('img')(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const HomePage = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Container>
      <Box position="relative" minHeight="100vh" pt={5}>
        {/* ICONS */}
        <Box position="absolute" top={8} right={16} display="flex" zIndex={1000}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
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

        <Box mb={5}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} display="flex" justifyContent="center">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HoverImage
                  src="/assets/Logomark_Green_Variation.png"
                  alt="Logo"
                  style={{ width: '10%', height: 'auto', marginRight: '20px' }}
                />
                <HoverImage
                  src="/assets/Logotype_Primary.png"
                  alt="Logo"
                  style={{ width: '50%', height: 'auto' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Sustivate
              </Typography>
              <Typography variant="body1" component="p" paragraph>
              Sustivate revolutionizes sustainability tracking for beauty and cosmetics companies, transforming raw data into actionable ESG insights. 

              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                {props.isAuthenticated === false && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/login"
                      size="small"
                      sx={{ flexGrow: 1, mx: 1 }}
                    >
                      Login &gt;&gt;
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/register"
                      size="small"
                      sx={{ flexGrow: 1, mx: 1 }}
                    >
                      Register &gt;&gt;
                    </Button>
                  </>
                )}
                {props.isAuthenticated !== false && (
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/contacts"
                    size="small"
                    sx={{ flexGrow: 1, mx: 1 }}
                  >
                    View Contacts &gt;&gt;
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5} style={{ padding: "2em", textAlign: "left", borderRadius: '15px' }} sx={{ backgroundColor: colors.primary[400] }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                About This Assessment
              </Typography>
              <Typography variant="body1" component="p" paragraph>
               Sustivate is an ESG (Environmental,Social and Governance) assessment and reporting tool designed to help manufacturers and distributors in the beauty and cosmetics industry, align their practices with the United Nations ESG standards. By monitoring extraction, production, transportation, and manufacturing processes, Sustivate assists companies in enhancing their sustainability efforts. With the goal of becoming net zero by 2050, the urgency for more sustainable manufacturing processes has increased, driven by both global standards bodies and consumer demand for transparency in product origins and nature.

              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" justifyContent="center">
              <HoverImage
                src="/assets/Analytics.jpg"
                alt="Logo"
                style={{ width: '50%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={5} style={{ padding: "2em", textAlign: "left", borderRadius: '15px' }} sx={{ backgroundColor: colors.primary[400] }}>
          <Typography variant="h1" component="h1" gutterBottom style={{ padding: "1em", textAlign: "center" }}>
            How It Works
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} display="flex" justifyContent="center">
              <HoverImage
                src="/assets/Computer2.jpg"
                alt="Logo"
                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ padding: "3em", textAlign: "left" }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Assess your impact
              </Typography>
              <Typography variant="body1" component="p" paragraph>
              To begin the Sustivate assessment, register on the Sustivate website, enter your details, and select your industry—whether manufacturing, ingredients production, or distribution etc. Answer the industry-specific questions and receive your results in the form of a leaf: Once you have completed your assessment your results will generate either a green leaf for full compliance with ESG standards, a yellow leaf for moderate compliance, and red leaf for low compliance.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5} style={{ padding: "5em", textAlign: "left" }} sx={{ backgroundColor: colors.primary[400] }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Compare your impact
              </Typography>
              <Typography variant="body1" component="p" paragraph>
              The results of the Sustivate assessment not only help you identify and target specific areas for ESG improvement but also allow you to benchmark your performance against peers in similar industries and businesses of comparable sizes. By comparing your impact with others, you can better understand your standing in the industry and gain valuable insights into best practices for enhancing your sustainability efforts. This comparison helps you recognize areas of strength and opportunities for growth, ultimately guiding you towards more effective and sustainable business practices.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" justifyContent="center">
              <HoverImage
                src="/assets/Computer1.jpg"
                alt="Logo"
                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
              />
            </Grid>
            <Grid spacing={3} item xs={12} sm={6} display="flex" justifyContent="center">
              
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ m: 1 }} alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              size="small"
              sx={{ flexGrow: 1, mx: 1 }}
            >
              Start Your Assessment &gt;&gt;
            </Button>
          </Grid>
        </Box>
       
        <Footer /> {/* Use the Footer component */}
      </Box>
    </Container>
  );
};

export default HomePage;
