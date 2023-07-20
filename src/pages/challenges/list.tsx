import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
  useGetIdentity,
} from "@refinedev/core";
import { useTable, List } from "@refinedev/antd";
import { Table, Space } from "antd";
import { IChallenge, IUser } from "@/interfaces";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const ChallengesList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  const { tableProps, tableQueryResult } = useTable<IChallenge>({
    resource: "challengers",
    syncWithLocation: true,
    meta: {
      select: "*, competitions(id)",
    },
    filters: {
      permanent: [
        {
          field: "user_id",
          operator: "eq",
          value: user?.id,
        },
      ],
    },
  });
  const { data: competitionData, isLoading: competitionLoading } = useMany({
    resource: "competitions",
    ids: tableQueryResult.data?.data?.map((item) => item.competition_id) || [],
  });
  console.log(competitionData, competitionLoading);
  return (
    <List title="Competitions you entered">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="ID"
          dataIndex="id"
          render={(_, record: BaseRecord) => <div>{record.id}</div>}
        />
        <Table.Column
          title="Competition Name"
          dataIndex="name"
          render={(_, record: BaseRecord) => (
            <Link to={`/competitions/show/${record.competition_id}`}>
              {
                competitionData?.data.find(
                  (competition) => competition.id === record.competition_id
                )?.name
              }
            </Link>
          )}
        />
        <Table.Column
          title="Submission recieved"
          dataIndex="id"
          render={(_, record: BaseRecord) => (
            <div>{record.isSubmitted ? "Yes" : "No"}</div>
          )}
        />
        <Table.Column
          title="Submission date"
          dataIndex="id"
          render={(_, record: BaseRecord) => (
            <div>
              {record.isSubmitted
                ? dayjs(record.submission_date).format("MMM DD, YYYY hh:mm")
                : "No submission"}
            </div>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              {/* <EditButton hideText size="small" recordItemId={record.id} /> */}
              {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
              {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
