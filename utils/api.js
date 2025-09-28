import axios from 'axios';
const apiurl = import.meta.env.VITE_API_URL;

// export async function postdataPublic(url, formdata) {
//     try {

//         const res = await fetch(apiurl + url,{
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formdata)
//         });

//         if(res.ok){
//             const data = await res.json();
//             return data;
//         }else{
//             const errorData = await res.json();

//             return errorData;
//         }


//     } catch (error) {
//         console.log("Error", error)
//     }
// }

export async function postdataPublic(url, formdata) {
    try {
        const res = await axios.post(apiurl + url, formdata, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response) return error.response.data;
        console.error("Error", error);
        return { error: true, message: "Something went wrong" };
    }
}

export async function putdataPublic(url, formdata) {
  try {
    const res = await axios.put(apiurl + url, formdata, {
      headers: {
         'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) return error.response.data;
    console.error("Error", error);
    return { error: true, message: "Something went wrong" };
  }
}

export async function postdata(url, formdata) {
    try {
        const res = await axios.post(apiurl + url, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // ✅ Return actual backend error message
            return error.response.data;
        }
        console.error("Error", error);
        return { error: true, message: "Something went wrong" };
    }
}


export async function uploadImage(url, formdata) {
    try {
        const res = await axios.post(apiurl + url, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                // ⚠️ Don’t set Content-Type, Axios will set multipart automatically
            }
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        console.error("Upload Error", error);
        return { error: true, message: "Image upload failed" };
    }
}


export async function fetchdatafromapi(url) {
  try {
    const res = await axios.get(apiurl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    // ✅ Always return full backend response so frontend has context
    return res.data; // { message, user_details, error, success }

  } catch (error) {
    if (error.response) {
      // ✅ Return backend error response
      return error.response.data; 
    }
    console.error("Error", error);
    return { error: true, message: "Something went wrong" };
  }
}

export async function deleteAvatar() {
  try {
    const res = await axios.delete(apiurl + "/user/deleteavatarimage", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return res.data; // { success, message, error }
  } catch (error) {
    if (error.response) {
      return error.response.data; // backend error message
    }
    console.error("Delete avatar error:", error);
    return { error: true, message: "Something went wrong" };
  }
}