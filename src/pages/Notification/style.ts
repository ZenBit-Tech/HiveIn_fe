import styled from "styled-components";
import {
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  LIGHT_GRAY,
} from "utils/consts/colorConsts";

const NotificationBox = styled.div`
  width: 230px;
  border-radius: 12px;
  height: 85px;
  background-color: ${LIGHT_GRAY};
  margin: 15px 0;
  padding: 5px;
  cursor: pointer;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;
`;

export default { NotificationBox };
