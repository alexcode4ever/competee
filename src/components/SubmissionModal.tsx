import { Button, Modal, Space } from "antd";
import { useState } from "react";
import parse from "html-react-parser";
import dayjs from "dayjs";
import { VoteWidget } from "./VoteWidget";
import { useList } from "@refinedev/core";
type VoteProps = {
  id: number;
  challenger_id: number;
};

export const SubmissionModal: React.FC<{
  isLoggedIn: boolean;
  data: any;
  record: any;
  user: any;
}> = ({ isLoggedIn, data, record, user }) => {
  const [open, setOpen] = useState(false);

  let userName = data?.data.find(
    (u: { id: any }) => u.id === record?.id
  )?.full_name;
  userName = userName ? userName : "Anonymous";
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const {
    data: votedResult,
    isLoading: votedLoading,
    isFetching: votedFetching,
  } = useList<VoteProps>({
    resource: "votes",
    queryOptions: { enabled: isLoggedIn },
    filters: [
      {
        field: "user_id",
        value: user?.id,
        operator: "eq",
      },
      {
        field: "challengers_id",
        value: record?.id,
        operator: "eq",
      },
    ],
  });
  const voted = votedResult?.data[0];

  const {
    data: votedCountResult,
    isLoading: votedCountLoading,
    isFetching: votedCountFetching,
  } = useList<VoteProps>({
    resource: "votes",
    queryOptions: { enabled: isLoggedIn },
    filters: [
      {
        field: "challengers_id",
        value: record?.id,
        operator: "eq",
      },
    ],
  });
  const votedCount = votedResult?.data.length;

  return (
    <>
      <Space>
        <Button onClick={showModal} className=" bg-cyan-500 text-white">
          🔎 View
        </Button>
        <VoteWidget
          isLoggedIn={isLoggedIn}
          voted={voted}
          user={user}
          id={record?.id}
          key={record?.id}
        />
        <div>👍 {votedCount}</div>
      </Space>

      <Modal
        key={record?.id}
        open={open}
        onCancel={handleCancel}
        title={`Submission by user ${userName} on ${dayjs(
          record.submission_date
        ).format("MMM DD, YYYY hh:mm")}`}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <VoteWidget
            isLoggedIn={isLoggedIn}
            voted={voted}
            user={user}
            id={record?.id}
            key={record?.id}
          />,
        ]}
      >
        {parse(record?.body)}
      </Modal>
    </>
  );
};
