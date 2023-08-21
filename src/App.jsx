import {useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm.jsx";
import {Route, Routes} from "react-router-dom";
import jwt from "jwt-decode";
import CarBookingList from "./components/car_booking/CarBookingList.jsx";
import axios from "axios";
import ResponsiveDrawer from "./components/ResponsiveDrawer.jsx";
import CarBookingForm from "./components/car_booking/CarBookingForm.jsx";
import RoomList from "./components/room/RoomList.jsx";
import RoomForm from "./components/room/RoomForm.jsx";
import RoomEditForm from "./components/room/RoomEditForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import HomePage from "./components/home/HomePage.jsx";
import RoomBookingForm from "./components/room_booking/RoomBookingForm.jsx";
import RoomBookingList from "./components/room_booking/RoomBookingList.jsx";
import BuyingRequestForm from "./components/buying_request/BuyingRequestForm.jsx";
import BuyingRequestList from "./components/buying_request/BuyingRequestList.jsx";
import NotFound from "./components/NotFound.jsx";


function App() {
  console.log("http://" + import.meta.env.VITE_API_HOSTNAME + ":" + import.meta.env.VITE_API_PORT)
  console.log(`http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}`)

  const [user, setUser] = useState([]);

  const [rooms, setRooms] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);

  const [cars, setCars] = useState([]);
  const [carBookings, setCarBookings] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [buyingRequests, setBuyingRequests] = useState([]);

  const [processes, setProcesses] = useState([]);


  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token');
      const payload = jwt(token);
      setUser(payload);
      if (payload.exp <= Date.now()) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }, [localStorage]);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/rooms`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setRooms(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/room_bookings`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setRoomBookings(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/cars`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setCars(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/car_bookings`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setCarBookings(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/departments`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setDepartments(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/buying_requests`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setBuyingRequests(response.data);
      // console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const url = `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/buying_requests`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((response) => {
      setBuyingRequests(response.data);
      // console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);


  return (
    <Routes>
      <Route path="/" element={<ResponsiveDrawer/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/home" element={<ResponsiveDrawer><HomePage/></ResponsiveDrawer>}/>


      {(() => {
        let routes = [];
        if (user.role === "hr") {
          routes.push(<Route path="/rooms" element={<ResponsiveDrawer><RoomList rooms={rooms}
                                                                                role={user.role}/></ResponsiveDrawer>}/>);
          routes.push(<Route path="/room"
                             element={<ResponsiveDrawer><RoomForm/></ResponsiveDrawer>}></Route>);
          routes.push(<Route path="/room/:id"
                             element={<ResponsiveDrawer><RoomEditForm/></ResponsiveDrawer>}/>);
        }
        if (["user", "manager", "hr"].includes(user.role)) {
          routes.push(
            <Route path="/room_bookings"
                   element={<ResponsiveDrawer><RoomBookingList roomBookings={roomBookings} rooms={rooms}
                                                               user={user}/></ResponsiveDrawer>}/>);
        }
        if (["user", "manager", "driver"].includes(user.role)) {
          routes.push(
            <Route path="/car_bookings"
                   element={<ResponsiveDrawer><CarBookingList carBookings={carBookings} cars={cars}
                                                              user={user}/></ResponsiveDrawer>}/>
          );
        }
        if (["user", "manager", "tech", "hr"].includes(user.role)) {
          routes.push(
            <Route path="/buying_requests"
                   element={<ResponsiveDrawer><BuyingRequestList buyingRequests={buyingRequests}
                                                                 departments={departments}
                                                                 user={user}/></ResponsiveDrawer>}/>
          );
        }

        if (user.role === "user") {
          routes.push(
            <Route path="/room_booking"
                   element={<ResponsiveDrawer><RoomBookingForm rooms={rooms}
                                                               user={user}/></ResponsiveDrawer>}/>);
          routes.push(
            <Route path="/car_booking"
                   element={<ResponsiveDrawer><CarBookingForm cars={cars}
                                                              user={user}/></ResponsiveDrawer>}/>);
          routes.push(
            <Route path="/buying_request"
                   element={<ResponsiveDrawer><BuyingRequestForm departments={departments}
                                                                 user={user}/></ResponsiveDrawer>}/>
          );
        }
        routes.push(
          <Route path="*" element={<NotFound/>}/>
        );
        return (
          <>
            {...routes}
          </>
        );
      })()}
    </Routes>

  )
    ;
}

export default App;
