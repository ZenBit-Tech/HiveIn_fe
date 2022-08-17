import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IPhoneInputProps } from "components/UI/phoneInput/typesDef";

function PhoneInputCustom({ name, control }: IPhoneInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PhoneInput {...field} inputStyle={{ width: "100%" }} country="ua" />
      )}
    />
  );
}

export default PhoneInputCustom;
