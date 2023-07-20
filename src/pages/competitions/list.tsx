import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useGetIdentity,
} from "@refinedev/core";
import { useTable, List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { ICompetition, IUser } from "@/interfaces";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
export const CompetitionList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();
  const isLoggedIn = !!user;

  const { tableProps } = useTable<ICompetition>({
    syncWithLocation: true,
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

  return (
    <List
      title="Competitions you host"
      createButtonProps={{ className: "bg-blue-500" }}
    >
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
            // <Link to={`/competition/${record.slug}`}>{record.name}</Link>
            <Link to={`/competitions/show/${record.id}`}>{record.name}</Link>
          )}
        />
        <Table.Column
          title="Created At"
          dataIndex="created_at"
          render={(_, record: BaseRecord) => (
            <>{dayjs(record.created_at).format("MMMM D, YYYY HH:MM")}</>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
