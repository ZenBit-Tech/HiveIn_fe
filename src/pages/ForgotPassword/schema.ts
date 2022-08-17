import * as yup from "yup";

const signUpSchema = yup.object({
  email: yup.string().required("Insert an Email").email("Insert a valid Email"),
});

export default signUpSchema;
