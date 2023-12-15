import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { message } from 'antd';
import setAuthToken from '../utils/setAuthToken';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const Users = () => {
const navigate = useNavigate()
  const { userData, fetchUserInfo, logout } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  if (userData?.userType === "user"){
    navigate('/profile')
  }
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
  
    try {
      const res = await axios.get('http://localhost:8080/api/user/users'); // Replace with your API endpoint
      setUsers(res?.data);
      
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUsers(token);
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">All Users</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="outline-danger" className="w-100 mt-3" onClick={logout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
