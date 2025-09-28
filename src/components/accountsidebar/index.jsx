import { BsUpload } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { SlLogout } from "react-icons/sl";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { FaUserLargeSlash } from "react-icons/fa6";
import { Mycontext } from "../../App";
import { deleteAvatar, fetchdatafromapi, uploadImage } from "../../../utils/api";


function AccountSidebar() {
    const context = useContext(Mycontext)
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const formData = new FormData();

    async function handlechange(e) {
        try {
            e.preventDefault();

            const files = e.target.files[0];
            if (!files) return;

            setloading(true);

            if (files && (files.type === "image/jpeg" || files.type === "image/jpg" || files.type === "image/png" || files.type === "image/webp")) {
                formData.append('avatar', files);
            } else {
                context.openalertbox("error", "Please provide a valid JPG, JPEG, PNG or webp file type");
                return;
            }

            console.log("Uploading avatar...");
            const response = await uploadImage("/user/avatarupload", formData);
            console.log("Response:", response);

            if (response.error) {
                context.openalertbox("error", response.message);
                return;
            } else {
                context.openalertbox("success", response.message);

                // ✅ Fix: access avatar inside response.data
                context.setuserdata(prev => ({
                    ...prev,
                    avatar: response.data?.avatar
                }));
                return;
            }
        } catch (err) {
            console.error("Upload error:", err);
            context.openalertbox("error", "Something went wrong");
        }
        finally {
            setloading(false);
        }
    }

    async function handleRemoveAvatar(e) {
        try {
            setloading(true);

            if (context?.userdata?.avatar) {
                const response = await deleteAvatar();

                if (response.error) {
                    context.openalertbox("error", response.message);
                    return
                } else {
                    context.openalertbox("success", "Avatar removed successfully");
                    context.setuserdata(prev => ({
                        ...prev,
                        avatar: response.data?.avatar
                    }));
                    return;
                }
            } else {
                context.openalertbox("error", "no image to remove");
                return;
            }
        } catch (err) {
            console.error("Remove error:", err);
            context.openalertbox("error", "Something went wrong");
        }
        finally {
            setloading(false);
        }
    }

    const logout = async () => {
        const response = await fetchdatafromapi("/user/logout");

        if (response.error === true) {
            context.openalertbox("error", response.message);
        } else {
            navigate('/')
            localStorage.removeItem("userEmail")
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshtoken")

            context.openalertbox("success", response.message);
            context.setisloggedin(false)
        }
    }

    return (
        <>
            <div className="w-full overflow-hidden bg-white rounded-2xl shadow-md sticky top-[10px] border border-gray-200">
                {/* Avatar + User Info */}
                <div className="flex items-center flex-col justify-center py-8 px-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center justify-center w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                        {/* Avatar Image */}
                        {
                            loading === true ? <CircularProgress color="inherit" /> :
                                <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden cursor-pointer flex items-center justify-center mx-auto">
                                    <img
                                        src={context?.userdata?.avatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
                                        {/* Upload area */}
                                        <div className="flex-1 flex items-center justify-center relative">
                                            <BsUpload className="text-white text-2xl" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                onChange={handlechange}
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>

                                        {/* Remove button area */}
                                        <div className="bg-black/60 text-center cursor-pointer py-1">
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="text-white text-xs hover:text-red-400 cursor-pointer flex items-center justify-center gap-1 !w-full !text-[13px]"
                                            >
                                                <FaUserLargeSlash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>

                    <h3 className="text-[18px] capitalize font-semibold mt-4">
                        {context?.userdata?.name}
                    </h3>
                    <h3 className="text-[13px] w-[95%] m-auto font-medium pt-1 text-center break-words">
                        {context?.userdata?.email}
                    </h3>
                </div>

                {/* Sidebar Links */}
                <ul className="list-none h-full bg-[#f9f9f9] pt-3 myaccounttabs">
                    <li className="w-full list-none">
                        <NavLink
                            exact={true}
                            to="/myaccount"
                            activeClassName="isActive">
                            <Button className="!flex !items-center !justify-start gap-4 !px-5 !py-3 !text-gray-700 hover:!bg-blue-100 hover:!text-blue-600 capitalize !w-full text-[15px] transition-colors">
                                <IoPersonOutline className="text-[20px]" /> My Profile
                            </Button>
                        </NavLink>
                    </li>
                    {/* <li className="w-full list-none">
                        <NavLink
                            exact={true}
                            to="/mylist"
                            activeClassName="isActive">
                            <Button className="!flex !items-center !justify-start gap-4 !px-5 !py-3 !text-gray-700 hover:!bg-blue-100 hover:!text-blue-600 capitalize !w-full text-[15px] transition-colors">
                                <IoIosHeartEmpty className="text-[20px]" /> My List
                            </Button>
                        </NavLink>
                    </li>
                    <li className="w-full list-none">
                        <NavLink
                            exact={true}
                            to="/myorders"
                            activeClassName="isActive">
                            <Button className="!flex !items-center !justify-start gap-4 !px-5 !py-3 !text-gray-700 hover:!bg-blue-100 hover:!text-blue-600 capitalize !w-full text-[15px] transition-colors">
                                <IoBagCheckOutline className="text-[20px]" /> My Orders
                            </Button>
                        </NavLink>
                    </li> */}
                    <li className="w-full list-none border-t border-gray-200 mt-2">
                        <Button
                            className="!flex !items-center !justify-start gap-4 !px-5 !py-3 !text-red-600 hover:!bg-red-100 capitalize !w-full text-[15px] transition-colors"
                            onClick={logout}
                        >
                            <SlLogout className="text-[20px]" /> Logout
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AccountSidebar;
