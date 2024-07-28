import axios from "axios";

export const updateMe = async (data) => {
  try {
    let res = await axios.post(`/user/updateMe`, data);
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
