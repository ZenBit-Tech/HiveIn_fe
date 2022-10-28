import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetMessagesMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useMessagesQuery,
  useRoomQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { ChangeEvent, useEffect, useState } from "react";
import { OfferStatus, UserRoleEnum } from "utils/enums";
import { ChatRoomStatusEnum } from "services/notifications/chatEnums";
import {
  useChangeOfferStatusMutation,
  useGetOfferIdMutation,
  useSendOfferMutation,
} from "services/jobPosts/proposalsAPI";
import useModalHandler from "hooks/use-modal-handler";
import { toast } from "react-toastify";

function useChatRoomData(userRole: UserRoleEnum) {
  const { roomId } = useParams();

  const { t } = useTranslation();

  const { data: messages } = useMessagesQuery();

  const { data: room } = useRoomQuery();

  const [sendMessage] = useSendMessageMutation();

  const [getMessages] = useGetMessagesMutation();

  const [joinRoom] = useJoinRoomMutation();

  const [leaveRoom] = useLeaveRoomMutation();

  const [sendOffer, { isSuccess, isError, error }] = useSendOfferMutation();

  const [getOfferId, { data: offer, error: updateOfferError }] =
    useGetOfferIdMutation();

  const [
    changeOfferStatus,
    { isSuccess: isOfferUpdateSuccess, isError: isOfferUpdateError },
  ] = useChangeOfferStatusMutation();

  const [text, setText] = useState<string>("");

  const { modal: sendOfferModal, toggleModal: toggleSendOfferModal } =
    useModalHandler();

  const { modal: acceptOfferModal, toggleModal: toggleAcceptOfferModal } =
    useModalHandler();
  const { modal: rejectOfferModal, toggleModal: toggleRejectOfferModal } =
    useModalHandler();

  useEffect(() => {
    if (isSuccess) {
      toast.success(t("Offer.offerSent"));
    }
    if (isError) {
      // @ts-ignore
      toast.error(error?.data.message || "Error");
    }
    if (isOfferUpdateSuccess) {
      toast.success(t("Offer.status"));
    }
    if (isOfferUpdateError) {
      // @ts-ignore
      toast.error(updateOfferError?.data.message || t("Offer.error"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isOfferUpdateSuccess, isOfferUpdateError]);

  useEffect(() => {
    if (roomId && +roomId) {
      joinRoom(+roomId);

      getMessages(+roomId);
    }
    return () => {
      if (roomId) leaveRoom(roomId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length <= 255) {
      setText(event.currentTarget.value);
    }
  };

  const onSendHandler = () => {
    if (text.trim() && roomId && +roomId) {
      sendMessage({ chatRoomId: +roomId, text });
    }
    setText("");
  };

  const defineName = (userID: number): string => {
    if (room && room.client && room.freelancer) {
      return userID === room.client.id
        ? `${room.client.firstName || "User"} ${
            room.client.lastName || "Client"
          }`
        : `${room.freelancer.firstName || "User"} ${
            room.freelancer.lastName || "Freelancer"
          }`;
    }
    return "User";
  };

  const disableInput = (): boolean => {
    if (
      userRole === UserRoleEnum.CLIENT &&
      room?.status === ChatRoomStatusEnum.CLIENT_ONLY
    ) {
      return false;
    }
    if (
      userRole === UserRoleEnum.FREELANCER &&
      room?.status === ChatRoomStatusEnum.FREELANCER_ONLY
    ) {
      return false;
    }
    return room?.status !== ChatRoomStatusEnum.FOR_ALL;
  };

  const [isDisabled, setIsDisabled] = useState(disableInput());
  useEffect(() => {
    setIsDisabled(disableInput());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status]);

  const sendOfferHandler = async () => {
    if (room) {
      await sendOffer({
        jobPostId: room.jobPost.id,
        freelancerId: room.freelancer.freelancerId,
      });
      toggleSendOfferModal();
    }
  };

  const acceptButtonHandler = async () => {
    if (room) {
      await getOfferId({
        jobPostId: room.jobPost.id,
        freelancerId: room.freelancer.freelancerId,
      });
      toggleAcceptOfferModal();
    }
  };

  const rejectButtonHandler = async () => {
    if (room) {
      await getOfferId({
        jobPostId: room.jobPost.id,
        freelancerId: room.freelancer.freelancerId,
      });
      toggleRejectOfferModal();
    }
  };

  const onAcceptOfferHandler = async () => {
    if (offer) {
      await changeOfferStatus({ id: offer.id, status: OfferStatus.ACCEPTED });
      toggleAcceptOfferModal();
    }
  };

  const onRejectOfferHandler = async () => {
    if (offer) {
      await changeOfferStatus({ id: offer.id, status: OfferStatus.REJECTED });
      toggleRejectOfferModal();
    }
  };

  return {
    isDisabled,
    defineName,
    room,
    roomId,
    t,
    messages,
    onSendHandler,
    onChangeHandler,
    text,
    sendOffer,
    sendOfferHandler,
    sendOfferModal,
    toggleSendOfferModal,
    acceptOfferModal,
    toggleAcceptOfferModal,
    rejectOfferModal,
    toggleRejectOfferModal,
    acceptButtonHandler,
    rejectButtonHandler,
    onAcceptOfferHandler,
    onRejectOfferHandler,
  };
}

export default useChatRoomData;
