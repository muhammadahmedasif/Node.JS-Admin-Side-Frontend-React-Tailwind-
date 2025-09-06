import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Mycontext } from "../../App";

function TableHeader() {
    const context = useContext(Mycontext)
    return (
        <div
            className='py-3 flex flex-col gap-1 bg-[rgba(227,225,225,0.4)] w-full top-0 transition-shadow duration-300 relative'>
            <h3 className="px-10 w-full text-[20px] font-[700]">Products</h3>
            <div className="px-10 w-full">
                <div className="w-[20%] flex items-center">
                    <Box
                        sx={{ minWidth: 250, display: "flex", alignItems: "center" }}
                    >
                        <span className="!text-[13px] w-[110px] !text-black !font-[600]">
                            Filter By:
                        </span>

                        <FormControl fullWidth>
                            <NativeSelect
                                defaultValue={1}
                                inputProps={{
                                    name: "Filter",
                                    id: "uncontrolled-native",
                                }}
                                sx={{
                                    textAlign: "center", // centers selected value
                                    "& option": {
                                        textAlign: "center", // centers dropdown items
                                    },
                                }}
                                className="opacity-70 !text-[12px] !outline-none"
                            >
                                <option value={1} disabled hidden>
                                    Filter By Categories
                                </option>
                                <option>Women</option>
                                <option>Kids</option>
                                <option>Boys</option>
                                <option>Men</option>
                                <option>Children</option>
                                <option>Teen</option>
                                <option>Shoes</option>
                                <option>Makeup</option>
                                <option>Shirts</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className="absolute right-3 flex gap-2 top-1/2 -translate-y-1/2">
                <Button className="!capitalize hover:!bg-[#3067e5] !w-[50px] !text-white !bg-blue-500">
                    Export
                </Button >
                <Button className="!capitalize hover:!bg-[#3067e5] !w-[115px] !text-white !bg-blue-500"  onClick={() => context.setopendialogue({ open: true, model: "Add Product" })}>
                    Add Product
                </Button>
            </div>
        </div>

    )
}
export default TableHeader