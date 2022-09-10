import { DollarCircleFilled, ThunderboltFilled } from "@ant-design/icons";
import { Drawer, Modal, Space, Typography } from "antd";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { SkillTag } from "components/UI/JobItem/JobItemStyles";
import {
  ContentBox,
  DrawerText,
  Grid,
  Header,
  SideContent,
  Wrapper,
} from "components/UI/SearchWorkDrawer/SearchWorkDrawerStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BLUE, BOX_BACKGROUND } from "utils/colorConsts";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface SearchWorkDrawerProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  category: string;
  description: string;
  hourlyRate: number;
  skills: string[];
  projectLenght: string;
  englishLevel: string;
  publishDate: string;
}

function SearchWorkDrawer({
  visible,
  onClose,
  title,
  category,
  description,
  hourlyRate,
  skills,
  projectLenght,
  englishLevel,
  publishDate,
}: SearchWorkDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Drawer
      title=""
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
      width="1000px"
      bodyStyle={{ backgroundColor: `${BOX_BACKGROUND}` }}
    >
      <Wrapper>
        <Grid grow={3}>
          <Header>
            <Title level={3}>{title}</Title>
          </Header>
          <ContentBox>
            <Space direction="vertical">
              <DrawerText strong color={BLUE}>
                {category}
              </DrawerText>
              <DrawerText>{dayjs(publishDate).fromNow()}</DrawerText>
            </Space>
          </ContentBox>

          <ContentBox>
            <DrawerText>{description}</DrawerText>
          </ContentBox>

          <ContentBox>
            <Title level={5}>Price and length</Title>
            <Space direction="vertical">
              <DrawerText>
                <DollarCircleFilled /> ${hourlyRate} per week
              </DrawerText>
              <DrawerText>
                <ThunderboltFilled /> {projectLenght}
              </DrawerText>
            </Space>
          </ContentBox>

          <ContentBox>
            <Title level={5}>Skills and Habilities</Title>
            <Space size={30} style={{ padding: "10px" }}>
              <Space direction="vertical">
                <DrawerText strong>English level</DrawerText>
                <DrawerText>{englishLevel}</DrawerText>
              </Space>
              <Space direction="vertical" style={{ marginLeft: "30px" }}>
                <DrawerText strong>Skills</DrawerText>
                <Space>
                  {skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </Space>
              </Space>
            </Space>
          </ContentBox>
        </Grid>

        <Grid>
          <SideContent>
            <SendButton onClick={() => setIsModalOpen(true)}>
              Send Proposal
            </SendButton>
            <Modal
              title="Basic Modal"
              visible={isModalOpen}
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default SearchWorkDrawer;
