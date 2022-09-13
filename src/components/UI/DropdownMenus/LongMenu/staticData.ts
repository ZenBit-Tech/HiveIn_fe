type TOption = {
  value: number;
  text: string;
};

export const values = Object.freeze({
  seeFullInfo: 1,
  editPost: 2,
  deletePost: 3,
});

const options: TOption[] = [
  {
    value: values.seeFullInfo,
    text: "See Post",
  },
  {
    value: values.editPost,
    text: "Edit Post",
  },
  {
    value: values.deletePost,
    text: "Delete",
  },
];

export default options;
