import { useTable } from "@refinedev/core";
import { Col, Layout, Row, Typography } from "antd";
import { Banner } from "@/components/Banner";
import { Competition } from "@/components/Competition";
import { ICompetition } from "@/interfaces";

const { Content, Footer } = Layout;

export const Home: React.FC = () => {
  const { tableQueryResult } = useTable<ICompetition>({
    resource: "competitions",
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });

  return (
    <Layout>
      <Banner />
      <Content className="site-layout" style={{}}>
        <Row>
          <Col xs={0} sm={0} md={4}></Col>
          <Col xs={24} sm={24} md={16}>
            <h2 className="my-3 text-lg">Latest Competition</h2>
            <div style={{ padding: 24, minHeight: 380, background: "white" }}>
              {tableQueryResult.isLoading && (
                <div className="">Loading latest competition...</div>
              )}
              {!tableQueryResult.data?.data?.length &&
                !tableQueryResult.isFetching && (
                  <div className="article-preview">
                    No competition available
                  </div>
                )}

              <Row gutter={[16, { xs: 8, sm: 8, md: 16, lg: 16 }]}>
                {tableQueryResult?.data?.data.map((item) => {
                  return (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      key={item.slug}
                    >
                      <Competition
                        id={item.id}
                        key={item.slug}
                        user_id={item.user_id}
                        name={item.name}
                        slug={item.slug}
                        body={item.body}
                        description={item.description}
                        startDate={item.start_date}
                        endDate={item.end_date}
                        bannerURL={item.banner_url}
                        showViewButton={true}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
          <Col xs={0} sm={0} md={4}></Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>COMPETEE © 2023</Footer>
    </Layout>
  );
};
