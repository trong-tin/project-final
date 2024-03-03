import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getJob } from "../../Services/usersServices";
import TextArea from "antd/es/input/TextArea";
function DetailtJob(props) {
  const { idJob } = props;
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchApi = async () => {
      const responseJob = await getJob(idJob);
      setData(responseJob[0]);
    };
    fetchApi();
  }, [idJob]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{ marginLeft: "0.5em" }}
        icon={<EyeOutlined />}
        title="Chi tiết công việc"
      ></Button>
      <Modal
        title="Chi tiết công việc"
        open={isModalOpen}
        onOk={handleOk}
        width={"90%"}
        onCancel={handleCancel}
      >
        {data && (
          <Form layout="vertical" initialValues={data} form={form}>
            <Form.Item name="name" label="Tên công việc">
              <Input />
            </Form.Item>
            <Form.Item name="tags" label="Ngôn ngữ">
              {data.tags &&
                data.tags.map((item) => <Tag color="green">{item}</Tag>)}
            </Form.Item>
            <Form.Item name="salary" label="Mức lương">
              <Input />
            </Form.Item>
            <Form.Item name="createAt" label="Thời gian đăng bài">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <TextArea rows={9} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
export default DetailtJob;
