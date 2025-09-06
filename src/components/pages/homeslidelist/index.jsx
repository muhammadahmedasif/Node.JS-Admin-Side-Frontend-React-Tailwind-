import { IoSearchOutline } from "react-icons/io5";
import MaterialUiTableHomeslider from "../../materialuitablehomeslider";
import TableHeaderHomeslider from "../../tableheaderhomeslider";


function AddHomeSlide() {
    const rows = [
        {
           product: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmi95jxUISOfZ4EfCflZvjiszCbc8Owwqg&s",
            }
        },
        
        {
           product: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmi95jxUISOfZ4EfCflZvjiszCbc8Owwqg&s",
            }
        },
        
        {
           product: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmi95jxUISOfZ4EfCflZvjiszCbc8Owwqg&s",
            }
        },
        
        {
           product: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmi95jxUISOfZ4EfCflZvjiszCbc8Owwqg&s",
            }
        },
        
        {
           product: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmi95jxUISOfZ4EfCflZvjiszCbc8Owwqg&s",
            }
        },
        
        
    ];
    return (
        <>
            <section className="w-full h-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-[700] py-2">
                        Sliders
                    </h1>
                    <div className="border border-gray-400 p-2 w-[30%] h-10 rounded-lg flex items-center hover:ring hover:ring-gray-500 hover:ring-offset-[0.5px]">
                        <IoSearchOutline className="w-[10%]" />
                        <input type="text" name="search" id="search" placeholder="Search here..." className="w-[90%] focus:outline-none overflow-hidden" />
                    </div>
                </div>

                <div className="my-6 h-[600px] w-full bg-white border border-gray-300 flex-col flex items-start">
                    {/* Sticky Header with Shadow */}
                    <TableHeaderHomeslider />
                    {/* Scrollable Table */}
                    <div
                        id="products-scroll"
                        className="h-[480px] overflow-hidden w-full"
                    >
                        <MaterialUiTableHomeslider rows={rows} />

                    </div>
                </div >
            </section>
        </>
    )
}

export default AddHomeSlide;