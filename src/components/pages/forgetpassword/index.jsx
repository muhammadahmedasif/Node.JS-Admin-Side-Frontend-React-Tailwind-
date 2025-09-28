import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { postdata } from "../../../../utils/api";
import { useContext, useState } from "react";
import { Mycontext } from "../../../App";
import CircularProgress from '@mui/material/CircularProgress';

function ForgetPassword() {

    const context = useContext(Mycontext);

    const [loading, setloading] = useState(false);
    const [formfields, setformfields] = useState({
        email: '',
    });
    const nevigate = useNavigate();

    async function handleonchange(e) {

        const { name, value } = e.target;
        setformfields(() => {

            return {
                ...formfields,
                [name]: value
            }
        })
    }

    const forgotpassword = async (e) => {
        e.preventDefault();
        if (loading) return; // prevent double click

        setloading(true);
        const forgetpasswordstatus = true;

        if (!formfields.email) {
            context.openalertbox("error", "Provide Email for OTP Verification");
            setloading(false);
            return;
        }

        try {
            const response = await postdata("/user/forgetpassword", formfields);

            if (response?.error) {
                setformfields({
                    email: "",
                });
                context.openalertbox("error", response.message);
            } else {
                localStorage.setItem("userEmail", formfields.email);
                localStorage.setItem("forgetpassword", forgetpasswordstatus);
                nevigate('/verifyaccount');
                context.openalertbox("success", `OTP Sent! to ${formfields.email}`);
            }
        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <section className="bg-[#f1f1f1] pb-10 h-full fixed top-0 left-0 w-full relative">
                {/* Background Image */}
                {/* Header */}
                <header className="flex pt-2 items-center top-0 z-50  overflow-hidden rounded-2xl justify-between py-2 px-10 z-50">

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

                <div className="m-auto my-10 w-[50%] bg-white p-6 rounded-xl shadow-lg z-1">
                    <div className="flex items-enter justify-center">
                        <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
                    </div>
                    <div className="flex flex-col leading-12">
                        <h3 className="font-[700] text-center text-[37px]">
                            Having trouble to sign in?
                        </h3>
                        <h3 className="font-[700] text-center text-[37px]">
                            Reset your password.
                        </h3>
                    </div>
                    <form action="" className="mt-10 py-5 flex flex-col gap-4 w-full">
                        {/* Email */}
                        <label
                            htmlFor="email"
                            className="block text-[17px] text-gray-500 font-[500]"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            onChange={handleonchange}
                            placeholder="Enter your Email"
                            className="block text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                        />

                        <Button className={` ${loading === true ? "!bg-[rgba(207,202,188,0.61)} !cursor-not-allowed" : "!bg-blue-600 !text-white "} !font-[600] !rounded-md hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 hover:ring-offset-white hover:scale-101 hover:!bg-blue-700  h-13 !w-full`} onClick={forgotpassword}>{
                            loading === true ?
                                <CircularProgress color='inherit' /> : "Forget Password"
                        }</Button>
                    </form>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center mt-10">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="pr-1 text-[15px] text-gray-600 font-[500]">
                                Don’t want to reset?
                            </span>
                            <Link to={'/login'} className="text-right text-gray-700 text-[16px] underline font-[600] text-[14px] hover:text-blue-500 hover:no-underline">
                                Sign In
                            </Link>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgetPassword;
