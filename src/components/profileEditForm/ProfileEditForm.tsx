import React from "react";
import { IProps } from "components/layoutElementWithTitle/typesDef";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";

function ProfileEditForm() {
  const propsData: IProps[] = [
    { title: "Position", element: "textInput" },
    {
      title: "Category",
      element: "select",
      selectOptions: [
        "Legal",
        "IT",
        "Sales",
        "Finance",
        "Construction",
        "Accounting",
        "Design",
        "Security",
        "Healthcare",
        "Marketing",
      ],
    },
    { title: "Rate", element: "numberInput", helperText: "Charge per hour" },
    {
      title: "English level",
      element: "toggleButton",
      toggleButtonOptions: [
        "Pre-Intermediate",
        "Intermediate",
        "Upper-Intermediate",
      ],
    },
  ];

  return (
    <>
      <h2>Profile</h2>
      <form>
        {propsData.map(
          ({
            title,
            element,
            selectOptions,
            helperText,
            toggleButtonOptions,
          }) => (
            <LayoutElementWithTitle
              key={title}
              title={title}
              element={element}
              selectOptions={selectOptions}
              helperText={helperText}
              toggleButtonOptions={toggleButtonOptions}
            />
          )
        )}
      </form>
    </>
  );
}

export default ProfileEditForm;
