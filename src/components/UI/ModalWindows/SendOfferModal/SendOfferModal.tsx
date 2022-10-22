import React from "react";
import { Modal } from "antd";
import {
  ModalContainer,
  Text,
  Title,
} from "components/UI/ModalWindows/SendOfferModal/SendOfferModal.styles";

interface IProps {
  modal: boolean;
  onCancel: () => void;
  onOk: () => void;
  title: string;
  text: string;
}

function SendOfferModal({ modal, text, title, onOk, onCancel }: IProps) {
  return (
    <Modal visible={modal} onCancel={onCancel} onOk={onOk}>
      <ModalContainer>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </ModalContainer>
    </Modal>
  );
}

export default SendOfferModal;
