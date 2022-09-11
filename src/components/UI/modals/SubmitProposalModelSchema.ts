import * as yup from "yup";

const submitProposalSchema = yup.object({
  bid: yup
    .number()
    .required("Insert your bid")
    .positive("Insert a valid number")
    .typeError("You must specify a number"),
  coverLetter: yup
    .string()
    .required("Insert your cover letter")
    .max(250, "You've reached the limit"),
});

export default submitProposalSchema;
