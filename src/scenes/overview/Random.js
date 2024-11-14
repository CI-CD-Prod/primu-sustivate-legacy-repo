import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react"; // Import withAuthenticator
import awsconfig from "../../amplifyconfiguration.json";

Amplify.configure(awsconfig);

const client = Amplify.API;

const Assessments = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (

    
    <Box m="20px">
      <Header title="Assessments" subtitle="Take this Assessment to get your ESG Ratiing" />

      <Formik
        onSubmit={createQuestion}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              
              <div>
                <label htmlFor="que1">Question 1:</label>
                <h4>What is the Amount of Electricity consumed?</h4>
              </div>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Question 1"
                id="que1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Que1}
                name="Que1"
                error={!!touched.Que1 && !!errors.Que1}
                helperText={touched.Que1 && errors.Que1}
                sx={{ gridColumn: "span 4" }}
              />


              <div>
                <label htmlFor="que1">Question 2:</label>
                <h4> What is the volume of water used?</h4>
              </div>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Question 2"
                onBlur={handleBlur}
                id="que2"
                onChange={handleChange}
                value={values.Que2}
                name="Que2"
                error={!!touched.Que2 && !!errors.Que2}
                helperText={touched.Que2 && errors.Que2}
                sx={{ gridColumn: "span 4" }}
              />

              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit Assessment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  Que1: yup.string().required("Question 1 is required"),
  Que2: yup.string().required("Question 2 is required"),
  Que3: yup.string().required("Question 3 is required"),
  Que4: yup.string().required("Question 4 is required"),
  Que5: yup.string().required("Question 5 is required"),
});
const initialValues = {
  Que1: "",
  Que2: "",
  Que3: "",
  Que4: "",
  Que5: "",
  Que6: "",
  Que7: "",
};

export default withAuthenticator(Assessments);