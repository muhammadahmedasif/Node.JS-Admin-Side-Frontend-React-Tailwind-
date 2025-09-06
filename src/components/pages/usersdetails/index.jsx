import { IoSearchOutline } from "react-icons/io5";
import MaterialUiTable from "../../materialuitable";


function UsersDetails() {

    const columns = [
    { id: 'user_image', label: 'User Profile', minWidth: 100, align: 'center' },
    { id: 'user_name', label: 'User Name', minWidth: 100, align: 'center' },
    { id: 'user_email', label: 'User Email', minWidth: 120, align: 'center' },
    { id: 'phone', label: 'Phone Number', minWidth: 70, align: 'center' },
   
  ];

    const rows = [
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
        {
            image: "https://i.pinimg.com/1200x/5b/75/a9/5b75a9c5c7371925328e06ad5814c259.jpg",
            name: "Muhammad Ahmed",
            email: "muhammadahmedasif13@gmail.com",
            phone: "03078526478"
        },
       
    ];
    return (
        <>
            <section className="w-full h-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-[700] py-2">
                        User Details
                    </h1>
                    <div className="border border-gray-400 p-2 w-[30%] h-10 rounded-lg flex items-center hover:ring hover:ring-gray-500 hover:ring-offset-[0.5px]">
                        <IoSearchOutline className="w-[10%]" />
                        <input type="text" name="search" id="search" placeholder="Search here..." className="w-[90%] focus:outline-none overflow-hidden" />
                    </div>
                </div>

                <div className="my-6  w-full bg-white border border-gray-300 flex-col flex items-start rounded-lg">
                    {/* Sticky Header with Shadow */}
                    <h3 className="px-10 my-3 border-gray-300 border-t border-b border-dashed py-5 bg-[#f1f1f1] w-full text-[20px] font-[700] ">
                        Current Users
                    </h3>
                    {/* Scrollable Table */}
                    <div
                        id="products-scroll"
                        className="overflow-hidden w-full"
                    >
                        <MaterialUiTable rows={rows}  columns={columns} currentpage={"users"}/>

                    </div>
                </div >
            </section>
        </>
    )
}

export default UsersDetails