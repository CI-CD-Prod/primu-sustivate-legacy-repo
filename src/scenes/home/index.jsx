import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Box, IconButton, useTheme, Container, Grid, Button, Typography, styled } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import Footer from '../footer/index'; // Import the Footer component

const HoverImage = styled('img')(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const SustivateLandingPage = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Container>
            <Box position="relative" minHeight="100vh" pt={5}>
              
                    {/* <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <LightModeOutlinedIcon />
                        ) : (
                            <DarkModeOutlinedIcon />
                        )}
                    </IconButton> */}
                

                <Box mb={5}>
                    <Grid container spacing={3} alignItems="center" justifyContent="center">

                        <Grid item xs={12} sm={10} md={8}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                            <Typography variant="h2" component="h1" align="center" gutterBottom mt={3}>
                                Sustivate
                            </Typography>
                            <Typography variant="body1" component="p" paragraph align="center">
                                Sustivate is a cutting-edge tool designed to help organizations measure and manage their ESG (Environmental, Social, and Governance) compliance. Our platform focuses on sustainability, providing comprehensive assessments that enable companies to understand and improve their impact on the environment, society, and governance practices.
                            </Typography>
                            <Typography variant="body1" component="p" paragraph align="center">
                                Using Sustivate, businesses can track their performance across various sustainability metrics, identify areas for improvement, and implement strategies to enhance their ESG profile. Our tool is essential for companies committed to making a positive difference and meeting regulatory requirements.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} p={5} bgcolor={colors.primary[400]} borderRadius="15px">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        About This Tool
                    </Typography>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="p" paragraph>
                                Sustivate is more than just an assessment tool; it's a comprehensive platform for managing sustainability initiatives. By evaluating your company's practices across five key areas—governance, workers, community, environment, and customers—you can gain valuable insights into your ESG performance.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                            <HoverImage
                                src="/assets/Analytics.jpg"
                                alt="Analytics"
                                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} p={5} bgcolor={colors.primary[400]} borderRadius="15px">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        How It Works
                    </Typography>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                            <HoverImage
                                src="/assets/Computer2.jpg"
                                alt="How It Works"
                                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="p" paragraph>
                                Complete the B Impact Assessment by answering a series of questions about your company's practices and outputs across five categories: governance, workers, community, environment, and customers. This assessment will help you understand where your organization stands and identify areas for improvement.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} p={5} bgcolor={colors.primary[400]} borderRadius="15px">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        Compare Your Impact
                    </Typography>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="p" paragraph>
                                Sustivate allows you to benchmark your performance against industry standards and peers. By comparing your impact, you can see where you excel and where there is room for improvement. Use this information to drive strategic initiatives that enhance your ESG profile.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                            <HoverImage
                                src="/assets/Computer1.jpg"
                                alt="Compare Impact"
                                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} p={5} bgcolor={colors.primary[400]} borderRadius="15px">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        Improve Your Impact
                    </Typography>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                            <HoverImage
                                src="/assets/Computer2.jpg"
                                alt="Improve Impact"
                                style={{ width: '70%', height: 'auto', borderRadius: '15px' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="p" paragraph>
                                Once you have assessed and compared your impact, Sustivate provides actionable insights and recommendations to help you improve. Implement these strategies to enhance your sustainability practices and achieve better ESG outcomes.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} p={5} textAlign="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/Assessments"
                        size="large"
                        sx={{ mx: 1 }}
                    >
                        Start Your Assessment &gt;&gt;
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SustivateLandingPage;
