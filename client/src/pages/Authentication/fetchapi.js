import axios from "axios";

export const getMe = async () => {
  // console.log(data);
  try {
    let res = await axios.get("/authentication/user/getMe");
    if (res.data.user) {
      return res.data.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  console.log(data);
  try {
    let res = await axios.post("/authentication/users/login", data);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async (body) => {
  try {
    let res = await axios.post(`/authentication/users/SignUp`, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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
