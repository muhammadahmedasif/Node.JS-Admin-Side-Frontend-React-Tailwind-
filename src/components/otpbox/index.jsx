
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function OTPBox() {
  // Step 1: State to store each OTP digit
  const [otp, setOtp] = useState(Array(6).fill(""));

  // Step 2: References for input focus control
  const inputRefs = useRef([]);



  // Step 3: Handle value change
  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if not last
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Step 4: Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Step 5: Submit OTP
  const handleSubmit = () => {
    alert("Your OTP is: " + otp.join(""));
  };

  return (
    <div className="flex flex-col items-center justify-center w-[430px] min-h-[200px] p-4">
      <div className="bg-[#f1f1f1] border border-gray-200 p-6 rounded-lg shadow-lg w-full w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <p className="text-gray-500 text-center mb-6">We sent a 6-digit code to your phone</p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button component={Link} to={'/newpassword'} onClick={handleSubmit}
          className="!w-full !py-3 !mt-3 !bg-blue-500 !text-white hover:!bg-blue-600 ">    
          Verify OTP
        </Button>
      </div>
    </div>
  );
}

export default OTPBox;
