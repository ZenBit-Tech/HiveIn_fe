import { Button, Divider, Typography } from "antd";
import JobPost from "components/JobPost/Index";
import TextField from "components/UI/textField/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { BLUE } from "utils/colorConsts";
import S from "./style";

export default function Dashboard() {
  const { control } = useForm();
  const { Title, Text } = Typography;

  const mockPosts = [
    {
      name: "Full stack developer",
      hired: 0,
      messages: 15,
      proposals: 8,
      createdAt: new Date(),
    },
    {
      name: "Frontend developer",
      hired: 0,
      messages: 10,
      proposals: 13,
      createdAt: new Date(),
    },
  ];
  return (
    <S.Container>
      <S.Form>
        <div style={{ width: "50%" }}>
          <S.InputBox>
            <TextField
              formFieldName="name"
              type="text"
              width="full"
              helperText="Name*"
              control={control}
            />
          </S.InputBox>
          <S.InputBox>
            <TextField
              formFieldName="description"
              multiline
              type="text"
              width="full"
              helperText="Description of your company"
              rows={5}
              control={control}
            />
          </S.InputBox>
        </div>
        <Button shape="round" size="large" type="primary">
          Post a job
        </Button>
      </S.Form>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>Your postings</Title>
          <Button shape="round" size="large" type="primary">
            See all postings
          </Button>
        </S.TitleContainer>
        {mockPosts.map(({ createdAt, hired, messages, name, proposals }) => (
          <div key={name} style={{ margin: "15px 0", width: "100%" }}>
            <JobPost
              createdAt={createdAt}
              name={name}
              hired={hired}
              messages={messages}
              proposals={proposals}
            />
          </div>
        ))}
      </S.Box>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>Your drafts</Title>
          <Button shape="round" size="large" type="primary">
            See all drafts
          </Button>
        </S.TitleContainer>
        {mockPosts.map(({ createdAt, name }) => (
          <div key={name} style={{ margin: "15px 0", width: "100%" }}>
            <JobPost createdAt={createdAt} name={name} />
          </div>
        ))}
      </S.Box>
      <S.Box>
        <Title level={4} style={{ color: BLUE }}>
          What is there for you in a Talent?
        </Title>
        <Text>
          {`A huge community with millions of talented professionals within
          ${(<Text style={{ color: BLUE }}>4 steps</Text>)} away`}
        </Text>
      </S.Box>
    </S.Container>
  );
}
