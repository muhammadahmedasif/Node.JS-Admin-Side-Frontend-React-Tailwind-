import { Button } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import OrderStatus from "../orderstatus";



function OrdersDetailsTable() {
    const [isshow, setisshow] = useState(null)

    function displaydetails(index){
        if(index === isshow){
            setisshow(null)
        }else{
            setisshow(index)
        }

    }

    return (
        <>

            <table className='w-full text-center text-[15px] bg-[rgba(181,181,181,0.3)]'>
                <tr className='bg-[rgba(181,181,181,0.42)]'>
                    <th
                        rowSpan={2}
                        className="font-[600] border-white border-4"
                    >
                        <Button className="!w-[100px] !h-[100px] !min-h-0 !p-0 flex items-center !text-black !text-[20px] justify-center relative" onClick={() => displaydetails(1)}>
                            {
                              isshow === 1 ? <FaAngleUp className="absolute  top-1/2 -translate-x-1/2 left-1/2"/>:  
                                <FaAngleDown className="absolute  top-1/2 -translate-x-1/2 left-1/2" />
                            }
                        </Button>
                    </th>

                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Order ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Payment ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Name
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Phone Number
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Address
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        PinCode
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Total Amount
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Email
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        User ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Order Status
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Date
                    </th>
                </tr>
                <tr >
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="text-[#ff5252]">ORD12345678</span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="text-[#ff5252]">PAY98765432</span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        John Doe
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        +1 234 567 890
                    </td>
                    <td className='px-4 py-4 border-white border-4 leading-3 !text-[14px]'>
                        <span className="block w-[300px]">
                            123 Main Street, Springfield
                        </span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        123456
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        $250.00
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        john.doe@example.com
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="w-[150px] text-[#ff5252]">USER001</span>
                    </td>
                    <td className='p-2 border-white border-4'>
                        <div className="flex items-center justify-center"> <OrderStatus status={'Delivered'} /> </div>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        2025-08-10
                    </td>
                </tr>
                {
                    isshow === 1 &&
                <tr className="bg-white border-white border-4">
                    <td colSpan={6}>
                        <table className='w-full text-center text-[15px] ml-25  bg-[rgba(181,181,181,0.3)]'>
                            <tr className='bg-[rgba(181,181,181,0.42)]'>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Product ID
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Product Title
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Image
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Quantity
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Price
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Sub Total
                                </th>
                            </tr>
                            <tr>

                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    <span className="text--gray-600">PAY98765432</span>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Brown old money style T-shirt
                                </td>
                                <td className='border-white border-4 overflow-hidden'>
                                    <div className="flex items-center w-full justify-center">
                                        <img src="https://i.pinimg.com/736x/9b/41/b8/9b41b8f952c7b7736937566c2d5bb3c3.jpg" alt="Ordered Item" className="w-[40px] h-[40px] rounded-md object-cover" />
                                    </div>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    1
                                </td>
                                <td className='p-2 border-white border-4'>
                                    $130
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    $133
                                </td>
                            </tr>
                            <tr>

                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    <span className="text--gray-600">PAY98765432</span>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Brown old money style T-shirt
                                </td>
                                <td className='border-white border-4 overflow-hidden'>
                                    <div className="flex items-center w-full justify-center">
                                        <img src="https://i.pinimg.com/736x/9b/41/b8/9b41b8f952c7b7736937566c2d5bb3c3.jpg" alt="Ordered Item" className="w-[40px] h-[40px] rounded-md object-cover" />
                                    </div>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    1
                                </td>
                                <td className='p-2 border-white border-4'>
                                    $130
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    $133
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                }

                             <tr className='bg-[rgba(181,181,181,0.42)]'>
                    <th
                        rowSpan={2}
                        className="font-[600] border-white border-4"
                    >
                        <Button className="!w-[100px] !h-[100px] !min-h-0 !p-0 flex items-center !text-black !text-[20px] justify-center relative" onClick={() => displaydetails(2)}>
                            {
                              isshow === 2 ? <FaAngleUp className="absolute  top-1/2 -translate-x-1/2 left-1/2"/>:  
                                <FaAngleDown className="absolute  top-1/2 -translate-x-1/2 left-1/2" />
                            }
                        </Button>
                    </th>

                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Order ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Payment ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Name
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Phone Number
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Address
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        PinCode
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Total Amount
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Email
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        User ID
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Order Status
                    </th>
                    <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                        Date
                    </th>
                </tr>
                <tr >
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="text-[#ff5252]">ORD12345678</span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="text-[#ff5252]">PAY98765432</span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        John Doe
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        +1 234 567 890
                    </td>
                    <td className='px-4 py-4 border-white border-4 leading-3 !text-[14px]'>
                        <span className="block w-[300px]">
                            123 Main Street, Springfield
                        </span>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        123456
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        $250.00
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        john.doe@example.com
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        <span className="w-[150px] text-[#ff5252]">USER001</span>
                    </td>
                    <td className='p-2 border-white border-4'>
                        <div className="flex items-center justify-center"> <OrderStatus status={'Delivered'} /> </div>
                    </td>
                    <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                        2025-08-10
                    </td>
                </tr>
                {
                    isshow === 2 &&
                <tr className="bg-white border-white border-4">
                    <td colSpan={6}>
                        <table className='w-full text-center text-[15px] ml-25  bg-[rgba(181,181,181,0.3)]'>
                            <tr className='bg-[rgba(181,181,181,0.42)]'>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Product ID
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Product Title
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Image
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Quantity
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Price
                                </th>
                                <th className='font-[600] capitalize px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Sub Total
                                </th>
                            </tr>
                            <tr>

                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    <span className="text-gray-600">PAY98765432</span>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Brown old money style T-shirt
                                </td>
                                <td className='border-white border-4 overflow-hidden'>
                                    <div className="flex items-center w-full justify-center">
                                        <img src="https://i.pinimg.com/736x/9b/41/b8/9b41b8f952c7b7736937566c2d5bb3c3.jpg" alt="Ordered Item" className="w-[40px] h-[40px] rounded-md object-cover" />
                                    </div>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    1
                                </td>
                                <td className='p-2 border-white border-4'>
                                    $130
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    $133
                                </td>
                            </tr>
                            <tr>

                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    <span className="text-gray-600">PAY98765432</span>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    Brown old money style T-shirt
                                </td>
                                <td className='border-white border-4 overflow-hidden'>
                                    <div className="flex items-center w-full justify-center">
                                        <img src="https://i.pinimg.com/736x/9b/41/b8/9b41b8f952c7b7736937566c2d5bb3c3.jpg" alt="Ordered Item" className="w-[40px] h-[40px] rounded-md object-cover" />
                                    </div>
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    1
                                </td>
                                <td className='p-2 border-white border-4'>
                                    $130
                                </td>
                                <td className='px-4 py-4 border-white border-4 whitespace-nowrap'>
                                    $133
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                }

            </table>

        </>
    )
}

export default OrdersDetailsTable