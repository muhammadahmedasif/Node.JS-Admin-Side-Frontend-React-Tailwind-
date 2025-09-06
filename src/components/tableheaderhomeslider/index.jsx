import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Mycontext } from "../../App";

function TableHeaderHomeslider() {
    const context = useContext(Mycontext)
    return (
        <div
            className='py-3 flex flex-col gap-1 bg-[rgba(227,225,225,0.4)] w-full top-0 transition-shadow duration-300 relative'>
            <h3 className="px-10 w-full text-[20px] font-[700]">Sliders</h3>

            <div className="absolute right-3 flex gap-2 top-1/2 -translate-y-1/2">
                <Button className="!capitalize hover:!bg-[#3067e5] !w-[50px] !text-white !bg-blue-500">
                    Export
                </Button >
                <Button className="!capitalize hover:!bg-[#3067e5] !w-[115px] !text-white !bg-blue-500"  onClick={() => context.setopendialogue({ open: true, model: "Add Home Slider" })}>
                    Add Slide
                </Button>
            </div>
        </div>

    )
}
export default TableHeaderHomeslider