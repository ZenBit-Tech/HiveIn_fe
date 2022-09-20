import { Divider, Typography } from "antd";
import JobPost from "components/JobPost/Index";
import useGoogleAuth from "hooks/useGoogleAuth";
import { useTranslation } from "react-i18next";
import { useGetHomePostsQuery } from "services/jobPosts/setJobPostsAPI";
import { BLUE } from "utils/consts/colorConsts";
import S from "pages/JobOwner/Home/style";
import { MY_JOBS_ROUTE } from "utils/consts/routeConsts";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsDraft } from "store/slices/isDraftSlice";

const { Title } = Typography;

export default function ClientHome() {
  useGoogleAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: drafts } = useGetHomePostsQuery({
    isDraft: true,
  });

  const { data: posts } = useGetHomePostsQuery({
    isDraft: false,
  });

  const { t } = useTranslation();
  const stepsList = [
    t("Dashboard.createJobTutorial.list.item1"),
    t("Dashboard.createJobTutorial.list.item2"),
    t("Dashboard.createJobTutorial.list.item3"),
    t("Dashboard.createJobTutorial.list.item4"),
  ];

  return (
    <S.Container>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.posts")}</Title>
          <div>
            <SendButton
              onClick={() => {
                dispatch(setIsDraft({ isDraft: false }));
                navigate(MY_JOBS_ROUTE);
              }}
            >
              {t("Dashboard.buttons.seePosts")}
            </SendButton>
          </div>
        </S.TitleContainer>
        {posts ? (
          posts.map(({ createdAt, title, ...post }) => (
            <div key={post.id} style={{ margin: "15px 0", width: "100%" }}>
              <JobPost
                createdAt={new Date(createdAt)}
                name={title}
                hired={0}
                messages={0}
                proposals={0}
              />
            </div>
          ))
        ) : (
          <Title level={4}>{t("Dashboard.titles.noPosts")}</Title>
        )}
      </S.Box>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.drafts")}</Title>
          <div>
            <SendButton
              onClick={() => {
                dispatch(setIsDraft({ isDraft: true }));
                navigate(MY_JOBS_ROUTE);
              }}
            >
              {t("Dashboard.buttons.seeDrafts")}
            </SendButton>
          </div>
        </S.TitleContainer>
        {drafts ? (
          drafts.map(({ createdAt, title, ...draft }) => (
            <div key={draft.id} style={{ margin: "15px 0", width: "100%" }}>
              <JobPost isDraft createdAt={new Date(createdAt)} name={title} />
            </div>
          ))
        ) : (
          <Title level={4}>{t("Dashboard.titles.noDrafts")}</Title>
        )}
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
              <li key={item} style={{ padding: "5px 0" }}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </S.Box>
    </S.Container>
  );
}
