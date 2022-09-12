import { useState } from "react";

const useModalHandler = (initialValue?: boolean) => {
  const [modal, setModal] = useState<boolean>(initialValue || false);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };

  return { modal, toggleModal };
};
export default useModalHandler;
