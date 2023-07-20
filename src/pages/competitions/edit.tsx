import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import { ICompetition } from "@/interfaces";
import ReactQuill from "react-quill";
import dayjs from "dayjs";

export const CompetitionEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } =
    useForm<ICompetitionProps>();
  const { data: identity } = useGetIdentity<{
    id: number;
    full_name: string;
  }>();
  if (queryResult?.data?.data?.user_id !== identity?.id) {
    return <>No permission </>;
  }
  // const handleOnFinish = (value: any) => {
  //   onFinish({
  //     user_id: identity?.id,
  //     slug:
  //       value.name
  //         .toLowerCase()
  //         .replace(/ /g, "-")
  //         .replace(/[^\w-]+/g, "") +
  //       "-" +
  //       Math.floor(Math.random() * 1000000),
  //     ...value,
  //   });
  // };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
          <ReactQuill
            theme="snow"
            placeholder="Provide detail instruction with the competition"
          />
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
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
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
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime={true} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
interface ICompetitionProps {
  user_id: string;
  name: string;
  body: string;
  description: string;
  start_date: string;
  end_date: string;
}
