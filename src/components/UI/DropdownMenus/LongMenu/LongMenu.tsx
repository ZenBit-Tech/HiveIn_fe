import React, { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";
import options, {
  linkItem,
  values,
} from "components/UI/DropdownMenus/LongMenu/staticData";
import ModalRemoveJobPost from "components/UI/ModalWindows/ModalRemoveJobPost/ModalRemoveJobPost";
import EditJobPostDrawer from "components/UI/drawers/EditJobPostDrawer/EditJobPostDrawer";
import { MY_JOBS_ROUTE } from "utils/consts/routeConsts";

const ITEM_HEIGHT = 48;

function LongMenu({ link, id }: { link?: string; id: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const postRoute = `${MY_JOBS_ROUTE}/${id}`;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeeFullInfo = () => {
    if (link) navigate(link);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsEditDrawerOpen(true);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setIsDeleteModalOpen(true);
    if (pathname === postRoute) navigate(MY_JOBS_ROUTE);
  };

  const handleChooseOption = (event: MouseEvent<HTMLLIElement>) => {
    const { value } = event.target as HTMLLIElement;

    // eslint-disable-next-line default-case
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
          {link && (
            <MenuItem value={linkItem.value} onClick={handleChooseOption}>
              {linkItem.text}
            </MenuItem>
          )}
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
      <EditJobPostDrawer
        id={id}
        isOpen={isEditDrawerOpen}
        setIsOpen={setIsEditDrawerOpen}
      />
    </>
  );
}

LongMenu.defaultProps = {
  link: "",
};

export default LongMenu;
