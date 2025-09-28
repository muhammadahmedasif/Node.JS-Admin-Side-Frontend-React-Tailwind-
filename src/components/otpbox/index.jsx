import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useContext, useRef, useState } from 'react';

import { Mycontext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { postdata } from '../../../utils/api';

function OTPBox() {
  // Step 1: State to store each OTP digit
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setloading] = useState(false);

  // Step 2: References for input focus control
  const inputRefs = useRef([]);
  const context = useContext(Mycontext);
  const navigate = useNavigate();



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
  const validatevalue = Object.values(otp).every(el => el);

  // Step 5: Submit OTP
  async function handlesubmit(e) {
    e.preventDefault();
    setloading(true);

    try {
      const response = await postdata("/user/verifyemail", {
        email: localStorage.getItem("userEmail"),
        otp: otp.join(""),
      });

      const checkredirect = localStorage.getItem("forgetpassword");
      const checkproupdate = localStorage.getItem("profupdate");
      if (checkredirect) {

        localStorage.removeItem("forgetpassword");
        if (response.error === true) {
          setOtp(Array(6).fill(""));
          context.openalertbox("error", response.message);
          return;
        } else {
          console.log("forgetPassword")
          navigate('/newpassword')
          setOtp(Array(6).fill(""));
          context.openalertbox("success", response.message);
          return
        }
      }
      if (checkproupdate) {

        localStorage.removeItem("profupdate");

        if (response.error === true) {
          setOtp(Array(6).fill(""));
          context.openalertbox("error", response.message);
          return
        } else {
          console.log("profupdate")
          setOtp(Array(6).fill(""));
          context.fetchUserData();
          navigate('/myaccount')
          context.openalertbox("success", response.message);
          return
        }
      }

      if (response.error === true) {
        setOtp(Array(6).fill(""));
        context.openalertbox("error", response.message);
      } else {
        console.log("verifyemail")
        setOtp(Array(6).fill(""));
        navigate('/login')
        localStorage.removeItem("userEmail")
        context.openalertbox("success", response.message);
        return
      }

    } catch (err) {
      console.error(err);
      context.openalertbox("error", "Something went wrong");
    } finally {
      setloading(false); // ✅ always runs
    }
  }

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
        <Button disabled={!validatevalue} onClick={handlesubmit}
          className={`!w-full !py-3 !mt-3 ${loading === true ? "!bg-[rgba(207,202,188,0.61)] !text-black !cursor-not-allowed" : "!bg-blue-500 !text-white hover:!bg-blue-600"}`}>
          {
            loading === true ? <CircularProgress color='inherit' /> : 'Verify OTP'
          }
        </Button>
      </div>
    </div>
  );
}

export default OTPBox;
