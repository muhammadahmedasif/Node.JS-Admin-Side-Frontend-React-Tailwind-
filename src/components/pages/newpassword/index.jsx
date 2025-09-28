import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { useContext, useState } from "react";
import { Mycontext } from "../../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { putdataPublic } from "../../../../utils/api";

function NewPassword() {

    const context = useContext(Mycontext);
    const navigate = useNavigate();

    const [showpass, setshowpass] = useState(false)
    const [showpassconfirm, setshowpassconfirm] = useState(false)
    const [loading, setloading] = useState(false);

    const [formfields, setformfields] = useState({
        password: "",
        confirmpassword: "",
    });

    function handleinputchange(e) {
        const { name, value } = e.target;
        setformfields((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handlesubmit(e) {
        e.preventDefault();
        setloading(true);

        try {

            const response = await putdataPublic("/user/newpassword", {
                email: localStorage.getItem("userEmail"),
                password: formfields.password,
                confirmpassword: formfields.confirmpassword,
            });

            if (response?.error) {
                setformfields({
                    password: "",
                    confirmpassword: "",
                });
                context.openalertbox("error", response.message);
                return;
            }

            // ✅ success
            setformfields({
                password: "",
                confirmpassword: "",
            });
            context.openalertbox("success", response.message);
            localStorage.removeItem("userEmail")
            navigate('/login');
        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        } finally {
            setloading(false);
        }
    }

    const validatevalue = Object.values(formfields).every((el) => el);
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
                            <img src="/images/logo.svg" alt="Logo" className="w-full" />
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
                            Change your password from here.
                        </h3>
                    </div>
                    <form onSubmit={handlesubmit} className="mt-10 py-5 flex flex-col gap-4 w-full">
                        {/* Email */}
                        <label
                            htmlFor="newpassword"
                            className="block text-[17px] text-gray-500 font-[500]"
                        >
                            New Password
                        </label>
                        <div className="relative w-full">
                            <input
                                name='password'
                                value={formfields.password}
                                type={showpass === true ? 'text' : 'password'}
                                id="newpassword"
                                className={`block text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md pr-10 transition-all duration-500`}
                                onChange={handleinputchange}
                                disabled={loading}
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

                        {/* Password */}
                        <label
                            htmlFor="confirmpassword"
                            className="block text-[17px] text-gray-500 font-[500]"
                        >
                            Confirm Password
                        </label>
                        <div className="relative w-full">
                            <input
                                name='confirmpassword'
                                value={formfields.confirmpassword}
                                type={showpassconfirm === true ? 'text' : 'password'}
                                id="confirmpassword"
                                className={`block text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md pr-10 transition-all duration-500`}
                                onChange={handleinputchange}
                                disabled={loading}
                            />
                            {/* Eye Icons */}
                            <Button
                                className={`!text-gray-500 !rounded-full !min-w-[30px] !text-[20px] !absolute right-2 top-1/2 -translate-y-1/2 ${showpassconfirm === true ? 'opacity-100' : 'opacity-0'} !transition-all !duration-500`} onClick={() => { setshowpassconfirm(!showpassconfirm) }}>
                                <GoEye />
                            </Button>
                            <Button
                                className={`!text-gray-500 !rounded-full !min-w-[30px] !text-[20px] !absolute right-2 top-1/2 -translate-y-1/2 ${showpassconfirm === false ? 'opacity-100' : 'opacity-0'} !transition-all !duration-500`} onClick={() => { setshowpassconfirm(!showpassconfirm) }}>
                                <GoEyeClosed />
                            </Button>
                        </div>
                        <Button
                            disabled={!validatevalue || loading}
                            type='submit'
                            className={`!w-full h-13 ${loading ? "!bg-[rgba(207,202,188,0.61)] !text-black !cursor-not-allowed" : "!bg-blue-600 !font-[600] !text-white"} hover:ring-2 hover:ring-gray-300 
                        hover:ring-offset-2 hover:ring-offset-white hover:scale-101 hover:!bg-blue-700`}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm"}
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default NewPassword;
