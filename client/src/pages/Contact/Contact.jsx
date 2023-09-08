import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    // Simple email validation, you can use a library like 'validator' for more robust validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSignIn = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      // Aquí puedes agregar la lógica de inicio de sesión si es necesario
      setIsLoggedIn(true);

      // También puedes restablecer los campos del formulario y los errores aquí
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
      });
      setImage(null);
      setErrors({});
    }
  };

  const handleSignOut = () => {
    // Aquí puedes agregar la lógica de cierre de sesión si es necesario
    setIsLoggedIn(false);

    // También puedes restablecer los campos del formulario y los errores aquí
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
    setImage(null);
    setErrors({});
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isLoggedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <div className="grid-container">
        <div className="profile-info">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="profile-picture">
          {image ? (
            <img src={image} alt="User" />
          ) : (
            <div className="placeholder">No image selected</div>
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">Upload Image</label>
        </div>
      </div>
    </div>
  );
}

export default Contact;



/* import React from "react";

const Contact = () => {
  return <div>Contact</div>;
};

export default Contact; */