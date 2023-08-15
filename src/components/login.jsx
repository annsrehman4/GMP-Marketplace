import React, { useRef } from "react";
import { Container, TextField, Paper, Button, Typography } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useUserAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        // Navigate to the appropriate page after successful sign-in
        navigate("/home");
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" style={{ padding: 20, marginTop: 100 }}>
        <Typography variant="h2" component="h2">
          Welcome to GMP
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            inputRef={emailRef}
            id="outlined-basic"
            variant="outlined"
            label="Email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            id="outlined-basic"
            variant="outlined"
            label="Password"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login; 