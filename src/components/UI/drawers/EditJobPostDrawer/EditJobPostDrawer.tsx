import React, { Dispatch } from "react";
import { Drawer } from "antd";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import EditJobPostForm from "components/EditJobPostForm/EditJobPostForm";
import CreateJobPostForm from "components/CreateJobPostForm/CreateJobPostForm";
import { IJobPostFormFields } from "components/CreateJobPostForm/typesDef";

interface IDrawerProps {
  id: number;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}

function EditJobPostDrawer({ id, isOpen, setIsOpen }: IDrawerProps) {
  const { data: postData, isSuccess } = useGetOneJobPostQuery({ id });

  const renderForm = () => {
    if (postData?.isDraft) {
      const { category, duration, skills, rate, jobDescription, ...rest } =
        postData;

      const postFormProps: IJobPostFormFields = {
        ...rest,
        skills: [],
        duration: `${duration || ""}`,
        jobDescription: jobDescription || "",
        rate: `${rate || ""}`,
        file: null,
        categoryId: category.id,
      };

      return (
        <CreateJobPostForm
          queriedSkills={skills}
          existedDraftData={postFormProps}
          setIsOpen={setIsOpen}
        />
      );
    }
    return (
      <EditJobPostForm
        postId={id}
        jobDescription={postData?.jobDescription!}
        rate={postData?.rate!}
        setIsOpen={setIsOpen}
      />
    );
  };

  return (
    <Drawer width="60%" visible={isOpen} onClose={() => setIsOpen(false)}>
      {isSuccess && renderForm()}
    </Drawer>
  );
}

export default EditJobPostDrawer;
