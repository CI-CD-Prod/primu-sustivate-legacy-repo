import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What is the Sustivate assessment and how does it work?

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The Sustivate assessment is an online tool designed to help manufacturers and distributors in the beauty and cosmetics industry evaluate their sustainability practices. After registering on the PRIM-U website, you enter your details,
           select your industry, and answer specific questions. Your results are provided in the form of a leaf: green for full compliance, yellow for moderate compliance, and red for low compliance with ESG standards.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Who can use the Sustivate assessment?

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The assessment is intended for businesses within the beauty and cosmetics industry, including manufacturers, ingredients producers, and distribution facilities. It is designed to help companies of various sizes improve their sustainability practices.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How do I register for the Sustivate assessment?

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To register for the assessment, visit the PRIM-U website, create an account, and follow the prompts to enter your business details and select your industry. 
          Once registered, you can begin the assessment process.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What do the different leaf colors mean?

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The leaf colors indicate your level of compliance with ESG standards: green signifies full compliance, yellow indicates moderate compliance, and red reflects low compliance. These results help you identify areas needing improvement.
          </Typography>
        </AccordionDetails>
      </Accordion>
   
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can Sustivate connect me with sustainable suppliers?


          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, Sustivate can connect you with vetted suppliers of sustainably sourced natural ingredients who comply with international standards. This connection can improve your value and supply chains, further enhancing your ESG standing.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How can the results of the assessment help my business?


          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The assessment results help you identify specific areas for ESG improvement and allow you to benchmark your performance against peers in similar industries and businesses of comparable sizes. This comparison provides insights into best practices and guides you towards more sustainable business operations.
          </Typography>
        </AccordionDetails>
      </Accordion>
      

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What is the goal of Sustivate for the beauty and cosmetics industry?

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Sustivate aims to help the beauty and cosmetics industry achieve greater sustainability by providing accurate ESG assessments and fostering a community committed to sustainable practices. Our goal is to support businesses in their journey towards net zero emissions by 2050, in line with global standards and consumer expectations.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
