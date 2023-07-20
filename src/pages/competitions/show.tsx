import React from "react";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useShow,
} from "@refinedev/core";
import {
  EditButton,
  DeleteButton,
  Show,
  ListButton,
  RefreshButton,
} from "@refinedev/antd";
import { Row, Col } from "antd";
import { ICompetition, IUser } from "@/interfaces";
import { Competition } from "@/components/Competition";
import { CompetitionDetail } from "@/components/CompetitionDetail";
import { Submission } from "@/components/Submission";
import { Challengers } from "@/components/Challengers";

export const CompetitionShow: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  const { queryResult } = useShow<ICompetition>();
  const { data, isLoading } = queryResult;
  const competition = data?.data;

  return (
    <Show
      headerButtons={({
        deleteButtonProps,
        editButtonProps,
        listButtonProps,
        refreshButtonProps,
      }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          {editButtonProps && user?.id == competition?.user_id && (
            <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
          )}
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
          )}
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
        </>
      )}
    >
      {" "}
      <Row gutter={[16, { xs: 8, sm: 8, md: 16, lg: 16 }]}>
        <Col xs={24} sm={24} md={10}>
          <Competition
            id={competition?.id}
            key={competition?.slug}
            user_id={competition?.user_id || ""}
            name={competition?.name || ""}
            slug={competition?.slug || ""}
            body={competition?.body || ""}
            description={competition?.description || ""}
            startDate={competition?.start_date || ""}
            endDate={competition?.end_date || ""}
            bannerURL={competition?.banner_url || ""}
            showViewButton={false}
          />
          <Submission id={competition?.id} />
          <Challengers id={competition?.id} />
        </Col>
        <Col xs={24} sm={24} md={14}>
          <CompetitionDetail
            id={competition?.id}
            key={competition?.slug}
            name={competition?.name || ""}
            slug={competition?.slug || ""}
            body={competition?.body || ""}
            description={competition?.description || ""}
          />
        </Col>
      </Row>
    </Show>
  );
};
