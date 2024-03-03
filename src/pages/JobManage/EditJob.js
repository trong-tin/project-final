import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Switch, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { editJob, getJob, getTags } from "../../Services/usersServices";
import TextArea from "antd/es/input/TextArea";
function EditJob(props) {
  const { modal, idJob, loading, setLoading } = props;
  const [data, setData] = useState([]);
  const [dataTags, setDataTags] = useState([]);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchApi = async () => {
      const responseJob = await getJob(idJob);
      setData(responseJob[0]);
      const responseTags = await getTags();
      setDataTags(responseTags);
    };
    fetchApi();
  }, []);
  let option = [];
  dataTags.map((item) =>
    option.push({
      label: item.value,
      value: item.value,
    })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(modal);
  };
  const handleOk = () => {
    form.validateFields().then((options) => {
      editJob(idJob, options);
      if (editJob) {
        setLoading(!loading);
        setIsModalOpen(false);
        mess.success("Bạn đã chỉnh sửa thành công");
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFinish = (value) => {
    console.log(value);
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        style={{ background: "#F3C677", marginRight: "0.5em" }}
        icon={<EditOutlined />}
        title="Chỉnh sửa"
      ></Button>
      <Modal
        title="Chỉnh sửa Job"
        open={isModalOpen}
        onOk={handleOk}
        width={"80%"}
        onCancel={handleCancel}
      >
        {data && (
          <Form
            layout="vertical"
            initialValues={data}
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item name="name" label="Tên Job">
              <Input />
            </Form.Item>
            <Form.Item name="tags" label="Ngôn ngữ">
              <Checkbox.Group options={option} />
            </Form.Item>
            <Form.Item name="salary" label="Mức lương">
              <Input addonAfter="$" />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <TextArea rows={9} />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái tuyển dụng">
              <Switch />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
export default EditJob;
