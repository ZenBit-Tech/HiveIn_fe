import React, { useEffect, useState } from "react";
import { FieldErrorsImpl } from "react-hook-form";
import SkillButton from "components/UI/buttons/skillButton/SkillButton";
import SDiv from "components/skillsLayout/style";
import { SErrorMessage } from "components/UI/textField/style";
import { useGetInfoQuery } from "services/categoriesAndSkills/categoriesAndSkills";

function SkillsLayout({
  errors,
  options,
  setValue,
}: {
  errors: FieldErrorsImpl;
  options: { id: number }[];
  setValue: any;
}) {
  const { data } = useGetInfoQuery("skill");
  const queriedActiveSkills = options.map(({ id }) => id);

  const [activeSkills, setActiveSkills] = useState(queriedActiveSkills);

  useEffect(() => {
    setValue("skills", activeSkills);
    // eslint-disable-next-line
  }, [activeSkills]);

  const changeHandler = (id: number) => {
    if (activeSkills.includes(id)) {
      setActiveSkills((state) => state.filter((e) => e !== id));
    } else {
      setActiveSkills((state) =>
        state.indexOf(id) >= 0 ? state : [...state, id]
      );
    }
  };

  return (
    <SDiv>
      {!!data &&
        data.map(({ id, name }) => {
          return (
            <SkillButton
              key={id}
              id={id}
              toggleActive={changeHandler}
              text={name}
              isActive={activeSkills.includes(id)}
            />
          );
        })}
      {!!errors.skills?.message && (
        <SErrorMessage>{errors.skills?.message?.toString()}</SErrorMessage>
      )}
    </SDiv>
  );
}

export default SkillsLayout;
