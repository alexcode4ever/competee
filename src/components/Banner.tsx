import { Col, Row } from "antd";
export const Banner: React.FC = () => {
  return (
    <Row justify="center" style={{ backgroundColor: "white" }}>
      <Col md={24} lg={12} xl={7}>
        <div>
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 pt-20 pb-2 text-left drop-shadow-md">
            Compete in different challenges
          </h1>
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-slate-700 drop-shadow-md pb-20">
            Up your game by competing with opponent around the world
          </h2>
        </div>
      </Col>
      <Col md={24} lg={12} xl={7}>
        <img src="./banner.jpg" style={{ width: "500px" }} />
      </Col>
    </Row>
  );
};
