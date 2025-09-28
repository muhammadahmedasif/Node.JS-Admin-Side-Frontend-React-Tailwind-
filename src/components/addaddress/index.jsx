import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { Mycontext } from "../../App";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { postdata } from "../../../utils/api";

function Addaddress() {
    const [loading, setloading] = useState(false);
    const { setuseraddress } = useContext(Mycontext);
    const [formfields, setformfields] = useState({
        address: '',
        pincode: '',
        city: '',
        country: '',
        mobile: '',
        status: '',
        state: '',
    });
    const navigate = useNavigate();
    const context = useContext(Mycontext)

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

            if (!formfields.address) {
                context.openalertbox("error", "Incomplete credentials! Address Missing");
                return false;
            } else if (!formfields.city) {
                context.openalertbox("error", "Provide city!");
                return false;
            }
            else if (!formfields.state) {
                context.openalertbox("error", "Provide state!");
                return false;
            }
            else if (!formfields.country) {
                context.openalertbox("error", "Provide country!");
                return false;
            }
            else if (!formfields.mobile) {
                context.openalertbox("error", "Provide mobile!");
                return false;
            }
            else {

                const response = await postdata("/address/addaddress", formfields);

                await delay(2000);

                if (response?.error) {
                    setformfields({
                        email: "",
                        password: "",
                    });
                    context.openalertbox("error", response.message);
                    return false
                } else {
                    context.setopendialogue({ open: false, model: "" })
                    setformfields({
                        address: '',
                        pincode: '',
                        city: '',
                        country: '',
                        mobile: '',
                        status: '',
                        state: '',
                    });
                    console.log(response)
                    context.openalertbox("success", response.message);
                    context.fetchuseraddress();
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

    return (
        <div className="w-full bg-[#f1f1f1]">
            <div className="flex items-center w-[95%] mx-auto justify-between px-4 mt-5 py-2 mb-4 rounded-xl ">
                <h3 className="text-[25px] text-black font-[700]">Add Address</h3>
                <Button className="!text-[17px] !px-7 !py-1 !bg-blue-500 !text-white hover:!bg-blue-700  !capitalize" onClick={() => {context.setopendialogue({ open: false, model: "" }) }}>
                    <VscAccount className="pr-1 text-[20px]" />
                    My Profile
                </Button>
            </div>
            <div className="w-[95%] rounded-xl px-4 bg-white overflow-y-auto  my-3 mx-auto">
                <div className="flex  w-full gap-8 py-8">
                    {/* Summary Section */}
                    <div className="w-full mx-auto flex flex-col items-center gap-6" id="addcatagory">
                        {/* Header Card */}
                        <div className="w-full text-center bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 shadow-sm rounded-full p-6">
                            <h3 className="text-[22px] font-[700] text-gray-800">Address Details</h3>
                            <p className="text-[15px] font-[400] text-gray-600 mt-2">
                                Add Your Address Details here
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="w-[40%]">
                            <img
                                src="/address.png"
                                alt="category"
                                className="w-full h-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handlesubmit} className="mt-10 py-5 flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="addressLine1"
                                className="text-[17px] text-gray-500 font-[500]"
                            >
                                Address Line 1
                            </label>
                            <input
                                name="address"
                                value={formfields.address}
                                onChange={handleonchange}
                                type="text"
                                id="addressLine1"
                                placeholder="Enter Address Line 1"
                                className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Address Line 1 */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="state"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    State
                                </label>
                                <input
                                    name="state"
                                    value={formfields.state}
                                    onChange={handleonchange}
                                    type="text"
                                    id="state"
                                    placeholder="Enter State"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />
                            </div>

                            {/* City */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="city"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    City
                                </label>
                                <input
                                    name="city"
                                    value={formfields.city}
                                    onChange={handleonchange}
                                    type="text"
                                    id="city"
                                    placeholder="Enter City"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            {/* Country */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="country"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    Country
                                </label>
                                <input
                                    name="country"
                                    value={formfields.country}
                                    onChange={handleonchange}
                                    type="text"
                                    id="country"
                                    placeholder="Enter Country"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="mobile"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    Delivery Contact
                                </label>
                                <input
                                    name="mobile"
                                    value={formfields.mobile}
                                    onChange={handleonchange}
                                    type="number"
                                    id="mobile"
                                    placeholder="Enter Mobile"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Pincode */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="pincode"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    Pincode
                                </label>
                                <input
                                    name="pincode"
                                    type="number"
                                    onChange={handleonchange}
                                    id="pincode"
                                    placeholder="Enter Pincode"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />
                            </div>

                            {/* Status Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="status"
                                    className="text-[17px] text-gray-500 font-[500]"
                                >
                                    Status
                                </label>
                                <input
                                    name="status"
                                    type="boolean"
                                    onChange={handleonchange}
                                    id="status"
                                    placeholder="Enter status"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                />

                                {/* <select
                                    name="status"
                                    value={formfields.state}
                                    onChange={handleonchange}
                                    id="status"
                                    className="text-gray-500 font-[500] text-[14px] p-2 w-full border-2 border-gray-300 outline-blue-400 hover:border-blue-400 h-[50px] rounded-md"
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select> */}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className={` ${loading === true
                                ? "!bg-[rgba(207,202,188,0.61)] !cursor-not-allowed"
                                : "!bg-blue-600 !text-white "
                                } !font-[600] !rounded-md hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 hover:ring-offset-white hover:scale-101 hover:!bg-blue-700  h-13 !w-full`}>
                            {loading === true ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                "Add Address"
                            )}
                        </Button>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default Addaddress;
