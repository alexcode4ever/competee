import { RefineHackathon } from "@/components/RefineHackathon";
import { MenuTop } from "@/components/Menu";
import React from "react";
import { ICompetition, IUser } from "@/interfaces";
import { useGetIdentity, useOne, useParse } from "@refinedev/core";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb, Col, Row } from "antd";
import { Competition } from "@/components/Competition";
import { CompetitionDetail } from "@/components/CompetitionDetail";
import { Challengers } from "@/components/Challengers";
import { Submission } from "@/components/Submission";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HomeOutlined } from "@ant-design/icons";

export const CompetePage: React.FC = () => {
  const parse = useParse();
  const { params } = parse();
  const { data: user } = useGetIdentity<IUser>();
  const isLoggedIn = !!user;
  const {
    data: queryResult,
    isLoading,
    isFetching,
  } = useOne<ICompetition>({
    resource: "competitions",
    id: params?.slug,
    meta: {
      idColumnName: "slug",
    },
  });
  const competition = queryResult?.data;
  return (
    <div>
      <ScrollToTop />
      <Content className="site-layout" style={{}}>
        <Row>
          <Col xs={0} sm={0} md={1}></Col>
          <Col xs={24} sm={24} md={22}>
            <div style={{ padding: 24, minHeight: 380, background: "white" }}>
              <Breadcrumb
                items={[
                  {
                    href: "/",
                    title: <HomeOutlined />,
                  },
                  {
                    href: "",
                    title: (
                      <>
                        <span>{competition?.name || ""}</span>
                      </>
                    ),
                  },
                ]}
              />
              {isLoading && <div className="">Loading competition...</div>}
              {!competition?.id && !isFetching && (
                <div className="article-preview">No competition</div>
              )}

              <Row gutter={[16, { xs: 8, sm: 8, md: 16, lg: 16 }]}>
                <Col xs={24} sm={24} md={11}>
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
                <Col xs={24} sm={24} md={13}>
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
            </div>
            <div className="px-6 py-3"></div>
            <div className="px-6 py-3"></div>
          </Col>
          <Col xs={0} sm={0} md={1}></Col>
        </Row>
        <Row></Row>
      </Content>
    </div>
  );
};
