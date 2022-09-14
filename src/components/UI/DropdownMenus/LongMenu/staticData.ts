import i18next from "localization/en/en.json";

type TOption = {
  value: number;
  text: string;
};

export const values = Object.freeze({
  seeFullInfo: 1,
  editPost: 2,
  deletePost: 3,
});

export const linkItem: TOption = {
  value: values.seeFullInfo,
  text: i18next.EditDeletePost.menuOptions.seeMore,
};

const options: TOption[] = [
  {
    value: values.editPost,
    text: i18next.EditDeletePost.menuOptions.edit,
  },
  {
    value: values.deletePost,
    text: i18next.EditDeletePost.menuOptions.delete,
  },
];

export default options;
