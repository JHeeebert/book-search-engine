import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Check form validity
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
      // Display success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
        timer: 3000, // Timer to auto-close the alert after 3 seconds
        timerProgressBar: true,
      });
    } catch (err) {
      console.error(err);
      // Display error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        timer: 3000,
        timerProgressBar: true,
      });
    }
    // Clear form data after submission
    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Email input */}
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password input */}
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        {/* Submit button */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;