import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../progressslider";
import { TfiPencil } from "react-icons/tfi";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

const columns = [
  { id: "product", label: "Product" },
  { id: "catagory", label: "Category" },
  { id: "sub_catagory", label: "Sub Category" },
  { id: "price", label: "Price" },
  { id: "sale", label: "Sale" },
  { id: "action", label: "Action" },
];

function ProductListingTailwind({ rows }) {
  return (
    <div className="w-full h-[500px] overflow-y-auto border border-gray-300 rounded-md">
      <table className="w-full text-center text-[15px] border-collapse">
        <thead  className="bg-white  opacity-100 sticky top-0 z-10">
          <tr >
            <th className="px-4 py-4">
              <Checkbox />
            </th>
            {columns.map((col) => (
              <th
                key={col.id}
                className="font-[600] capitalize px-4 py-4"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-white border-t border-gray-300">
              <td className="px-4 py-4">
                <Checkbox />
              </td>

              {/* Product */}
              <td className="capitalize w-[350px] px-3 py-4">
                <div className="gap-3 w-full items-center flex">
                  <div className="w-[30%] object-cover rounded-md overflow-hidden">
                    <img
                      src={row.product.image}
                      alt={row.product.title}
                      className="w-full"
                    />
                  </div>
                  <div className="w-[70%]">
                    <h3 className="text-[12px] font-[500] w-full cursor-pointer hover:text-blue-800 leading-4">
                      {row.product.title}
                    </h3>
                    <h3 className="pt-2 cursor-pointer hover:text-red-500 text-gray-600 font-[500] text-[14px]">
                      {row.product.subtitle}
                    </h3>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="font-[500] text-[15px] capitalize px-4 py-4">
                {row.catagory}
              </td>

              {/* Sub Category */}
              <td className="font-[500] text-[15px] capitalize px-4 py-4">
                {row.sub_catagory}
              </td>

              {/* Price */}
              <td className="capitalize px-4 py-4">
                {row.price.old && (
                  <h3 className="text-[15px] text-gray-600 font-[500] line-through">
                    {row.price.old}
                  </h3>
                )}
                <h3 className="text-[15px] text-black font-[500]">
                  {row.price.new}
                </h3>
              </td>

              {/* Sale */}
              <td className="capitalize px-4 py-4">
                <h3 className="text-[15px] text-black font-[500]">
                  {row.sale.text}
                </h3>
                <ProgressBar value={row.sale.progress} type={row.sale.type} />
              </td>

              {/* Action */}
              <td className="font-[500] text-[15px] capitalize w-[160px] gap-3 px-2 py-4">
                <div className="flex items-center justify-evenly w-full">
                  <Tooltip title="Edit" placement="top">
                    <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                      <TfiPencil />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View" placement="top">
                    <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                      <AiOutlineEye />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                      <MdOutlineDeleteOutline />
                    </Button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListingTailwind;
