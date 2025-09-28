import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { CgMenuLeftAlt } from "react-icons/cg";
import Badge from '@mui/material/Badge';
import { SlBell } from "react-icons/sl";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { VscAccount } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphDown } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { Mycontext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchdatafromapi } from "../../../utils/api";


function Header() {

    const context = useContext(Mycontext)
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {

        setAnchorEl(null);

        const response = await fetchdatafromapi("/user/logout");

        if (response.error === true) {
            context.openalertbox("error", response.message);
        } else {
            localStorage.removeItem("userEmail")
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshtoken")

            context.openalertbox("success", response.message);
            navigate('/')
            context.setisloggedin(false)
        }

    }
    return (
        <>
            <header
                className={`relative sticky top-0 z-50 w-full ${context.isopensidebar === false ? "px-5" : "pl-73 pr-5"
                    } h-auto py-2 flex items-center mt-2 justify-between
                    bg-gradient-to-r from-white/30 backdrop-blur-[1.5px] via-white/20 to-white/30
                    shadow-xl overflow-hidden rounded-2xl duration-600 `}
            >
                {/* Glass border overlay */}
                <div className="absolute inset-0 rounded-2xl border border-white/30
                [box-shadow:inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.2)] pointer-events-none">
                </div>

                <div className="col1 flex items-center justify-center overflow-hidden">
                    <Button className="!w-[35px] !h-[35px] !p-0 !min-w-[35px] !rounded-full !text-black" onClick={() => { context.setisopensidebar(!context.isopensidebar) }}>
                        <CgMenuLeftAlt className="text-[25px]" />
                    </Button>
                </div>
                <div className="col2 flex items-center gap-5">
                    <div>
                        <Button className="!w-[35px] !h-[35px] !p-0 !min-w-[35px] !rounded-full !text-black">
                            <Badge badgeContent={4} color="primary">
                                <SlBell className="text-[25px]" />
                            </Badge>
                        </Button>
                    </div>
                    {
                        context.isloggedin === true ? <Button className="!w-[35px] !h-[35px] !min-w-[35px] !p-0 !overflow-hidden !rounded-full !text-black !relative">
                            <img
                                src={context?.userdata?.avatar || "/images.png"}
                                alt="profile"
                                className="w-full h-full object-cover"
                                onClick={handleClick} />
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                className="!w-[240px]"
                            ><MenuItem
                                onClick={handleClose}
                                className="!bg-blue-400 !rounded-t-sm pt-1 !px-0 !cursor-default"
                            >
                                    <Button className="!cursor-default !text-white !flex !items-center gap-3">
                                        <div className="w-[35px] h-[35px] min-w-[35px] p-0 rounded-full overflow-hidden !cursor-default">
                                            <img
                                                src={context?.userdata?.avatar || "/images.png"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="text-[14px] font-[500] opacity-100 overflow-hidden leading-4">
                                            <p className="w-full text-left capitalize">
                                                {context?.userdata?.nickname || context?.userdata?.name}
                                            </p>
                                            <p className="text-[12px] text-left w-full font-[500] opacity-70 lowercase">
                                                {context?.userdata?.email || ""}
                                            </p>
                                        </div>
                                    </Button>
                                </MenuItem>

                                <Divider />
                                <MenuItem onClick={() => { navigate('/myaccount'); handleClose() }} className="bg-white !px-0">
                                    <Button className="!text-black !pl-5 !flex !items-center !justify-start !w-[230px] gap-4">
                                        <div className="w-[25px] h-[25px] min-w-[25px] p-0 overflow-hidden">
                                            <VscAccount className="w-full text-[18px] h-full" />
                                        </div>

                                        <h3 className="text-[15px] capitalize font-[500]">Profile</h3>
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className="bg-white !px-0">
                                    <Button className="!text-black !pl-5 !flex !items-center !justify-start !w-[230px] gap-4">
                                        <div className="w-[25px] h-[25px] min-w-[25px] p-0 overflow-hidden">
                                            <IoSettingsOutline className="w-full text-[18px] h-full" />
                                        </div>

                                        <h3 className="text-[15px] capitalize font-[500]">Account Setting</h3>
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className="bg-white !px-0">
                                    <Button className="!text-black !pl-5 !flex !items-center !justify-start !w-[230px] gap-4">
                                        <div className="w-[25px] h-[25px] min-w-[25px] p-0 overflow-hidden">
                                            <BsGraphDown className="w-full text-[18px] h-full" />
                                        </div>

                                        <h3 className="text-[15px] capitalize font-[500]">Activity Log</h3>
                                    </Button>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => { context.setisloggedin(false), handleClose() }} className="bg-white !px-0">
                                    <Button className="!text-black !pl-5 !flex !items-center !justify-start !w-[230px] gap-4">
                                        <div className="w-[25px] h-[25px] min-w-[25px] p-0 overflow-hidden">
                                            <SlLogout className="w-full text-[18px] h-full" />
                                        </div>

                                        <h3 className="text-[15px] capitalize font-[500]" onClick={logout}>Sign out</h3>
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </Button> :
                            <Button component={Link} to={'/login'} className="!text-white !bg-blue-500 !text-[12px] !w-[50px] !rounded-full">
                                SIGN IN
                            </Button>
                    }
                </div>
            </header>
        </>
    )

}

export default Header