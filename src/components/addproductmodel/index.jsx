import { Button } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoCloudUploadSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { Mycontext } from "../../App";

function AddProduct() {
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const [preview, setPreview] = useState([]);

  const context = useContext(Mycontext)
  // Store selected values for each dropdown
  const [selectedValues, setSelectedValues] = useState({
    category: "",
    featured: "",
    subcategory: "",
    weight: "",
    stock: "",
    size: "",
    rams: "",
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
        <h3 className="text-[25px] text-black font-[700]">Create Product</h3>
        <Button className="!text-[16px] !bg-blue-500 !text-white hover:!bg-blue-700 !py-[1px] !px-3 !capitalize" onClick={() => context.setopendialogue({ open: true, model: "Add Product" })}>
          <span className="!text-[20px] pr-2">
            +
          </span>
          Add Product
        </Button>
      </div>
      <div className="w-full justify-evenly items-center flex gap-5 py-3 shadow-md border-b border-gray-300 sticky top-0 bg-white/10 backdrop-blur-md z-50">
          {["Summary", "Upload Images", "Product Availability", "Pricing", "Upload Product"].map((section) => (
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
      <div className="flex w-full gap-5 py-5">
        {/* Summary Section */}
        <div className="leading-5 w-[30%] flex flex-col" id="summary" >
          <div className="w-full text-left">
            <h3 className="text-[16px] font-[700]">Summary</h3>
            <h3 className="text-[14px] font-[400]">
              Edit your product description and necessary information from here
            </h3>
          </div>

          <div className="w-full flex justify-center mt-5">
            <div className="w-[250px] overflow-hidden h-[300px]">
              <img
                src="/image.png"
                alt="Sunflower"
                className="w-full h-auto object-cover overflow-hidden rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-[70%]">
          <div className="w-full grid grid-cols-2 gap-10">
            {/* Title */}
            <div className="flex flex-col gap-3 items-start ">
              <label
                htmlFor="title"
                className="text-[15px] text-gray-600 font-[600]"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Product title"
                className="w-full border focus:outline-blue-500 hover:border hover:border-blue-500 rounded-md border-gray-400 block p-2 text-[14px] text-gray-600 font-[600] h-10"
              />

              {/* Category Dropdown */}
              <Dropdown
                id="category"
                label="Product Category"
                placeholder="Select..."
                options={["Electronics", "Gadgets", "Clothes"]}
              />
            </div>

            {/* Featured + Subcategory */}
            <div className="flex flex-col gap-3 items-start">
              <Dropdown
                id="featured"
                label="Is Featured?"
                placeholder="Select..."
                options={["Yes", "No"]}
              />

              <Dropdown
                id="subcategory"
                label="Subcategory"
                placeholder="Select..."
                options={["Men", "Women", "Kids", "Boys"]}
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full mt-5">
            <div className="flex flex-col py-2">
              <label
                htmlFor="desc"
                className="text-gray-700 font-medium"
              >
                Product Description
              </label>
              <div className="p-2 h-30 w-full border mt-2 border-gray-400 rounded-md focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-gray-200 focus-within:border-blue-400 focus-within:border-2">
                <textarea
                  id="desc"
                  name="desc"
                  placeholder="Product Description..."
                  className="w-full h-full overflow-hidden overflow-y-auto px-1 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex w-full justify-between py-5 border-gray-400 border-t border-dashed  mt-4">
        <div className="w-[70%]">
          <div className="w-full grid grid-cols-2 gap-10">
            <div className="w-full">
              <label
                htmlFor="price"
                className="text-[15px] text-gray-600 font-[600]"
              >
                Product Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="$0.00"
                min="0"
                step="0.01"
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = "";
                }}
                className="w-full border focus:outline-blue-500 hover:border hover:border-blue-500 rounded-md border-gray-400 block p-2 text-[14px] text-gray-600 font-[600] h-10"
              />
            </div>
            <div className="w-full oldprice">
              <label
                htmlFor="oldprice"
                className="text-[15px] text-gray-600 font-[600]"
              >
                Old Price
              </label>
              <input
                type="number"
                id="oldprice"
                placeholder="$0.00"
                min="0"
                step="0.01"
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = "";
                }}
                className="w-full border focus:outline-blue-500 hover:border hover:border-blue-500 rounded-md border-gray-400 block p-2 text-[14px] text-gray-600 font-[600] h-10"
              />
            </div>
          </div>
        </div>
        <div className="leading-5 w-[30%] flex justify-center flex-col">
          <div id="pricing" className="w-full text-end">
            <h3 className="text-[16px] font-[700]">Pricing</h3>
            <h3 className="text-[14px] font-[400]">
              Add your product pricing here
            </h3>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div id="productavailability" className="flex w-full gap-5 py-5 border-gray-400 border-t border-dashed mt-4">
        <div className="w-[30%] flex flex-col gap-5">
          <div className="w-full text-left">
            <h3 className="text-[16px] font-[700]">
              Product Availability and Details
            </h3>
            <h3 className="text-[14px] font-[400]">
              Edit your product details and availability from here
            </h3>
          </div>
          <div className="w-full flex justify-center h-[190px] overflow-hidden">
            <div className="w-full h-full">
              <img
                src="/availability.png"
                alt="Availability"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="w-[70%]">
          <div className="w-full grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3 items-start">
              <label
                htmlFor="brand"
                className="text-[15px] text-gray-600 font-[600]"
              >
                Product Brand
              </label>
              <input
                type="text"
                id="brand"
                placeholder="eg. Levi's"
                className="w-full border focus:outline-blue-500 hover:border hover:border-blue-500 rounded-md border-gray-400 block p-2 text-[14px] text-gray-600 font-[600] h-10"
              />

              <Dropdown
                id="weight"
                label="Product Weight"
                placeholder="eg. 2kg"
                options={["2KG", "4KG", "6KG", "8KG"]}
              />

              <label
                htmlFor="discount"
                className="text-[15px] text-gray-600 font-[600]"
              >
                Product Discount
              </label>
              <input
                type="text"
                id="discount"
                placeholder="eg. 50%"
                className="w-full border focus:outline-blue-500 hover:border hover:border-blue-500 rounded-md border-gray-400 block p-2 text-[14px] text-gray-600 font-[600] h-10"
              />
            </div>

            <div className="flex flex-col gap-3 items-start">
              <Dropdown
                id="stock"
                label="Product Availability"
                placeholder="In Stock"
                options={["In Stock", "Out of Stock"]}
              />

              <Dropdown
                id="size"
                label="Product Size"
                placeholder="eg. Small"
                options={["Small", "Medium", "Large", "Extra Large"]}
              />

              <Dropdown
                id="rams"
                label="Product RAMS"
                placeholder="eg. 2GB"
                options={["2GB", "4GB", "8GB", "16GB"]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-5 mt-10 py-5 border-gray-400 border-t border-dashed">
        <div className="w-[70%] flex items-center flex-col justify-center">
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
            <div className="w-full overflow-y-auto h-[200px] my-5">
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

        <div id="uploadimages" className="w-[30%] flex flex-col gap-5 justify-center">
          <div className="w-full text-left">
            <h3 className="text-[16px] font-[700]">
              Upload new product images
            </h3>
            <h3 className="text-[14px] font-[400]">
              Upload your product image gallery here
            </h3>
          </div>
          <div className="w-full flex justify-center h-[190px] overflow-hidden">
            <div className="w-full overflow-hidden rounded-xl h-full">
              <img
                src="/imgupload.png"
                alt="Availability"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 p-5">
        <Button id='uploadproduct' className="!w-full !text-[20px] !rounded-xl !capitalize !text-white !bg-blue-500 hover:!bg-blue-700">
          Upload Product
        </Button>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
