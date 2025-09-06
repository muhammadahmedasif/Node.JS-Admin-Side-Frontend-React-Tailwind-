import { Button } from "@mui/material";
import DashboardBoxes from "../../DashboardBoxes";
import { FaPlus } from "react-icons/fa6";
import OrdersDetailsTable from "../../orderdetailstable/ordersdetailstable";
import ProductListingTailwind from "../../productlistingtailwind";
import Pagination from "@mui/material/Pagination";
import MaterialUiTable from "../../materialuitable";
import LineCharts from "../../linecharts";
import TableHeader from "../../tableheader";
import { useContext } from "react";
import { Mycontext } from "../../../App";

const columns = [
  { id: 'product', label: 'Product', minWidth: 120, align: 'center' },
  { id: 'catagory', label: 'Category', minWidth: 70, align: 'center' },
  { id: 'sub_catagory', label: 'Sub Category', minWidth: 120, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 70, align: 'center' },
  { id: 'sale', label: 'Sale', minWidth: 70, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
];

const rows = [
  {
    product: {
      image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
      title: "Wedtrend Women's Vintage Tea Dress",
      subtitle: "Sapphire"
    },
    catagory: "Electronics",
    sub_catagory: "Women",
    price: { old: "$58.00", new: "$45.00" },
    sale: { text: "245 sale", progress: 10, type: "error" }
  },
  {
    product: {
      image: "https://picsum.photos/200/300",
      title: "Smart Watch Series 7",
      subtitle: "Black Edition"
    },
    catagory: "Gadgets",
    sub_catagory: "Wearables",
    price: { old: "$299", new: "$199" },
    sale: { text: "500 sale", progress: 60, type: "success" }
  }, {
    product: {
      image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
      title: "Wedtrend Women's Vintage Tea Dress",
      subtitle: "Sapphire"
    },
    catagory: "Electronics",
    sub_catagory: "Women",
    price: { old: "$58.00", new: "$45.00" },
    sale: { text: "245 sale", progress: 10, type: "error" }
  },
  {
    product: {
      image: "https://picsum.photos/200/300",
      title: "Smart Watch Series 7",
      subtitle: "Black Edition"
    },
    catagory: "Gadgets",
    sub_catagory: "Wearables",
    price: { old: "$299", new: "$199" },
    sale: { text: "500 sale", progress: 60, type: "success" }
  }, {
    product: {
      image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
      title: "Wedtrend Women's Vintage Tea Dress",
      subtitle: "Sapphire"
    },
    catagory: "Electronics",
    sub_catagory: "Women",
    price: { old: "$58.00", new: "$45.00" },
    sale: { text: "245 sale", progress: 10, type: "error" }
  },
  {
    product: {
      image: "https://picsum.photos/200/300",
      title: "Smart Watch Series 7",
      subtitle: "Black Edition"
    },
    catagory: "Gadgets",
    sub_catagory: "Wearables",
    price: { old: "$299", new: "$199" },
    sale: { text: "500 sale", progress: 60, type: "success" }
  }, {
    product: {
      image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
      title: "Wedtrend Women's Vintage Tea Dress",
      subtitle: "Sapphire"
    },
    catagory: "Electronics",
    sub_catagory: "Women",
    price: { old: "$58.00", new: "$45.00" },
    sale: { text: "245 sale", progress: 10, type: "error" }
  },
  {
    product: {
      image: "https://picsum.photos/200/300",
      title: "Smart Watch Series 7",
      subtitle: "Black Edition"
    },
    catagory: "Gadgets",
    sub_catagory: "Wearables",
    price: { old: "$299", new: "$199" },
    sale: { text: "500 sale", progress: 60, type: "success" }
  }
];
function Dashboard() {
  const context = useContext(Mycontext)
  return (
    <>

      {/* Greeting Section */}
      <div className="w-full border border-[rgba(0,0,0,0.1)] bg-white px-4 flex rounded-lg mb-3 justify-between">
        <div className="flex flex-col items-start py-9 leading-9 w-[60%]">
          <div>
            <h3 className="text-[30px] font-[700]">Good Morning,</h3>
            <span className="text-[30px] font-[700]">Cameron👋</span>
            <h3 className="normal-case text-[16px] font-[500]">
              Here is what's happening on your store today. See statistics at once
            </h3>
            <Button className="!capitalize !mt-13 hover:!bg-[#3067e5] !w-[130px] !p-2 !text-white !bg-blue-500" onClick={() => context.setopendialogue({ open: true, model: "Add Product" })}>
              <FaPlus />
              Add Product
            </Button>
          </div>
        </div>
        <div className="w-[30%] min-w-[20%]">
          <img
            src="https://isomorphic-furyroad.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshop-illustration.b3542492.png&w=3840&q=75"
            alt=""
          />
        </div>
      </div>

      {/* Stats Boxes */}
      <DashboardBoxes />

      {/* Product Listing Section */}
      <div className="my-3 h-[600px] overflow-hidden w-full bg-white border border-gray-300 flex-col flex items-start">
        <h3 className="pl-10 py-5 text-[25px] font-[700]">Products</h3>
        <div className="flex flex-col w-full h-[465px] bg-white">
          <TableHeader />
          <ProductListingTailwind rows={rows} />
        </div>
        <div className="py-3 w-full justify-end items-center flex">
          <Pagination
            count={10}
            className="bg-[#f1f1f1] rounded-lg w-[40%] mr-4"
          />
        </div>
      </div>

      {/* Orders Details */}
      <div className="my-6 w-full">
        <div className="w-full border-4 border-white overflow-hidden overflow-x-scroll">
          <OrdersDetailsTable />
        </div>
      </div>

      {/* Products Table Section */}
      <div className="my-6  w-full bg-white border border-gray-300 flex-col flex items-start">
        {/* Sticky Header with Shadow */}
        <TableHeader />
        {/* Scrollable Table */}
        <div
          id="products-scroll"
          className="overflow-hidden w-full"
        >
          <MaterialUiTable rows={rows} columns={columns} currentpage={""} />

        </div>
      </div >
      <div className="w-full p-2 bg-white border border-gray-300">
        <LineCharts />
      </div>
    </>
  );
}

export default Dashboard;
