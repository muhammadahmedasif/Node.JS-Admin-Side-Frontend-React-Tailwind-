import { Button } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { Mycontext } from "../../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

function AddSlider() {
    const [preview, setPreview] = useState([]);

    const context = useContext(Mycontext)

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // convert FileList → array
        if (files.length > 0) {
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreview((prev) => [...prev, ...newPreviews]); // keep old + new
        }
    };

    return (
        <div className="w-full bg-[#f1f1f1]">
            <div className="flex items-center w-[95%] mx-auto justify-between px-4 mt-5 py-2 mb-4 rounded-xl ">
                <h3 className="text-[25px] text-black font-[700]">Create Home Banner</h3>
                <Button className="!text-[17px] !px-7 !py-1 !bg-blue-500 !text-white hover:!bg-blue-700  !capitalize" onClick={() => {navigate("/"); context.setopendialogue({ open: false, model: "" })}}>
                   <LuLayoutDashboard className="pr-1 text-[20px]"/>
                    Dashboard
                </Button>
            </div>
            <div className="w-[95%] rounded-xl px-4  bg-white scroll-hide overflow-y-auto  my-3 mx-auto">
                <div className="w-full flex flex-col gap-5 mt-10 py-5 border-gray-400 border-t border-dashed">
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full text-left">
                            <h3 className="text-[16px] font-[700]">
                                Upload Home Slider
                            </h3>
                            <h3 className="text-[14px] font-[400]">
                                Upload your Home Slider image gallery here
                            </h3>
                        </div>
                        <div className="w-[20%] mx-auto flex justify-center overflow-hidden">
                            <div className="w-full overflow-hidden rounded-xl h-full">
                                <img
                                    src="/imgupload.png"
                                    alt="homeslider"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
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

                <div className="border-t border-gray-300 p-5">
                    <Button id='uploadproduct' className="!w-full !text-[20px] !rounded-xl !capitalize !text-white !bg-blue-500 hover:!bg-blue-700">
                        Upload Slider
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddSlider;
