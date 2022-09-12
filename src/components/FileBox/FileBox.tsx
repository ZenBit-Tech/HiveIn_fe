import React, { Dispatch } from "react";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SDiv, SP } from "components/FileBox/styles";
import { createJobAttachmentFileTypes } from "utils/consts/fileTypes";

type TProps = {
  file: File;
  handlerRemove: Dispatch<null | File>;
};

function FileBox({ file, handlerRemove }: TProps) {
  const renderIcon = (): JSX.Element | null => {
    switch (file.type) {
      case createJobAttachmentFileTypes.jpeg:
      case createJobAttachmentFileTypes.jpg:
      case createJobAttachmentFileTypes.png:
        return <ImageIcon />;
      case createJobAttachmentFileTypes.pdf:
        return <PictureAsPdfIcon />;
      case createJobAttachmentFileTypes.word:
      case createJobAttachmentFileTypes.txt:
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
