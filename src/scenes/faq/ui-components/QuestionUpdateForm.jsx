/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getQuestion } from "../graphql/queries";
import { updateQuestion } from "../graphql/mutations";
const client = generateClient();
export default function QuestionUpdateForm(props) {
  const {
    id: idProp,
    question: questionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    que1: "",
    que2: "",
  };
  const [que1, setQue1] = React.useState(initialValues.que1);
  const [que2, setQue2] = React.useState(initialValues.que2);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = questionRecord
      ? { ...initialValues, ...questionRecord }
      : initialValues;
    setQue1(cleanValues.que1);
    setQue2(cleanValues.que2);
    setErrors({});
  };
  const [questionRecord, setQuestionRecord] = React.useState(questionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getQuestion.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getQuestion
        : questionModelProp;
      setQuestionRecord(record);
    };
    queryData();
  }, [idProp, questionModelProp]);
  React.useEffect(resetStateValues, [questionRecord]);
  const validations = {
    que1: [{ type: "Required" }],
    que2: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          que1,
          que2,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateQuestion.replaceAll("__typename", ""),
            variables: {
              input: {
                id: questionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "QuestionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Que1"
        isRequired={true}
        isReadOnly={false}
        value={que1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              que1: value,
              que2,
            };
            const result = onChange(modelFields);
            value = result?.que1 ?? value;
          }
          if (errors.que1?.hasError) {
            runValidationTasks("que1", value);
          }
          setQue1(value);
        }}
        onBlur={() => runValidationTasks("que1", que1)}
        errorMessage={errors.que1?.errorMessage}
        hasError={errors.que1?.hasError}
        {...getOverrideProps(overrides, "que1")}
      ></TextField>
      <TextField
        label="Que2"
        isRequired={true}
        isReadOnly={false}
        value={que2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              que1,
              que2: value,
            };
            const result = onChange(modelFields);
            value = result?.que2 ?? value;
          }
          if (errors.que2?.hasError) {
            runValidationTasks("que2", value);
          }
          setQue2(value);
        }}
        onBlur={() => runValidationTasks("que2", que2)}
        errorMessage={errors.que2?.errorMessage}
        hasError={errors.que2?.hasError}
        {...getOverrideProps(overrides, "que2")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || questionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || questionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
