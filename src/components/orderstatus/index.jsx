function OrderStatus(props){
    return(
        <div className={`p-2 inline-block text-[11px] rounded-full flex items-center justify-center capitalize ${props.status === "Pending"&&"bg-[#ff5252] text-white"} ${props.status === "Confirmed"&&"bg-green-500 text-white"} ${props.status === "Delivered"&&"bg-green-700 text-white"}`}>
            {props.status}
        </div>
    )

}

export default OrderStatus;