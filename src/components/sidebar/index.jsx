import { Button } from "@mui/material";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { BsSliders } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa";
import { Collapse } from 'react-collapse';
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Mycontext } from "../../App";

function Sidebar() {
    const [menuopen, setmenuopen] = useState(null);

    function setmenuopening(index) {
        setmenuopen(prev => (prev === index ? null : index));
    }
    const context = useContext(Mycontext)

    return (
        <div className={`fixed bg-[#f1f1f1] border-r-3 border-[rgba(0,0,0,0.1)] ${context.isopensidebar === false ? '-translate-x-full' : 'translate-x-0'} w-[22%] h-full z-50 top-0 left-0 transition-all duration-600`}>
            <div className="px-5 py-2 w-full">
                <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" alt="" className="w-[130px]" />
            </div>

            <ul className="list-none  myaccounttabs">
                <li>
                    < NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                        <Button component={Link} to={'/'} className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]">
                            <RiDashboardHorizontalLine className="!text-[20px]" />
                            <span>Dashboard</span>
                        </Button>
                    </NavLink>
                </li>

                <li>
                    <Button
                        className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]"
                        onClick={() => setmenuopening(1)}>
                        <BsSliders className="!text-[20px]" />
                        <span>Home Slides</span>
                        <div className="ml-auto w-[20px] h-[20px]">
                            <FaAngleDown
                                className={`top-0 left-0 duration-900 ${menuopen === 1 ? 'opacity-100 -rotate-180' : ''}`}
                            />
                        </div>
                    </Button>

                    <Collapse isOpened={menuopen === 1}>
                        <ul className="w-full opacity-70 bg-white list-none myaccounttabs">
                            <li className="w-full">
                                < NavLink to="/homebanner" end className={({ isActive }) => (isActive ? "active" : "")}>
                                    <Button component={Link} to={'/homebanner'} className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !capitalize !text-[14px] !font-[400] flex gap-3">

                                        Home Banner List
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <Button className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !capitalize !text-[14px] !font-[400] flex gap-3" onClick={() => { context.setopendialogue({ open: true, model: "Add Home Slider" }); setmenuopening(2) }}>
                                    Add Home Banner Slider
                                </Button>
                            </li>
                        </ul>
                    </Collapse>
                </li>


                <li>
                    < NavLink to="/users" end className={({ isActive }) => (isActive ? "active" : "")}>
                        <Button component={Link} to={'/users'} className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]">
                            <FiUsers className="!text-[20px]" />
                            <span>Users</span>
                        </Button>
                    </NavLink>
                </li>

                <li>
                    <Button
                        className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]"
                        onClick={() => setmenuopening(2)}>
                        <FaProductHunt className="!text-[20px]" />
                        <span>Products</span>
                        <div className="ml-auto w-[20px] h-[20px]">
                            <FaAngleDown
                                className={`top-0 left-0 duration-900 ${menuopen === 2 ? 'opacity-100 -rotate-180' : ''}`}
                            />
                        </div>
                    </Button>

                    <Collapse isOpened={menuopen === 2}>
                        <ul >
                            <li className="w-full">
                                < NavLink to="/products" end className={({ isActive }) => (isActive ? "active" : "")}>
                                    <Button component={Link} to={'/products'} className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !capitalize !text-[14px] !font-[400] flex gap-3">

                                        Product List
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <Button className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !capitalize !text-[14px] !font-[400] flex gap-3" onClick={() => { context.setopendialogue({ open: true, model: "Add Product" }); setmenuopening(2) }}>

                                    Product Upload
                                </Button>
                            </li>
                        </ul>
                    </Collapse>
                </li>



                <li>
                    <Button
                        className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]"
                        onClick={() => setmenuopening(3)}>
                        <RiDashboardHorizontalLine className="!text-[20px]" />
                        <span>Categories</span>
                        <div className="ml-auto w-[20px] h-[20px]">
                            <FaAngleDown
                                className={`top-0 left-0 duration-900 ${menuopen === 3 ? 'opacity-100 -rotate-180' : ''}`}
                            />
                        </div>
                    </Button>

                    <Collapse isOpened={menuopen === 3}>
                        <ul >
                            <li className="w-full">
                                < NavLink to="/catagorylist" end className={({ isActive }) => (isActive ? "active" : "")}>
                                    <Button component={Link} to={'/catagorylist'} className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !normal-case !text-[14px] !font-[400] flex gap-3">

                                        Catagory List
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <Button className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !normal-case !text-[14px] !font-[400] flex gap-3" onClick={() => { context.setopendialogue({ open: true, model: "Add Catagory" }); setmenuopening(3) }}>

                                    Add a Catagory
                                </Button>
                            </li>
                            <li className="w-full">
                                <Button component={Link} to={'/subcatagoryadd'} className="w-full hover:!bg-[rgba(0,0,0,0.1)] !pl-15 !flex !items-center !justify-start !text-black !normal-case !text-[14px] !font-[400] flex gap-3">

                                    Add a Sub Catagory
                                </Button>
                            </li>
                        </ul>
                    </Collapse>

                    < NavLink to="/orders" end className={({ isActive }) => (isActive ? "active" : "")}>
                        <Button component={Link} to={'/orders'} className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]">
                            <IoBagCheckOutline className="!text-[20px]" />
                            <span>Orders</span>
                        </Button>
                    </NavLink>
                </li>

                <li>
                    <Button className="w-full !mt-3 !px-5 !flex !items-center !justify-start !text-black !capitalize !text-[18px] gap-3 !font-[400]">
                        <SlLogout className="!text-[20px]" />
                        <span>Log Out</span>
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
