import axios from "axios";

export const ForgetPswapi = async (email) => {
  try {
    let res = await axios.post("/authentication/users/forgetpassword", {
      email,
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetPasswordReq = async (token, values) => {
  try {
    let res = await axios.post(`/authentication/users/resetpassword/${token}`, {
      ...values,
    });
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
