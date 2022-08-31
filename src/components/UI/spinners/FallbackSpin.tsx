import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "styled-components";

const FallBackSpinStyle = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 50%;
`;

function FallBackSpin() {
  const loadingIcon = <LoadingOutlined style={{ fontSize: "30px" }} spin />;

  return <FallBackSpinStyle indicator={loadingIcon} />;
}

export default FallBackSpin;
