import axios from "axios";

const httpPost = async (payLoad, formType) => {
  try {
    const {data} = await axios.post(`http://localhost:8080/api/user/${formType}`, 
     payLoad,
     {
      headers: {
        "Content-type": "application/json",
      },
    });

  
    return {userData:data};
  } catch (error) {
    console.log(error)
    return {error:error.response.data}
        
  }
   
  };

  export default httpPost