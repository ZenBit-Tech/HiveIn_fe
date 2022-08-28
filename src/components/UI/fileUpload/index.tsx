import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile } from "antd";
import { UploadProps } from "antd/lib/upload";
import React, { useState } from "react";
import S from "./style";

function FileUpload() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    multiple: true,
    listType: "picture",
  };

  return (
    <S.Wrapper>
      <Upload {...props} style={{ marginBottom: "15px" }}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </S.Wrapper>
  );
}

export default FileUpload;
