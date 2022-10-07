import { Modal } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useChangeOfferStatusMutation } from "services/jobPosts/proposalsAPI";
import { OfferStatus } from "utils/enums";

interface IUseJobOfferStatusProps {
  id: string;
  refetch: () => void;
}

export const useJobOfferStatus = ({ id, refetch }: IUseJobOfferStatusProps) => {
  const { t } = useTranslation();

  const [runChangeOfferStatus, { isError, isLoading, isSuccess }] =
    useChangeOfferStatusMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(`${t("Offer.status")}`);

      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(`${t("Offer.status")}`);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleAccept = async () => {
    Modal.confirm({
      title: `${t("Offer.confirmAccept")}`,
      onOk: async () => {
        await runChangeOfferStatus({ id, status: OfferStatus.ACCEPTED });
      },
    });
  };

  const handleDecline = async () => {
    Modal.confirm({
      title: `${t("Offer.confirmReject")}`,
      onOk: async () => {
        await runChangeOfferStatus({ id, status: OfferStatus.REJECTED });
      },
    });
  };

  const handleExpired = async () => {
    await runChangeOfferStatus({ id, status: OfferStatus.EXPIRED });
  };

  return { handleAccept, handleDecline, handleExpired };
};

export default useJobOfferStatus;
