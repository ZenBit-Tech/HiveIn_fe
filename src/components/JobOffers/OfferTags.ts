import {
  TAG_CLOSED,
  TAG_PENDING,
  TAG_SUCCESS,
  TEXT_GRAY,
} from "utils/consts/colorConsts";

// eslint-disable-next-line import/prefer-default-export
export const OfferTags = {
  pending: TAG_PENDING,
  accepted: TAG_SUCCESS,
  rejected: TAG_CLOSED,
  expired: TEXT_GRAY,
};
