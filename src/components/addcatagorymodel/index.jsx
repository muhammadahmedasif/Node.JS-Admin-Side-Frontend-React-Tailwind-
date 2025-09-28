import { Button } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoCloudUploadSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { Mycontext } from "../../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


function AddCatagoryModel() {
    // Track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);

    const [preview, setPreview] = useState([]);

     const navigate = useNavigate();
    const context = useContext(Mycontext)
    // Store selected values for each dropdown
    const [selectedValues, setSelectedValues] = useState({
        category: ""
    });

    // Refs for each dropdown wrapper
    const dropdownRefs = useRef({});

    useEffect(() => {
        function handleClickOutside(event) {
            // Close dropdown if clicked outside
            if (
                openDropdown &&
                dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown].contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

    // update handleImageChange
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // convert FileList → array
        if (files.length > 0) {
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreview((prev) => [...prev, ...newPreviews]); // keep old + new
        }
    };

    // Reusable dropdown component
    const Dropdown = ({ id, label, placeholder, options }) => {
        return (
            <div
                className="w-full relative flex flex-col gap-1"
                ref={(el) => (dropdownRefs.current[id] = el)}
            >
                <label
                    htmlFor={id}
                    className="text-[15px] text-gray-600 font-[600]"
                >
                    {label}
                </label>

                <div className="w-full flex items-center border rounded-md border-gray-400 text-[14px] text-gray-600 font-[600] justify-between h-10 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-2 cursor-pointer mt-2" onClick={() => setOpenDropdown(openDropdown === id ? null : id)}>
                    <input
                        type="text"
                        id={id}
                        placeholder={placeholder}
                        value={selectedValues[id] || ""}
                        readOnly
                        className="w-full h-full focus:outline-none cursor-pointer"
                    />
                    <FaAngleDown
                        className={`${openDropdown === id ? "rotate-180" : ""
                            } transition-all duration-500`}
                    />
                </div>

                {openDropdown === id && (
                    <div className="absolute top-20 left-0 z-50 w-full border border-gray-400 rounded-md py-2 bg-white shadow-md">
                        {options.map((option) => (
                            <Button
                                key={option}
                                className="!w-full !px-2 !h-10 !flex !justify-start 
                !text-gray-700 !capitalize !text-[14px] !font-[500]"
                                onClick={() => {
                                    setSelectedValues((prev) => ({
                                        ...prev,
                                        [id]: option,
                                    }));
                                    setOpenDropdown(null); // close after select
                                }}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="w-full bg-[#f1f1f1]">
            <div className="flex items-center w-[95%] mx-auto justify-between px-4 mt-5 py-2 mb-4 rounded-xl ">
                <h3 className="text-[25px] text-black font-[700]">Create Catagory</h3>
                <Button className="!text-[17px] !px-7 !py-1 !bg-blue-500 !text-white hover:!bg-blue-700  !capitalize" onClick={() => { navigate("/"); context.setopendialogue({ open: false, model: "" }) }}>
                    <LuLayoutDashboard className="pr-1 text-[20px]" />
                    Dashboard
                </Button>
            </div>
            <div className="w-full justify-evenly items-center flex gap-5 py-3 shadow-md border-b border-gray-300 sticky top-0 bg-white/10 backdrop-blur-md z-50">
                {["Add Catagory", "Upload Images", "Upload Product"].map((section) => (
                    <Button
                        key={section}
                        onClick={() => {
                            const id = section.toLowerCase().replace(/\s+/g, ""); // summary → summary
                            const el = document.getElementById(id);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className="!px-4 !py-0 !bg-gray-300 !text-gray-600 !rounded-md hover:!bg-black !capitalize hover:!text-white"
                    >
                        {section}
                    </Button>
                ))}
            </div>
            <div className="w-[95%] rounded-xl px-4  bg-white scroll-hide overflow-y-auto  my-3 mx-auto">
                <div className="flex flex-col w-full gap-8 py-8">
                    {/* Summary Section */}
                    <div className="w-[70%] mx-auto flex flex-col items-center gap-6" id="addcatagory">
                        {/* Header Card */}
                        <div className="w-full text-center bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 shadow-sm rounded-full p-6">
                            <h3 className="text-[22px] font-[700] text-gray-800">Category & Sub Catagory</h3>
                            <p className="text-[15px] font-[400] text-gray-600 mt-2">
                                Select your product category and sub catagory from here
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="w-[40%]">
                            <img
                                src="/catagory.png"
                                alt="category"
                                className="w-full h-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full">
                        <div className="w-[50%] mx-auto">
                            <Dropdown
                                id="category"
                                label="Product Category"
                                placeholder="Select..."
                                options={["Electronics", "Gadgets", "Clothes"]}
                            />
                        </div>
                    </div>
                    <div className="w-full mt-3">
                        <div className="w-[50%] mx-auto">
                            <Dropdown
                                id="subcategory"
                                label="Product Sub Category"
                                placeholder="Select..."
                                options={["Women", "Men", "Kids","Boys", "Girls"]}
                            />
                        </div>
                    </div>
                </div>


                <div id='uploadimages' className="flex w-full gap-5 mt-10 py-5 border-gray-400 border-t border-dashed">
                    <div className="w-full flex flex-col gap-5 mt-10 py-5 border-gray-400 border-t border-dashed">
                        <div className="w-full flex flex-col gap-5">
                            <div className="w-full text-left">
                                <h3 className="text-[16px] font-[700]">
                                    Upload Catagory
                                </h3>
                                <h3 className="text-[14px] font-[400]">
                                    Upload your Catagory images here
                                </h3>
                            </div>
                            <div className="w-[20%] mx-auto">
                            <img
                            src="/imgupload.png"
                               
                                alt="category"
                                className="w-full h-auto object-contain rounded-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        </div>
                        <div className="w-full flex items-center flex-col justify-center">
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer w-full text-gray-500 font-medium flex flex-col items-center"
                            >
                                <div className="w-full border border-dashed border-gray-400 overflow-hidden flex items-center justify-center rounded-2xl bg-[#f1f1f1] p-5 gap-4">

                                    <IoCloudUploadSharp className="text-[30px]" />
                                    {/* File Input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple   // allow multiple images
                                        onChange={handleImageChange}
                                        className="hidden w-full"
                                        id="fileInput"
                                    />

                                    {/* Label acts as button */}

                                    <span className="text-gray-500 font-medium">
                                        Drop or select file
                                    </span>
                                </div>
                            </label>
                            {/* Preview Section */}
                            {preview.length > 0 && (
                                <div className="w-full overflow-y-auto h-[500px] my-5">
                                    <div className="w-full flex flex-col gap-3">
                                        {preview.map((img, index) => (
                                            <div
                                                key={index}
                                                className="w-full h-[150px] overflow-hidden rounded-xl border border-gray-300 relative flex items-center justify-center"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Preview ${index + 1}`}
                                                    className="max-w-full max-h-full object-contain"
                                                />

                                                <Button
                                                    onClick={() =>
                                                        setPreview((prev) => prev.filter((_, i) => i !== index))
                                                    }
                                                    className="!absolute !top-2 !right-2 !bg-white !rounded-full !p-1 !min-w-[30px] !text-[20px] !shadow-md hover:!bg-gray-200"
                                                >
                                                    <AiOutlineClose className="text-black" size={20} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>


                </div>

                <div className="border-t border-gray-300 p-5">

                    <Button id='uploadproduct' className="!w-full !text-[20px] !rounded-xl !capitalize !text-white !bg-blue-500 hover:!bg-blue-700">
                        Upload Catagory
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default AddCatagoryModel;
