import axios from "axios";

export const GetUserReq = async (page, limit, type) => {
  let link;
  try {
    if (type === "all") {
      link = `/user/disabledusers?page=${page}&limit=${limit}`;
    } else {
      link = `/user/disabledusers?role=${type}&page=${page}&limit=${limit}`;
    }
    let res = await axios.get(link);
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: error,
    };
  }
};

export const ActionReq = async (action, id) => {
  `/user/${action}/${id}`;
  try {
    let res = await axios.get(`/user/${action}/${id}`);
    res;
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  try {
    let res = await axios.get(`/user/getMe`);
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOne = async (userid) => {
  try {
    let res = await axios.get(`/user/getUser/${userid}`);
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
