import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { useContext, useState } from "react";
import { Mycontext } from "../../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { postdataPublic } from "../../../../utils/api";
import TextField from '@mui/material/TextField';

function Signup() {

    const context = useContext(Mycontext);

    const [showpassword, setshowpassword] = useState(false);

    const [loading, setloading] = useState(false);

    const navigate = useNavigate()

    const [formfields, setformfields] = useState({
        name: "",
        email: "",
        password: "",
    });

    const hangleinputchange = (e) => {
        const { name, value } = e.target
        setformfields(() => {

            return {
                ...formfields,
                [name]: value
            }
        })
    }

    const validatevalue = Object.values(formfields).every(el => el);

    async function handlesubmit(e) {
        e.preventDefault();
        setloading(true);

        try {

            const response = await postdataPublic("/user/register", formfields);

            console.log("response on req", response)

            if (response?.error) {
                setformfields({
                    name: "",
                    email: "",
                    password: "",
                });
                context.openalertbox("error", response.message);
            } else {
                localStorage.setItem("userEmail", formfields.email)
                
                navigate('/verifyaccount')
                setformfields({
                    name: "",
                    email: "",
                    password: "",
                });

                context.openalertbox("success", response.message);
            }


        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        }
        finally {
            setloading(false); // ✅ always runs
        }

    }



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

                {/* Centered Box */}
                <div className="m-auto my-10 w-[50%] bg-white p-6 rounded-xl shadow-lg z-1">
                    <div className="flex items-enter justify-center">
                        <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg" />
                    </div>
                    <h3 className="font-[700] text-center text-[37px] mt-10">
                        Join us today! Get special benefits and stay up-to-date.
                    </h3>
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
                            Or, Sign up with your email
                        </span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    <form onSubmit={handlesubmit} className='w-full flex items-center gap-5 flex-col pt-5'>

                        <TextField id="outlined-basic" name="name" disabled={loading === true ? true : false} value={formfields.name} type='text' label="Full Name" variant="outlined" className='w-[95%] m-auto' onChange={hangleinputchange} />

                        <TextField id="outlined-basic" name="email" disabled={loading === true ? true : false} value={formfields.email} type='email' label="Email" variant="outlined" className='w-[95%] m-auto ' onChange={hangleinputchange} />

                        <div className='w-full relative flex items-center justify-center'>

                            <TextField id="outlined-basic" name="password" disabled={loading === true ? true : false} value={formfields.password} type={`${showpassword === true ? 'text' : 'password'}`} label="Password" variant="outlined" className='w-[95%] m-auto' onChange={hangleinputchange} />

                            <Button className={`!absolute !w-[40px] h-[40px] !text-black  !rounded-full !text-[18px] !min-w-[40px] ${showpassword === false ? 'opacity-100 z-50' : 'opacity-0 z-0'} right-7 top-1/2 -translate-y-1/2`} onClick={() => setshowpassword(!showpassword)}>

                                <GoEye />

                            </Button>

                            <Button className={`!absolute !w-[40px] h-[40px] !text-black  !rounded-full !text-[18px] !min-w-[40px] ${showpassword === true ? 'opacity-100 z-50' : 'opacity-0 z-0'} right-7 top-1/2 -translate-y-1/2`} onClick={() => setshowpassword(!showpassword)}>

                                <GoEyeClosed />

                            </Button>

                        </div>

                        <Button disabled={!validatevalue} type='submit' className={` ${loading === true ? "!bg-[rgba(207,202,188,0.61)} !cursor-not-allowed" : "!bg-blue-600 !text-white "} !font-[600] !rounded-md hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 hover:ring-offset-white hover:scale-101 hover:!bg-blue-700  h-13 !w-full`}>{
                                loading === true ?
                                    <CircularProgress color='inherit' /> : "Register"
                            }</Button>
                    </form>


                    <h3 className="mt-5 flex text-gray-500 text-[16px] font-[500] items-center justify-center">
                        Already have an account?<Link to={'/login'}> <span className="font-[500] cursor-pointer text-[16px] text-blue-400 cursor-pointer pl-1">Sign in</span></Link>
                    </h3>

                </div>
            </section>
        </>
    );
}

export default Signup;
