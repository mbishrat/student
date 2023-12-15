import { useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { useState } from 'react';
import setAuthToken from '../utils/setAuthToken';
import { message } from 'antd';
import axios from 'axios';

const UserProfile = () => {
  const { userData, setUserData, fetchUserInfo, logout } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(userData.address || ''); // State for address input
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || ''); // State for phone number input
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const updatedUserData = {
      ...userData,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
    };

    try {
      const res = await axios.put('http://localhost:8080/api/user/update', updatedUserData);
      message.success(res.data.message);
      setUserData({})
      setIsEditing(false);
    } catch (err) {
      message.error(err.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">User Profile</h2>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userData.firstName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={userData.lastName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={userData.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                This is your registered email address.
              </Form.Text>
            </Form.Group>
             <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={userData.address}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>
            
             <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={userData.phoneNumber}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>
            {isEditing && (
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            )}

            {isEditing ? (
              <Button variant="primary" className="w-100 mt-3" onClick={handleSaveClick}>
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="w-100 mt-3"
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
            <Button variant="outline-danger" className="w-100 mt-3" onClick={logout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
