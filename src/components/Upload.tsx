import { Upload, UploadFile } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/es/upload/interface";

interface Props extends UploadProps {
  getListUrl?: (listUrl?: string[]) => void;
}
const UploadImg = (props: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return (
    <Upload
      action={`${process.env.NEXT_PUBLIC_SERVER_API}/upload/single`}
      listType="picture-card"
      onRemove={(file) => {
        if (fileList.length) return true;
      }}
      maxCount={1}
      fileList={fileList}
      onChange={(info) => {
        setFileList(info.fileList);
        const getUrl = info.fileList[0]?.response?.url as string;
        props.getListUrl?.([getUrl]);
      }}
      className="!w-full [&_.ant-upload]:!w-full [&_.ant-upload-select]:!w-full [&_.ant-upload-list-item-container]:!w-full [&_.ant-upload-list-item-container]:!h-auto"
      {...props}
    >
      <div className="flex flex-col items-center justify-center h-[200px]">
        <UploadOutlined className="text-2xl" />
        <div className="mt-2">Tải lên ảnh</div>
      </div>
    </Upload>
  );
};

export default UploadImg;
