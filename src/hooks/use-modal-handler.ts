import { useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useModalHandler = (initialValue?: boolean) => {
  const [modal, setModal] = useState<boolean>(initialValue || false);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };

  return { modal, toggleModal };
};
