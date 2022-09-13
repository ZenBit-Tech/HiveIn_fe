/* eslint-disable */
import React, { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import options, {
  values,
} from "components/UI/DropdownMenus/LongMenu/staticData";
import ModalRemoveJobPost from "components/UI/ModalWindows/ModalRemoveJobPost/ModalRemoveJobPost";
import ModalEditPost from "components/UI/ModalWindows/ModalEditJobPost/ModalEditJobPost";

const ITEM_HEIGHT = 48;

function LongMenu({ link, id }: { link: string; id: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeeFullInfo = () => {
    navigate(link);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setIsDeleteModalOpen(true);
  };

  const handleChooseOption = (event: MouseEvent<HTMLLIElement>) => {
    const { value } = event.target as HTMLLIElement;

    switch (value) {
      case values.seeFullInfo:
        handleSeeFullInfo();
        break;
      case values.editPost:
        handleEdit();
        break;
      case values.deletePost:
        handleDelete();
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map(({ text, value }) => (
            <MenuItem key={value} value={value} onClick={handleChooseOption}>
              {text}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <ModalRemoveJobPost
        id={id}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
      <ModalEditPost
        id={id}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
}

export default LongMenu;
