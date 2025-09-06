import { IoSearchOutline } from "react-icons/io5";
import OrdersDetailsTable from "../../orderdetailstable/ordersdetailstable";

function OrdersListing() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-[25px] font-[700] py-2">
                    Recent Orders
                </h1>
                <div className="border border-gray-400 p-2 w-[30%] h-10 rounded-lg flex items-center hover:ring hover:ring-gray-500 hover:ring-offset-[0.5px]">
                    <IoSearchOutline className="w-[10%]" />
                    <input type="text" name="search" id="search" placeholder="Search here..." className="w-[90%] focus:outline-none overflow-hidden" />
                </div>
            </div>
            <div className="my-6 w-full">
                <div className="w-full border-4 border-white overflow-hidden overflow-x-scroll">
                    <OrdersDetailsTable />
                </div>
            </div>

        </>
    )
}

export default OrdersListing;
