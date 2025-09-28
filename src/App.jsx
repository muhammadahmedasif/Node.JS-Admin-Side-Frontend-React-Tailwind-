import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Dashboard from './components/pages/dashboard'
import { createContext, useEffect, useState } from 'react'
import Login from './components/pages/login'
import Signup from './components/pages/signup'
import ProductListing from './components/pages/productslist'
import React from 'react'
import AddProduct from './components/addproductmodel'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoCloseSharp } from "react-icons/io5";
import AddHomeSlide from './components/pages/homeslidelist'
import AddSlider from './components/addslidermodel'
import AddCatagory from './components/pages/catagorylist'
import AddCatagoryModel from './components/addcatagorymodel'
import UsersDetails from './components/pages/usersdetails'
import OrdersListing from './components/pages/orderslisting'
import ForgetPassword from './components/pages/forgetpassword'
import VerifyAccount from './components/pages/verifyaccount'
import NewPassword from './components/pages/newpassword'
import toast, { Toaster } from 'react-hot-toast';
import { fetchdatafromapi } from '../utils/api'
import MyAccount from './components/pages/myaccount'
import Addaddress from './components/addaddress'

const Mycontext = createContext()

function AppLayout({ children }) {
  const location = useLocation()
  const { isopensidebar } = React.useContext(Mycontext)

  // hide header + sidebar only on login/signup
  const hideLayout =
    location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgetpassword' || location.pathname === '/verifyaccount' || location.pathname === '/newpassword'

  if (hideLayout) {
    return <>{children}</> // return only page content (no header/sidebar)
  }

  return (
    <div>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${isopensidebar ? 'w-[22%]' : 'w-[0px]'
            } duration-600 transition-all`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div
          className={`${isopensidebar ? 'w-[78%]' : 'w-full'
            } px-5 py-4 transition-all duration-600`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isopensidebar, setisopensidebar] = useState(false)
  const [isloggedin, setisloggedin] = useState(false)
  const [ opendialogue, setopendialogue ] = useState({ open: false, model: null })
  const [userdata, setuserdata] = useState(null);
  const [useraddress, setuseraddress] = useState(null);

 const navigate = useNavigate()

 const openalertbox = (status, msg) => {
    if (status === 'success')
      toast.success(msg);
    else
      toast.error(msg)
  }
  
  const fetchuseraddress = async () => {
   const response = await fetchdatafromapi("/address/getalladdresses");
  
   if (response?.error) {
     setuseraddress(null);
     navigate("/myaccount");
     openalertbox("error", response.message);
   } else {
     setuseraddress(response.address);
   }
  };

  const fetchUserData = async () => {
  const response = await fetchdatafromapi("/user/userdetails");

  if (response?.error) {
    setisloggedin(false);
    setuserdata(null);
    localStorage.clear();
    navigate("/login");
    openalertbox("error", response.message);
  } else {
    setuserdata(response.user_details);
    setisloggedin(true);
    fetchuseraddress();
    console.log("User details:", response.user_details);
  }
};


  const values = { isopensidebar, setisopensidebar, isloggedin, setisloggedin, opendialogue, setopendialogue,setuserdata,userdata, openalertbox, fetchUserData, fetchuseraddress, setuseraddress, useraddress};

   useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token !== null && token !== "undefined" && token.trim() !== "") {
    fetchUserData(); 
  } else {
    setisloggedin(false);
    setuserdata(null);
  }
}, []);

  return (
      <Mycontext.Provider value={values}>
        <Routes>
          <Route
            path="/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AppLayout>
                <Signup />
              </AppLayout>
            }
          />
          <Route
            path="/products"
            element={
              <AppLayout>
                <ProductListing />
              </AppLayout>
            }
          />
          <Route
            path="/homebanner"
            element={
              <AppLayout>
                <AddHomeSlide />
              </AppLayout>
            }
          />
          <Route
            path="/catagorylist"
            element={
              <AppLayout>
                <AddCatagory />
              </AppLayout>
            }
          />
          <Route
            path="/subcatagoryadd"
            element={
              <AppLayout>
                <AddCatagory />
              </AppLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AppLayout>
                <UsersDetails />
              </AppLayout>
            }
          />
          <Route
            path="/myaccount"
            element={
              <AppLayout>
                <MyAccount />
              </AppLayout>
            }
          />
          <Route
            path="/orders"
            element={
              <AppLayout>
                <OrdersListing />
              </AppLayout>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <AppLayout>
                <ForgetPassword />
              </AppLayout>
            }
          />
          <Route
            path="/verifyaccount"
            element={
              <AppLayout>
                <VerifyAccount />
              </AppLayout>
            }
          />
          <Route
            path="/newpassword"
            element={
              <AppLayout>
                <NewPassword />
              </AppLayout>
            }
          />
          <Route
            path="/"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
        </Routes>

        <Dialog
          fullScreen
          open={opendialogue.open}
          onClose={()=>{setopendialogue({ open: false, model: null })}}
        >
          <AppBar sx={{ position: 'relative',background:'#d4caca62' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                className='!text-[30px] !text-gray-600'
                onClick={()=>{setopendialogue({ open: false, model: null })}}
                aria-label="close"
              >
                <IoCloseSharp />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className='text-[20px] text-gray-600 font-[700]'>{opendialogue.model}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {opendialogue.model==='Add Product'&&<AddProduct/>}
          {opendialogue.model==='Add Home Slider'&&<AddSlider/>}
          {opendialogue.model==='Add Catagory'&&<AddCatagoryModel/>}
          {opendialogue.model==='Add Sub Catagory'&&<AddCatagoryModel/>}
          {opendialogue.model==='Add Address'&&<Addaddress/>}
          
        </Dialog>

      <Toaster/>   
      </Mycontext.Provider>
  )
}

export { Mycontext }
export default App
