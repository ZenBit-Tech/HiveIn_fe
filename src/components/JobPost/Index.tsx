import { Typography } from "antd";
import React from "react";
import { formatDistance } from "date-fns";
import S from "./style";

interface JobPostProps {
  name: string;
  createdAt: Date;
  proposals?: number;
  messages?: number;
  hired?: number;
  createdBy?: string;
}

export default function JobPost({
  name,
  createdAt,
  hired,
  messages,
  proposals,
  createdBy,
}: JobPostProps) {
  const { Title, Text } = Typography;
  return (
    <S.Box>
      <Title level={4}>{name}</Title>
      <S.Footer>
        <S.TextBox>
          <Text>{`Posted ${formatDistance(new Date(), createdAt)} by ${
            createdBy || "you"
          }`}</Text>
        </S.TextBox>
        <S.TextContainer>
          <S.TextBox>
            <Text>{proposals}</Text>
            <Text>Proposals</Text>
          </S.TextBox>
          <S.TextBox>
            <Text>{messages}</Text>
            <Text>Messages</Text>
          </S.TextBox>
          <S.TextBox>
            <Text>{hired}</Text>
            <Text>Hired</Text>
          </S.TextBox>
        </S.TextContainer>
      </S.Footer>
    </S.Box>
  );
}

JobPost.defaultProps = {
  hired: 0,
  messages: 0,
  proposals: 0,
  createdBy: "",
};
