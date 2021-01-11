import axios from 'axios'

export const REQUEST = async ({path, data, method}) => {
  try{
    const response = await axios(path,{
      method,
      data,
      headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data
  }
  catch(e){
    console.log(e.response);
    throw new Error(e.response.data);
  }
}
