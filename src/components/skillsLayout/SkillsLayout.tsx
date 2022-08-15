import React from "react";
import {
  useFieldArray,
  Controller,
  Control,
  FieldErrorsImpl,
} from "react-hook-form";
import SkillButton from "components/UI/buttons/skillButton/SkillButton";
import SDiv from "components/skillsLayout/style";
import { SErrorMessage } from "../UI/textField/style";

function SkillsLayout({
  options,
  control,
  errors,
}: {
  options: string[];
  control: Control;
  errors: FieldErrorsImpl;
}) {
  const { append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <SDiv>
      {options.map((buttonText) => (
        <Controller
          key={buttonText}
          name={`skills.${buttonText}`}
          control={control}
          render={() => (
            <SkillButton append={append} remove={remove} text={buttonText} />
          )}
        />
      ))}
      {!!errors.skills?.message && (
        <SErrorMessage>{errors.skills?.message?.toString()}</SErrorMessage>
      )}
    </SDiv>
  );
}

export default SkillsLayout;
