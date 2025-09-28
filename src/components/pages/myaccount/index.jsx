import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Mycontext } from '../../../App';
import AccountSidebar from '../../accountsidebar';
import { deleteaddress, putcurrentaddress, putdataPublic } from '../../../../utils/api';
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";



function MyAccount() {

    const navigate = useNavigate();

    const [openIndex, setOpenIndex] = useState(null);

    const toggleMenu = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };


    const [formfields, setformfields] = useState({
        name: "",
        email: "",
        password: "",
        nickname: "",
        mobile: "",
        confirmpassword: "",
        oldpassword: ""
    });

    const [changepass, setchangepass] = useState(false)
    const context = useContext(Mycontext)
    const { userdata, setuserdata } = useContext(Mycontext);

    const [loading, setloading] = useState(false);

    const hangleinputchange = (e) => {
        const { name, value } = e.target
        setformfields(() => ({
            ...formfields,
            [name]: value
        }));
    };


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handlechange(e, addr) {

        if (e.target.checked) {
            try {

                const response = await putcurrentaddress(`/address/selected/${addr._id}`);

                if (response?.error) {
                    context.openalertbox("error", response.message);
                } else {
                    context.openalertbox("success", response.message);
                    context.fetchuseraddress(); // refresh addresses
                }
            } catch (err) {
                console.error(err);
                context.openalertbox("error", "Something went wrong");
            }
        }

    }

    async function handleDelete(addrId) {
        try {
            const response = await deleteaddress(`/address/deleteaddress/${addrId}`)
            if (response?.error) {
                context.openalertbox("error", response.message);
            } else {
                context.openalertbox("success", "Address deleted successfully");
                context.fetchuseraddress(); // refresh list
            }
        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        }
    }

    async function handlesubmit(e) {
        e.preventDefault();
        setloading(true);


        try {

            if (formfields.oldpassword || formfields.password || formfields.confirmpassword) {
                if (formfields.oldpassword && formfields.password && formfields.confirmpassword) {
                    if (formfields.password !== formfields.confirmpassword) {
                        context.openalertbox("error", "new Password and Confirm Password Should be same");
                        setformfields({
                            name: "",
                            email: "",
                            password: "",
                            nickname: "",
                            mobile: "",
                            confirmpassword: "",
                            oldpassword: ""
                        })
                        return;
                    }

                } else {
                    context.openalertbox("error", "Fill all the fields to  reset password");
                    setformfields({
                        name: "",
                        email: "",
                        password: "",
                        nickname: "",
                        mobile: "",
                        confirmpassword: "",
                        oldpassword: ""
                    })
                    return;
                }
            }

            const response = await putdataPublic("/user/updateprofile", formfields);

            await delay(1000);

            if (response?.error) {
                if (response?.message === "User not verified check email and verify OTP") {
                    localStorage.setItem("userEmail", formfields.email);
                    context.openalertbox("error", response?.message);
                    navigate("/verifyaccount");
                    return;
                }
                context.openalertbox("error", response.message);
                setformfields({
                    name: "",
                    email: "",
                    password: "",
                    nickname: "",
                    mobile: "",
                    confirmpassword: "",
                    oldpassword: ""
                });
                return;
            } else {
                if (response?.message === "Profile Updated! and Password or Email resetted Check your Email for the OTP") {
                    if (formfields.email) {
                        localStorage.setItem("userEmail", formfields.email);
                    }
                    const profupdatestatus = true;
                    localStorage.setItem("profupdate", profupdatestatus);
                    navigate("/verifyaccount");
                    context.openalertbox("success", response?.message);
                    return;
                } else {
                    context.fetchUserData();
                    context.openalertbox("success", response?.message);
                }

                setuserdata(prev => ({
                    ...prev,
                    ...formfields
                }))

                // ✅ Reset fields back to empty
                setformfields({
                    name: "",
                    email: "",
                    password: "",
                    nickname: "",
                    mobile: "",
                    confirmpassword: "",
                    oldpassword: ""
                });


            }
        } catch (err) {
            console.error(err);
            context.openalertbox("error", "Something went wrong");
        } finally {
            setloading(false);
        }
    }


    return (
        <section>
            <div className="container flex gap-8">
                <div className="w-[20%] bg-[#E5E5E5] rounded-lg flex sticky top-30 h-fit">
                    <AccountSidebar />
                </div>
                <div className="w-[80%] bg-white rounded-lg my-10 flex flex-col items-center px-4 py-7">

                    {/* ✅ User Details Section */}
                    <div className="w-full bg-[#A9A8A8] mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-3">User Details</h3>
                        <p><b>Email:</b> {userdata?.email || "—"}</p>
                        <p><b>Name:</b> {userdata?.name || "—"}</p>
                        <p><b>Nickname:</b> {userdata?.nickname || "—"}</p>
                        <p><b>Personal Contact:</b> {userdata?.mobile || "—"}</p>
                    </div>
                    {Array.isArray(context?.useraddress) && context.useraddress.some(addr => addr.selected) && (
                        <div className="w-full bg-[#A9A8A8] mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold mb-3">Current Address</h3>
                            {context.useraddress
                                .filter(addr => addr.selected)
                                .map(addr => (
                                    <span
                                        key={addr._id}
                                        className="font-medium text-green-800"
                                    >
                                        {addr.address} — {addr.city}
                                    </span>
                                ))}
                        </div>
                    )}

                    <div className="w-full h-[250px] overflow-y-scroll scroll-hide bg-gray-50 mb-8 p-4 border border-gray-300 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Address Details</h3>
                        {Array.isArray(context.useraddress) && context.useraddress.length > 0 ? (
                            context.useraddress.map((addr, idx) => (
                                <div
                                    key={addr._id}
                                    className={`mb-3 border rounded-md ${addr.selected ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}`}
                                >
                                    {/* Header Row */}
                                    <div
                                        className={`flex items-center justify-between p-2 cursor-pointer ${addr.selected ? "bg-green-100 hover:bg-green-200" : "bg-blue-100 hover:bg-blue-200"}`}
                                    >
                                        <div
                                            className="flex items-center gap-2 flex-1"
                                            onClick={() => toggleMenu(idx)}
                                        >
                                            {/* ✅ Checkbox to select current address */}
                                            <input
                                                type="checkbox"
                                                checked={addr.selected}
                                                onChange={(e) => handlechange(e, addr)}
                                                className="w-5 h-5 cursor-pointer accent-green-600"
                                            />
                                            <span
                                                className={`font-medium ${addr.selected ? "text-green-800" : "text-gray-700 hover:text-red-400"}`}
                                            >
                                                {addr.address} — {addr.city}
                                            </span>
                                        </div>

                                        {/* Right side controls */}
                                        <div className="flex items-center gap-3">
                                            {/* Delete Icon */}
                                            <FaTrash
                                                className="text-black cursor-pointer hover:text-red-700"
                                                onClick={() => handleDelete(addr._id)}
                                            />
                                            {/* Expand/Collapse */}
                                            {openIndex === idx ? <FaChevronUp onClick={() => toggleMenu(idx)} /> : <FaChevronDown onClick={() => toggleMenu(idx)} />}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    {openIndex === idx && (
                                        <div
                                            className={`px-3 pb-3 text-sm ${addr.selected ? "bg-green-50 text-green-700" : "bg-blue-50 text-gray-600"}`}
                                        >
                                            <p><b>Address line 1:</b> {addr.address}</p>
                                            <p><b>City:</b> {addr.city}</p>
                                            <p><b>State:</b> {addr.state}</p>
                                            <p><b>Country:</b> {addr.country}</p>
                                            <p><b>Delivery Contact:</b> {addr.mobile}</p>
                                            <p><b>Status:</b> {addr.status ? "Active" : "Inactive"}</p>
                                            <p><b>PinCode:</b> {addr.pincode}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No addresses found.</p>
                        )}


                    </div>
                    <div className='w-full flex items-center justify-center justify-between border-b border-gray-300 pb-5 pt-2'>
                        <div className=' flex-col w-[50%] flex items-center justify-center'>

                            <h3 className="text-[20px] font-[600] pb-1 flex justify-start w-full">
                                Update Profile
                            </h3>
                            <h3 className="text-[14px] font-[400] italic  flex justify-start w-full text-gray-500">
                                Only Fill the fields yo want to update
                            </h3>
                        </div>
                        <div className="w-[50%] flex items-center justify-between">
                            <Button className="!w-[45%] !bg-white hover:!bg-blue-600 hover:!text-white !border !border-blue-600 !text-blue-600 !text-[14px]" onClick={() => {
                                setchangepass(!changepass)
                            }}>
                                Change Password
                            </Button>
                            <Button className="!w-[45%] !bg-white hover:!bg-blue-600 hover:!text-white !border !border-blue-600 !text-blue-600 !text-[14px]" onClick={() => { context.setopendialogue({ open: true, model: "Add Address" }) }}>
                                Add Address
                            </Button>
                        </div>

                    </div>

                    <form action="" className="w-full flex items-center flex-col">
                        <div className="w-full flex flex-col items-center pt-10 justify-between gap-4">
                            <TextField id="outlined-basic" name="email" value={formfields.email} label="Email" variant="outlined" className="w-full" onChange={hangleinputchange} />

                            <TextField id="outlined-basic" name="name" value={formfields.name} label="Full Name" variant="outlined" className="w-full" onChange={hangleinputchange} />
                        </div>

                        <div className="w-full flex items-center pt-10 justify-between gap-4">
                            <TextField id="outlined-basic" name="nickname" value={formfields.nickname} label="Nickname Name" variant="outlined" className="w-[50%]" onChange={hangleinputchange} />



                            <TextField id="outlined-basic" name="mobile" value={formfields.mobile} label="Phone Number" variant="outlined" className="w-[50%]" onChange={hangleinputchange} />
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex  items-center justify-evenly ${changepass ? "max-h-[100px] opacity-100 translate-y-5" : "max-h-0 opacity-0 -translate-y-5"
                                }`}
                        >
                            <TextField
                                name="oldpassword"
                                value={formfields.oldpassword}
                                label="Old Password"
                                variant="outlined"
                                className="w-[32%] mt-4"
                                onChange={hangleinputchange}
                            />
                            <TextField
                                name="password"
                                value={formfields.password}
                                label="New Password"
                                variant="outlined"
                                className="w-[32%] mt-4"
                                onChange={hangleinputchange}
                            />
                            <TextField
                                name="confirmpassword"
                                value={formfields.confirmpassword}
                                label="Confirm Password"
                                variant="outlined"
                                className="w-[32%] mt-4"
                                onChange={hangleinputchange}
                            />
                        </div>

                        <div className={`w-full flex items-center justify-evenly ${changepass ? 'translate-y-10' : 'translate-y-0 mt-4'} transition-all duration-500`}>
                            <Button className="!bg-blue-600 hover:!bg-blue-500 !border !border-blue-600 !text-white !text-[14px] !w-[45%] !text-[18px]" onClick={handlesubmit}>
                                {loading === true ? <CircularProgress color='inherit' /> : "Save"}
                            </Button>
                            <Button className="!bg-white hover:!bg-blue-600 hover:!text-white !border !border-blue-600 !text-blue-600 !w-[45%] !text-[18px]" onClick={() => {
                                setformfields({
                                    name: "",
                                    email: "",
                                    password: "",
                                    nickname: "",
                                    mobile: "",
                                    confirmpassword: "",
                                    oldpassword: ""
                                });
                            }}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default MyAccount;
