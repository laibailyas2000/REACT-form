import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UserForm = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setErrors({}); // Clear errors when closing the modal
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // Clear the error message for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      onSubmit(formData);
      handleClose();
      setFormData({ name: "", fname: "", email: "", phone: "" });
    }
  };

  const validation = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 5) {
      newErrors.name = "Name must be at least 5 characters";
    }

    // Father's name validation
    if (!formData.fname) {
      newErrors.fname = "Father's Name is required";
    } else if (formData.fname.length < 5) {
      newErrors.fname = "Father's Name must be at least 5 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFName">
              <Form.Label>Father's Name:</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                isInvalid={!!errors.fname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
