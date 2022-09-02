import { format } from "date-fns";

/* eslint-disable import/prefer-default-export */
export const formatToStandardDate = (date: Date, formatType = "dd/MM/yyyy") => {
  return format(date, formatType);
};
