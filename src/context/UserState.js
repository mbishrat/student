import UserContext from "./UserContext"
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { useState } from "react";
const UserState = ({children}) =>{

    const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const fetchUserInfo = async (token) => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:8080/api/user/info");
        setUserData(res?.data?.user);
      } catch (err) {
        message.error(err?.response?.data?.message);
        console.error(err);
      }
    }
  };


  //   const fetchUserInfo = async (token) => {
  //     try {
  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         const currentTime = Date.now() / 1000;
  //         if (decodedToken.exp < currentTime) {
  //           logout();
  //           return;
  //         }
  //         setAuthToken(token);
  //         const res = await axios.get(GET_USER_INFO_API_URL);
  //         const data = res?.data?.user;
  //         setUserInfo(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //     }
  //   };

  const logout = () => {
    setAuthToken();
    localStorage.removeItem("token");
    navigate("/");
  };

    return(
        <UserContext.Provider value={{
            userData,
            setUserData,
            fetchUserInfo,
    
            logout,
          }}
          >
            {children}
        </UserContext.Provider>
    )
}


export default UserState