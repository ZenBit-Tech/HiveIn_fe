import { ValidationError, SchemaOf } from "yup";
import { FieldValues } from "react-hook-form";

const createDataForResolver = (data: FieldValues, schema: SchemaOf<any>) => {
  let validData: { [propName: string]: string } = {};
  let errorsMessages: { [propName: string]: { message: string } } = {};
  let errors: ValidationError[] = [];

  try {
    validData = schema.validateSync(data, {
      abortEarly: false,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      errors = err.inner;
    }
  }

  if (errors.length > 0) {
    const messageAndPath = new Map();

    errors.map((err) => messageAndPath.set(err.path, { message: err.message }));
    errorsMessages = Object.fromEntries(messageAndPath);
  }

  return { validData, errorsMessages };
};

export default createDataForResolver;
