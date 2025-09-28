import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { useState } from "react";
import OTPBox from "../../otpbox";

function VerifyAccount() {
    const [showpass, setshowpass] = useState(false)

    return (
        <>
            <section className="bg-[#f1f1f1] pb-10 h-full fixed top-0 left-0 w-full relative">
                {/* Background Image */}
                {/* Header */}
                <header className="flex sticky mt-2 items-center top-0 z-50 bg-gradient-to-r from-white/30 backdrop-blur-[1.5px] via-white/20 to-white/30 shadow-xl overflow-hidden rounded-2xl justify-between py-2 px-10 z-50">

                    <div className="absolute inset-0 rounded-2xl border border-white/30
                [box-shadow:inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.2)] pointer-events-none">
                    </div>

                    <div className="w-[15%]">
                        <Link to="/">
                            <img src="/logo.svg" alt="Logo" className="w-full" />
                        </Link>
                    </div>
                    <div className="flex gap-3">
                        <NavLink to="/login" end className={({ isActive }) => (isActive ? "active" : "")}>
                            <Button
                                className="!w-[85px] !items-center !p-1 !capitalize !rounded-full !text-[13px] !border !border-gray-400 !text-black flex gap-2"
                            >
                                <CiLogin strokeWidth={0.5} className="!text-[16px]" />
                                LOGIN
                            </Button>
                        </NavLink>

                        <NavLink to="/signup" end className={({ isActive }) => (isActive ? "active" : "")}>
                            <Button className="!w-[90px] !capitalize !items-center !p-1 !rounded-full !text-[13px] !border !border-gray-400 !text-black flex gap-2">
                                <VscAccount className="!text-[16px]" />
                                Signup
                            </Button>
                        </NavLink>
                    </div>
                </header>

                <div className="m-auto my-10 pt-20 pb-20 w-[50%] bg-white p-6 rounded-xl shadow-lg z-1">
                    <div className="flex items-enter justify-center">
                        <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
                    </div>
                    <div className="flex flex-col leading-12">
                        <h3 className="font-[700] text-center text-[37px]">
                           OTP Verification!
                        </h3>
                       
                        <div className="flex items-center justify-center w-full pt-20">
                                <OTPBox />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VerifyAccount
    ;
