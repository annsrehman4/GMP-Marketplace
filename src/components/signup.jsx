import React from "react";
import { Container, TextField, Paper, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import {useFormik} from "formik"
import * as Yup from "yup"
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
}));

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

function Signup() {
  const {signUp, storeUser} = useUserAuth();
  const navigate = useNavigate();



    const validationSchema = Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
          "Password must contain at least one uppercase letter, one number, and be 8-15 characters long"
        )
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      phoneNumber: Yup.string()
        .matches(
          /^\+?[0-9]{10,15}$/,
          "Phone number must be a valid number with 10-15 digits"
        )
        .required('Phone number is required'),
      fullName: Yup.string()
        .matches(
          /^[A-Za-z\s]{2,}$/,
          "Full name must be at least 2 characters and contain only alphabets"
        )
        .required('Full name is required')
    });
    

    

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      fullName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try{
        await signUp(values.email, values.password);
        await storeUser(values);
        navigate("/login");
      }
      catch(err)
      {
        console.log(err.message);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <StyledPaper variant="outlined">
        <Typography variant="h2" component="h2">
          Welcome to GMP
        </Typography>

        <StyledForm onSubmit={formik.handleSubmit}>
          <TextField
            name="fullName"
            id="outlined-basic"
            variant="outlined"
            label="Complete Name"
            fullWidth
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            name="phoneNumber"
            type="number"
            id="outlined-basic"
            variant="outlined"
            label="Number"
            fullWidth
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            name="email"
            type="email"
            id="outlined-basic"
            variant="outlined"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="password"
            type="password"
            id="outlined-basic"
            variant="outlined"
            label="Password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            name="confirmPassword"
            type="password"
            id="outlined-basic"
            variant="outlined"
            label="Confirm Password"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button variant="contained" fullWidth type="submit">
            Signup
          </Button>
        </StyledForm>
      </StyledPaper>
    </Container>

  );
}
export default Signup;