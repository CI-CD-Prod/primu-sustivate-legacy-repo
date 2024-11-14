import { Link } from 'react-router-dom';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme'; // Adjust the import path according to your project structure

const Footer = () => {
    const theme = useTheme();
    const darkColors = tokens('dark'); // Access the dark mode colors directly
    const hoverColor = darkColors.blueAccent[700]; // Set the hover effect color

    const StyledLink = styled(Link)(({ theme }) => ({
        textDecoration: 'none',
        color: darkColors.grey[100],
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            transform: 'scaleX(0)',
            height: '2px',
            bottom: 0,
            left: 0,
            backgroundColor: hoverColor,
            transformOrigin: 'bottom right',
            transition: 'transform 0.25s ease-out',
        },
        '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
        },
        '&:hover': {
            color: hoverColor,
        },
    }));

    return (
        <Box mt={5} pt={5} pb={5} px={10} borderTop="1px solid grey" bgcolor={darkColors.primary[400]}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom align="center" color={darkColors.grey[100]}>
                        PRIM-U
                    </Typography>
                    <Typography variant="body2" align="center" color={darkColors.grey[100]}>
                        <StyledLink to="/user-generated-content-policy">User Generated Content Policy</StyledLink><br />
                        <StyledLink to="/terms-of-use">Terms of use agreement</StyledLink><br />
                        <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom align="center" color={darkColors.grey[100]}>
                        Quick Links
                    </Typography>
                    <Typography variant="body2" align="center" color={darkColors.grey[100]}>
                        <StyledLink to="/">Home</StyledLink><br />
                        <StyledLink to="/prim-u-for-u">Prim-U For-U</StyledLink><br />
                        <StyledLink to="/sustainability">Sustainability</StyledLink><br />
                        <StyledLink to="/services">Services</StyledLink><br />
                        <StyledLink to="/our-products">Our Products</StyledLink><br />
                        <StyledLink to="/about">About</StyledLink><br />
                        <StyledLink to="/contact-us">Contact Us</StyledLink>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom align="center" color={darkColors.grey[100]}>
                        PRIM-U Services
                    </Typography>
                    <Typography variant="body2" align="center" color={darkColors.grey[100]}>
                        <StyledLink to="/services">Services</StyledLink>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom align="center" color={darkColors.grey[100]}>
                        Contact Info
                    </Typography>
                    <Typography variant="body2" align="center" color={darkColors.grey[100]}>
                        info@prim-u.com<br />
                        +27-0600703045
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
