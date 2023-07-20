import React from "react";
import { Avatar, Card, Spin, Table } from "antd";
import {
  useGetIdentity,
  HttpError,
  useMany,
  BaseRecord,
} from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { IUser } from "@/interfaces";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { SubmissionModal } from "./SubmissionModal";

export const Challengers: React.FC<{ id: number | undefined }> = ({ id }) => {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<IUser>();

  const isLoggedIn = !!user;
  type ChallengeProps = {
    id: number;
    competition_id: number;
    user_id: string;
    body: string;
    submission_date: string;
    is_submitted: boolean;
  };
  const { tableProps, tableQueryResult } = useTable<ChallengeProps, HttpError>({
    resource: "challengers",
    queryOptions: { enabled: true },
    filters: {
      permanent: [
        {
          field: "competition_id",
          value: id,
          operator: "eq",
        },
        {
          field: "is_submitted",
          value: true,
          operator: "eq",
        },
      ],
    },
  });

  const { data } = useMany({
    resource: "users",
    ids: tableQueryResult?.data?.data.map((c) => c.user_id) || [],
  });
  if (userIsLoading || tableProps.loading) {
    return (
      <div className="ml-20 mb-20 px-10 py-20 text-center">
        <Spin />
      </div>
    );
  }

  return (
    <Card title="Challengers Submission">
      {!tableQueryResult && <div>No submissions yet</div>}
      {tableQueryResult && (
        <Table {...tableProps} rowKey="id">
          <Table.Column
            title=""
            dataIndex="user_id"
            key="user_id"
            render={(text) => {
              const img = data?.data.find((u) => u.id === text)?.avatar_url;
              return (
                <>
                  {img ? (
                    <Avatar src={<img src={img} alt="avatar" />} />
                  ) : (
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  )}
                </>
              );
            }}
          />

          <Table.Column
            title="Participant"
            dataIndex="user_id"
            key="user_id"
            render={(_, record: BaseRecord) => {
              let userName = data?.data.find(
                (u) => u.id === record?.id
              )?.full_name;
              userName = userName ? userName : "Anonymous";
              return userName;
            }}
          />
          <Table.Column
            title="Submission Date"
            dataIndex="submission_date"
            render={(text) => <>{dayjs(text).format("MMM DD, YYYY hh:mm")}</>}
          />
          <Table.Column
            title="Info"
            render={(_, record: BaseRecord) => (
              <SubmissionModal
                data={data}
                record={record}
                isLoggedIn={isLoggedIn}
                user={user}
              />
            )}
          />
        </Table>
      )}
    </Card>
  );
};
