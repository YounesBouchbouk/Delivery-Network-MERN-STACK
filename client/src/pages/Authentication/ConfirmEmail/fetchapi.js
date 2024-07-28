import axios from "axios";

export const validationprocessapi = async (Emailtoken) => {
  try {
    let res = await axios.get(
      `/authentication/users/emailValidation/${Emailtoken}`
    );
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
