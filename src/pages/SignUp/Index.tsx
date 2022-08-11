import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Field from "../../components/DefaultField/Index";
import S from "./style";
import signUpSchema from "./schema";
import { COMPLETE_REGISTRATION_ROUTE } from "../../utils/consts";

interface SignUpForm extends FieldValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  function onSubmit(evt: SignUpForm) {
    navigate(COMPLETE_REGISTRATION_ROUTE);
    return evt;
  }

  return (
    <S.Container>
      <S.FormBox>
        <Button type="primary" icon={<GoogleOutlined />}>
          Sign Up with Google
        </Button>
        <div style={{ textAlign: "center" }}>
          <span>or</span>
          <br />
          <span>Use your email</span>
        </div>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email" control={control} name="email" />
          <Field label="Create a password" control={control} name="password" />
          <Field
            label="Confirm password"
            control={control}
            name="passwordConfirm"
          />
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </S.Form>
      </S.FormBox>
    </S.Container>
  );
}
