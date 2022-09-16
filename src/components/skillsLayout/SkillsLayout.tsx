import React, { useEffect, useState } from "react";
import SkillButton from "components/UI/buttons/skillButton/SkillButton";
import SDiv from "components/skillsLayout/style";
import { SErrorMessage } from "components/UI/textField/style";
import { useGetInfoQuery } from "services/categoriesAndSkills/categoriesAndSkills";
import { ISkillsProps } from "components/skillsLayout/typesDef";

function SkillsLayout({
  errors,
  options,
  setValue,
  isSubmitSuccess,
}: ISkillsProps) {
  const { data } = useGetInfoQuery("skill");
  const queriedActiveSkills = options.map(({ id }) => id);
  const [activeSkills, setActiveSkills] = useState(queriedActiveSkills);

  useEffect(() => {
    if (isSubmitSuccess) setActiveSkills(queriedActiveSkills);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isSubmitSuccess]);

  useEffect(() => {
    setValue("skills", activeSkills);
    /* eslint-disable react-hooks/exhaustive-deps */
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
