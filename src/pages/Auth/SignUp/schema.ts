import * as yup from "yup";

const signUpSchema = yup.object({
  email: yup.string().required("Insert an Email").email("Insert a valid Email"),
  password: yup
    .string()
    .required("Insert a password")
    .min(8, "Insert at least 8 characters")
    .max(64, "Max is 64 characters")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  passwordConfirm: yup
    .string()
    .required("Insert password confirmation")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default signUpSchema;
