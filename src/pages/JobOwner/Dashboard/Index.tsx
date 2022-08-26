import React from "react";
import { Button, Divider, Typography } from "antd";
import JobPost from "components/JobPost/Index";
import TextField from "components/UI/textField/TextField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BLUE } from "utils/colorConsts";
import { yupResolver } from "@hookform/resolvers/yup";
import S from "./style";
import resolver from "./schema";

export default function Dashboard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resolver),
  });
  const { Title } = Typography;

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
  const { t } = useTranslation();
  const stepsList = [
    t("Dashboard.createJobTutorial.list.item1"),
    t("Dashboard.createJobTutorial.list.item2"),
    t("Dashboard.createJobTutorial.list.item3"),
    t("Dashboard.createJobTutorial.list.item4"),
  ];

  function onSubmit(evt: any) {
    return evt;
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "50%" }}>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="name"
              type="text"
              width="full"
              helperText="Name*"
              control={control}
            />
          </S.InputBox>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="description"
              multiline
              type="text"
              width="full"
              helperText="Description of your company"
              rows={5}
              control={control}
            />
          </S.InputBox>
          <Button htmlType="submit" shape="round" size="large" type="primary">
            {t("Dashboard.buttons.save")}
          </Button>
        </div>
        <Button shape="round" size="large" type="primary">
          {t("Dashboard.buttons.createPosts")}
        </Button>
      </S.Form>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.posts")}</Title>
          <Button shape="round" size="large" type="primary">
            {t("Dashboard.buttons.seePosts")}
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
          <Title level={4}>{t("Dashboard.titles.drafts")}</Title>
          <Button shape="round" size="large" type="primary">
            {t("Dashboard.buttons.seeDrafts")}
          </Button>
        </S.TitleContainer>
        {mockPosts.map(({ createdAt, name }) => (
          <div key={name} style={{ margin: "15px 0", width: "100%" }}>
            <JobPost createdAt={createdAt} name={name} />
          </div>
        ))}
        <Divider />
      </S.Box>
      <S.Box>
        <div style={{ width: "45%" }}>
          <Title level={4} style={{ color: BLUE }}>
            {t("Dashboard.createJobTutorial.title")}
          </Title>
          <span>
            {t("Dashboard.createJobTutorial.subtitle.start")}{" "}
            <span style={{ color: BLUE }}>
              {t("Dashboard.createJobTutorial.subtitle.focus")}
            </span>{" "}
            {t("Dashboard.createJobTutorial.subtitle.end")}
          </span>
          <ol>
            {stepsList.map((item) => (
              <li style={{ padding: "5px 0" }}>{item}</li>
            ))}
          </ol>
        </div>
      </S.Box>
    </S.Container>
  );
}
