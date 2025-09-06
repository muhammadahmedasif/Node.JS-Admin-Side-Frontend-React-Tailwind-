import { IoSearchOutline } from "react-icons/io5";
import MaterialUiTable from "../../materialuitable";
import TableHeader from "../../tableheader";


function ProductListing() {

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
    return (
        <>
            <section className="w-full h-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-[700] py-2">
                        Products
                    </h1>
                    <div className="border border-gray-400 p-2 w-[30%] h-10 rounded-lg flex items-center hover:ring hover:ring-gray-500 hover:ring-offset-[0.5px]">
                        <IoSearchOutline className="w-[10%]" />
                        <input type="text" name="search" id="search" placeholder="Search here..." className="w-[90%] focus:outline-none overflow-hidden" />
                    </div>
                </div>

                <div className="my-6 w-full bg-white border border-gray-300 flex-col flex items-start">
                    {/* Sticky Header with Shadow */}
                    <TableHeader />
                    {/* Scrollable Table */}
                    <div
                        id="products-scroll"
                        className=" overflow-hidden w-full"
                    >
                        <MaterialUiTable rows={rows} columns={columns} currentpage={""} />

                    </div>
                </div >
            </section>
        </>
    )
}

export default ProductListing