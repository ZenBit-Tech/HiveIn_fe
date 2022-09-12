import React from "react";
import styled from "styled-components";
import ContractStatusEnum from "utils/enums";
import { DARK_BLUE } from "utils/consts/colorConsts";

interface IContract {
  contractStatus: ContractStatusEnum;
  endDate: Date | undefined;
  startDate: Date | undefined;
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  border: 1px solid ${DARK_BLUE};
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
`;
function Contract(props: IContract) {
  const { contractStatus, endDate, startDate } = props;
  return (
    <Block>
      <div>
        <span>Contract status: </span>
        <span>{contractStatus}</span>
      </div>
      <div>General info</div>
      <div>
        <button type="button">Go to chat</button>
      </div>
      <div>
        <span>Start date: </span>
        <span>{startDate?.toISOString() || "None"}</span>
        <span>End date: </span>
        <span>{endDate?.toISOString() || "None"}</span>
      </div>
    </Block>
  );
}

export default Contract;
