import { IoSearchOutline } from "react-icons/io5";
import MaterialUiTableAddCatagory from "../../materialuitableaddcatagory";
import TableHeaderReeusableComponent from "../../tableheaderreusablecomponent";

const columns = [
  { id: "catagoryimage", label: "Category Image", minWidth: 200, align: "center" },
  { id: "catagory", label: "Category", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 150, align: "center" },
];
const rows = [
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    {
        product: {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            catagory: "Electronics",
        }
    },
    
    
];

function AddCatagory() {
    return (
        <>
            <section className="w-full h-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-[700] py-2">
                        Catagory
                    </h1>
                    <div className="border border-gray-400 p-2 w-[30%] h-10 rounded-lg flex items-center hover:ring hover:ring-gray-500 hover:ring-offset-[0.5px]">
                        <IoSearchOutline className="w-[10%]" />
                        <input type="text" name="search" id="search" placeholder="Search here..." className="w-[90%] focus:outline-none overflow-hidden" />
                    </div>
                </div>

                <div className="my-6 h-[600px] w-full bg-white border border-gray-300 flex-col flex items-start">
                    {/* Sticky Header with Shadow */}
                    <TableHeaderReeusableComponent title={'Catagory'} model={'Add Catagory'} button={'Add Catagory'}/>
                    {/* Scrollable Table */}
                    <div
                        id="products-scroll"
                        className="h-[480px] overflow-hidden w-full"
                    >
                        <MaterialUiTableAddCatagory rows={rows} columns={columns} />

                    </div>
                </div >
            </section>
        </>
    )
}

export default AddCatagory;