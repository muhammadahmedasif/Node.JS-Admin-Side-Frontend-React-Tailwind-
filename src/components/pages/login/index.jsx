import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { useContext, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Mycontext } from "../../../App";
import { postdata } from "../../../../utils/api";


function Login() {
    const [showpass, setshowpass] = useState(false)
    const context = useContext(Mycontext)
    const [loading, setloading] = useState(false);
    const [formfields, setformfields] = useState({
        email: '',
        password: ''
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
 function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function handlesubmit(e) {
        e.preventDefault();
        setloading(true);

        try {

            if (!formfields.email) {
                context.openalertbox("error", "Incomplete credentials! Email Missing");
                return false;
            } else if (!formfields.password) {
                context.openalertbox("error", "Provide Password!");
                return false;
            } else {

                const response = await postdata("/user/login", formfields);

                await delay(2000);

                if (response?.error) {
                    setformfields({
                        email: "",
                        password: "",
                    });
                    context.openalertbox("error", response.message);
                    return false
                } else {
                    localStorage.setItem("userEmail", formfields.email)
                    localStorage.setItem("accessToken", response.data.accesstoken);
                    localStorage.setItem("refreshtoken", response.data.refreshtoken);

                    nevigate('/')
                    setformfields({
                        email: "",
                        password: "",
                    });
                    console.log(response)
                    context.openalertbox("success", response.message);
                    context.fetchUserData();
                }
            }



        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        }
        finally {
            setloading(false); // ✅ always runs
        }

    }

    const forgotpassword = async (e) => {
        e.preventDefault();
        if (loading) return; // prevent double click

        setloading(true);

        await delay();
            setloading(false);
            nevigate('/forgetpassword')
    };


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

                <div className="m-auto my-10 w-[50%] bg-white p-6 rounded-xl shadow-lg z-1">
                    <div className="flex items-enter justify-center">
                        <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
                    </div>
                    <div className="flex flex-col leading-12">
                        <h3 className="font-[700] text-center text-[37px]">
                            Welcome Back!
                        </h3>
                        <h3 className="font-[700] text-center text-[37px]">
                            Sign in with your credentials.
                        </h3>
                    </div>
                    <div className="flex items-center justify-between mt-15">

                        <Button className="!flex !min-w-[280px] !items-center !capitalize !rounded-lg !border !border-gray-300 !justify-center !text-14px !font-[700] hover:!border hover:!border-blue-500 !text-gray-600 gap-2">
                            <FcGoogle className="!text-[25px]" />
                            Signin with Google
                        </Button>
                        <Button className="!flex !min-w-[280px] !items-center !capitalize !rounded-lg !border !border-gray-300 !justify-center !text-14px hover:!border hover:!border-blue-500 !font-[700] !text-gray-600 gap-3">
                            <MdFacebook className="!text-[25px] text-gray-600" />
                            Signin with Facebook
                        </Button>
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-[15px] text-gray-600 font-[500]">
                            Or, Sign in with your email
                        </span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    <form onSubmit={handlesubmit} className="mt-10 py-5 flex flex-col gap-4 w-full">
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
                            value={formfields.email}
                            onChange={handleonchange}
                            placeholder="Enter your Email"
                            className="block text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                        />

                        {/* Password */}
                        <label
                            htmlFor="password"
                            className="block text-[17px] text-gray-500 font-[500]"
                        >
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                            name="password"
                            value={formfields.password}
                                type={showpass === true ? 'text' : 'password'}
                                id="password"
                                onChange={handleonchange}
                                className={`block text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md pr-10 transition-all duration-500`}
                            />
                            {/* Eye Icons */}
                            <Button
                                className={`!text-gray-500 !rounded-full !min-w-[30px] !text-[20px] !absolute right-2 top-1/2 -translate-y-1/2 ${showpass === true ? 'opacity-100' : 'opacity-0'} !transition-all !duration-500`} onClick={() => { setshowpass(!showpass) }}>
                                <GoEye />
                            </Button>
                            <Button
                                className={`!text-gray-500 !rounded-full !min-w-[30px] !text-[20px] !absolute right-2 top-1/2 -translate-y-1/2 ${showpass === false ? 'opacity-100' : 'opacity-0'} !transition-all !duration-500`} onClick={() => { setshowpass(!showpass) }}>
                                <GoEyeClosed />
                            </Button>
                        </div>

                        <div className="flex items-center justify-between mt-7">
                            <div className="w-[50%] flex items-center">
                                <input type="checkbox" id="checkbox" className="w-5 h-5 accent-blue-600 hover:ring-2 hover:ring-gray-300 
                                hover:ring-offset-2 hover:ring-offset-white cursor-pointer"/>
                                <label htmlFor="checkbox" className="pl-1 font-[600] text-[13px] text-gray-600"> Remember Me</label>
                            </div>
                            <Link to={'/forgetpassword'} className="text-right text-gray-600 underline font-[600] text-[14px] hover:text-blue-500 hover:no-underline"  onClick={forgotpassword}>
                                Forgot Password?
                            </Link>
                        </div>

                         <Button type='submit' className={` ${loading === true ? "!bg-[rgba(207,202,188,0.61)} !cursor-not-allowed" : "!bg-blue-600 !text-white "} !font-[600] !rounded-md hover:ring-2 hover:ring-gray-300 
                        hover:ring-offset-2 hover:ring-offset-white hover:scale-101 hover:!bg-blue-700  h-13 !w-full`}>{
                            loading === true ?
                                <CircularProgress color='inherit' /> : "Sign in"
                        }</Button>
                    </form>

                    <h3 className="mt-5 flex text-gray-500 text-[16px] font-[500] items-center justify-center">
                        Don’t have an account?<Link to={'/signup'}>  <span className="font-[500] text-[16px] text-blue-400 cursor-pointer pl-1">Sign Up</span></Link>
                    </h3>

                </div>
            </section>
        </>
    );
}

export default Login;
