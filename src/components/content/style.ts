import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";
import { BOX_BACKGROUND } from "utils/consts/colorConsts";

const ContentStyles = styled(Content)`
  flex: 1 0 100%;
  padding: 25px 50px;
  background-color: ${BOX_BACKGROUND};
`;

export default ContentStyles;
