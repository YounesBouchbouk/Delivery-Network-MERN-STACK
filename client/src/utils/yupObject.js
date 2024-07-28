import * as Yup from "yup";

export const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  businessname: Yup.string().min(3, "Invalid name!"),
  businessAdress: Yup.string().min(5, "invalid Adress"),
  phone: Yup.number().min(9, "invalid phone number"),
  password: Yup.string().min(3, "Invalid password!"),
});
