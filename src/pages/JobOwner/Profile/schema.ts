import * as yup from "yup";

const jobOwnerSchema = yup.object({
  name: yup.string().required("Insert a name"),
});

export default jobOwnerSchema;
