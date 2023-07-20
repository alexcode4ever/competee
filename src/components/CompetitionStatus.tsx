import { CheckCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

export const CompetitionStatus: React.FC<{
  isLoggedIn: boolean;
  accepted: any;
  user: any;
  handleChallegenUnClick: () => void;
  handleChallegenClick: () => void;
}> = ({
  isLoggedIn,
  accepted,
  user,
  handleChallegenUnClick,
  handleChallegenClick,
}) => {
  return (
    <>
      {isLoggedIn && accepted?.user_id === user?.id && (
        <Row>
          <Col className="text-green-500 text-xl" xs={24} md={14}>
            🚀 Challenge Accepted
          </Col>
          <Col xs={24} md={10}>
            <Button
              type="default"
              danger
              block
              icon={<LogoutOutlined />}
              onClick={handleChallegenUnClick}
            >
              I giveup
            </Button>
          </Col>
        </Row>
      )}

      {!accepted && (
        <Button
          type="default"
          className=" bg-sky-600 text-white drop-shadow-sm"
          block
          icon={<CheckCircleOutlined />}
          onClick={handleChallegenClick}
        >
          Accept this challenge
        </Button>
      )}
    </>
  );
};
