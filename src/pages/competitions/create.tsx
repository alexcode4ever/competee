import { useGetIdentity } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import ReactQuill from "react-quill";
import { supabaseClient } from "@/utility";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const CompetitionCreate: React.FC = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } =
    useForm<ICompetitionProps>();
  const { data: identity } = useGetIdentity<{
    id: number;
    full_name: string;
  }>();
  const [imagePath, setImagePath] = useState("");
  const [imageuuid, setImageuuid] = useState("");

  if (imageuuid == "") {
    setImageuuid(uuidv4());
  }

  const handleOnFinish = (value: any) => {
    console.log(value);
    onFinish({
      user_id: identity?.id,
      slug:
        value.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "") +
        "-" +
        Math.floor(Math.random() * 1000000),
      banner_url: imagePath,
      ...value,
    });
  };

  async function uploadFile(e: any) {
    const file = e.target.files[0];

    const { data: returnData, error } = await supabaseClient.storage
      .from("banner")
      .upload(identity?.id + "/" + imageuuid + file.name, file, {
        cacheControl: "3600",
        upsert: true,
      });
    const { data: returnPath } = supabaseClient.storage
      .from("banner")
      .getPublicUrl(`${returnData?.path}`);
    if (returnData?.path !== undefined) {
      setImagePath(returnPath.publicUrl);
    } else {
      setImagePath("");
    }
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item
          label="Name of Competition"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input a name for the competition.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Short Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input a short description for the competition.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Competition instructions"
          name="body"
          rules={[
            {
              required: true,
              message: "Please input a name for the Competition.",
            },
          ]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        <Form.Item label="Banner Image">
          <input type="file" onChange={uploadFile} />
          {imagePath}
        </Form.Item>
        <Form.Item
          label="Competition start date"
          name="start_date"
          rules={[
            {
              required: true,
              message: "Please select a start date for the Competition.",
            },
          ]}
        >
          <DatePicker showTime={true} />
        </Form.Item>
        <Form.Item
          label="Competition end date"
          name="end_date"
          rules={[
            {
              required: true,
              message: "Please select a end date for the Competition.",
            },
          ]}
        >
          <DatePicker showTime={true} />
        </Form.Item>
      </Form>
    </Create>
  );
};
interface ICompetitionProps {
  name: string;
  body: string;
  description: string;
  start_date: string;
  end_date: string;
}
