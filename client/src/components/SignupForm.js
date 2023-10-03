import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createUser] = useMutation(ADD_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true); // Show validation feedback
      return;
    }
    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });
      if (data && data.addUser && data.addUser.token) {
        Auth.login(data.addUser.token);
      } else {
        console.error("Unexpected response from server:", data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong with your signup!",
        });
      }
    } catch (err) {
      console.error("Error during mutation:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong with your signup!",
      });
    }
    // Clear the form after submission
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
    setValidated(false);
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>

          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />

          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>

          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />

          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

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

        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
