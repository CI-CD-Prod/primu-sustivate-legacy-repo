import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from 'aws-amplify/auth';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Button, useMediaQuery, Drawer } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

const Item = ({ title, to, icon, selected, setSelected, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (isSmallScreen) {
    return (
      <Button
        onClick={() => {
          setSelected(title);
          handleClose();
        }}
        style={{
          justifyContent: 'flex-start',
          color: colors.grey[100],
          width: '100%',
          textTransform: 'none',
          padding: '10px 20px',
        }}
        startIcon={icon}
        component={Link}
        to={to}
      >
        <Typography>{title}</Typography>
      </Button>
    );
  }

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, updateAuthStatus, onSidebarWidthChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    try {
      console.log('Logout');
      await signOut();
      updateAuthStatus(false);
      navigate('/login');
    } catch (err) {
      console.log('Error during sign out:', err);
    }
  };

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onSidebarWidthChange(newCollapsed ? 80 : 250); // Adjust based on collapsed state
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (!isSmallScreen) {
      setIsDrawerOpen(false);
    }
  }, [isSmallScreen]);

  const sidebarContent = (
    <Menu iconShape="square">
      <MenuItem
        onClick={isSmallScreen ? handleDrawerToggle : handleToggleCollapse}
        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
        style={{
          margin: "10px 0 20px 0",
          color: colors.grey[100],
        }}
      >
        {!isCollapsed && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
          >
            <IconButton onClick={handleToggleCollapse}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </MenuItem>

      {!isCollapsed && (
        <Box mb="25px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={`../../assets/Logomark_Green_Variation.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Box textAlign="center">
            <img
              alt="sustivate-logo-text"
              width="50%"
              height="100%"
              src={`../../assets/Logotype_Primary.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
      )}

      <Box paddingLeft={isCollapsed ? undefined : "10%"}>
        <Item
          title="Home"
          to="/home"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          handleClose={handleDrawerToggle}
        />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
            <Item
              title="Assessments"
              to="/Assessments"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Overview"
              to="/overview"
              icon={<AnalyticsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

        {/* <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Pages
        </Typography> */}
        <Item
          title="Profile"
          to="/profile"
          icon={<PersonOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          handleClose={handleDrawerToggle}
        />

        {/* <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Other
        </Typography> */}
        <Item
          title="FAQ"
          to="/faq"
          icon={<HelpOutlineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          handleClose={handleDrawerToggle}
        />
      </Box>
      <Box textAlign="center" m="20px 0">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </Box>
    </Menu>
  );

  return (
    <Box
      sx={{
        position: 'fixed', // Fix the sidebar position
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 1000, // Ensure it stays on top
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: '100%',
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {isSmallScreen ? (
        <>
          <IconButton onClick={handleDrawerToggle} sx={{ position: 'fixed', top: 10, left: 10 }}>
            <MenuOutlinedIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            PaperProps={{
              sx: {
                background: `${colors.primary[400]} !important`,
                width: '250px', // Set the width for the Drawer
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <ProSidebar collapsed={isCollapsed} style={{ height: '100%' }}>
          {sidebarContent}
        </ProSidebar>
      )}
    </Box>
  );
};

export default Sidebar;
