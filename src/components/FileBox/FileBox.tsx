import React, { Dispatch } from "react";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SDiv, SP } from "components/FileBox/styles";

type TProps = {
  file: File;
  handlerRemove: Dispatch<null | File>;
};

function FileBox({ file, handlerRemove }: TProps) {
  const fileTypes = {
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    png: "image/png",
    pdf: "application/pdf",
    word: "application/msword",
    txt: "text/plain",
  };

  const renderIcon = (): JSX.Element | null => {
    switch (file.type) {
      case fileTypes.jpeg:
      case fileTypes.jpg:
      case fileTypes.png:
        return <ImageIcon />;
      case fileTypes.pdf:
        return <PictureAsPdfIcon />;
      case fileTypes.word:
      case fileTypes.txt:
        return <DescriptionIcon />;
      default:
        return null;
    }
  };

  return (
    <SDiv>
      {renderIcon()}
      <SP>{file.name}</SP>
      <IconButton onClick={() => handlerRemove(null)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </SDiv>
  );
}

export default FileBox;
