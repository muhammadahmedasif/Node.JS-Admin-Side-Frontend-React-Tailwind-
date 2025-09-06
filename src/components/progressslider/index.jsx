function ProgressBar(props){
    return(
        <div className="w-[70px] h-auto overflow-hidden rounded-lg bg-[#f1f1f1]">
            <span style={{width: props.value}} className={`${props.type==='success'&&'bg-green-500'} ${props.type==='warning'&&'bg-orange-500'} ${props.type==='error'&&'bg-red-500'}  h-[8px] flex items-center`}></span>
        </div>
    )
}
export default ProgressBar;