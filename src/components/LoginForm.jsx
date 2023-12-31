import { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import UserContext from '../context/UserContext';

const LoginForm = () => {
  const { userData } = useContext(UserContext);
console.log(userData)
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/user/login', loginInfo);
      const token = res?.data?.token;
      const userType = res?.data?.userType; // Assuming userType is returned in the response
      message.success(res?.data?.message);
      setAuthToken(token);
      localStorage.setItem('token', token);

      if  (res?.data?.user?.userType === 'admin') {
        navigate('/users');
      } else if (res?.data?.user?.userType === 'user') {
        navigate('/profile');
      } else {
        navigate('/');
      }

      setLoginInfo({
        email: '',
        password: ''
      });
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  };
  const token = localStorage.getItem('token');

if(token && userData?.email){
  return <Navigate to={userData?.userType === "admin" ? "/users" : "/profile"} />
}
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Log In</h2>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={loginInfo.email}
                onChange={handleInputChange}
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginInfo.password}
                onChange={handleInputChange}
                className="rounded-pill"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill mt-3">
              Log In
            </Button>
            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <Button variant="outline-primary">Sign Up</Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
