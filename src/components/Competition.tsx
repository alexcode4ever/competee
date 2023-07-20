import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Space, Spin } from "antd";
import {
  useCreate,
  useDelete,
  useGetIdentity,
  useList,
  useNavigation,
  useOne,
} from "@refinedev/core";
import { IUser } from "@/interfaces";
import dayjs from "dayjs";
import { CompetitionStatus } from "@/components/CompetitionStatus";
import { WatchingWidget } from "@/components/WatchingWidget";

type CompetitionProps = {
  id: number | undefined;
  user_id: string;
  name: string;
  slug: string;
  body: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerURL: string;
  showViewButton: boolean;
};
type ChallengeProps = {
  id: number;
  competition_id: number;
  user_id: string;
  body: string;
};
type WatchingProps = {
  id: number;
  competition_id: number;
};
export const Competition: React.FC<CompetitionProps> = ({
  id,
  user_id,
  name,
  slug,
  body,
  description,
  startDate,
  endDate,
  bannerURL,
  showViewButton,
}) => {
  const { push } = useNavigation();
  const {
    data: user,
    isLoading: userIsLoading,
    isFetched: userIsFetched,
  } = useGetIdentity<IUser>();
  const isLoggedIn = !!user;

  const { mutate: createMutate, isLoading: createLoading } = useCreate();
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDelete();
  const {
    data: acceptedResult,
    isLoading: acceptedLoading,
    isFetching: acceptedFetching,
  } = useList<ChallengeProps>({
    resource: "challengers",
    queryOptions: { enabled: isLoggedIn },
    filters: [
      {
        field: "user_id",
        value: user?.id,
        operator: "eq",
      },
      {
        field: "competition_id",
        value: id,
        operator: "eq",
      },
    ],
  });
  const accepted = acceptedResult?.data[0];
  const { data: creatorData } = useOne({
    resource: "users",
    id: user_id,
  });
  const {
    data: watchedResult,
    isLoading: watchedLoading,
    isFetching: watchedFetching,
  } = useList<WatchingProps>({
    resource: "watching",
    queryOptions: { enabled: isLoggedIn },
    filters: [
      {
        field: "user_id",
        value: user?.id,
        operator: "eq",
      },
      {
        field: "competition_id",
        value: id,
        operator: "eq",
      },
    ],
  });
  const watched = watchedResult?.data[0];
  const handleChallegenClick = () => {
    if (isLoggedIn) {
      createMutate({
        resource: "challengers",
        values: {
          competition_id: id,
          user_id: user?.id,
          body: "",
        },
        successNotification: (data, id, resource) => {
          return {
            message: `You have succesfully accepted the challenge. Good Luck!`,
            description: "Great!",
            type: "success",
          };
        },
      });
    } else {
      push("/login");
    }
  };
  const handleChallegenUnClick = () => {
    if (isLoggedIn) {
      deleteMutate(
        {
          resource: "challengers",
          id: accepted?.id || 0,
          successNotification: (data, id, resource) => {
            return {
              message: `You have succesfully left the challenge, but don't give up!`,
              description: "Okay!",
              type: "success",
            };
          },
        },
        {
          onSuccess: () => {
            //
          },
        }
      );
    } else {
      push("/login");
    }
  };
  const handleWatchClick = () => {
    if (isLoggedIn) {
      createMutate({
        resource: "watching",
        values: {
          competition_id: id,
          user_id: user?.id,
        },
        successNotification: (data, id, resource) => {
          return {
            message: `You have succesfully watched this challenge!`,
            description: "Nice!",
            type: "success",
          };
        },
      });
    } else {
      push("/login");
    }
  };
  const handleWatchUnclick = () => {
    if (isLoggedIn) {
      deleteMutate({
        resource: "watching",
        id: watched?.id || 0,
        successNotification: (data, id, resource) => {
          return {
            message: `You have succesfully unwatched!`,
            description: "Okay!",
            type: "success",
          };
        },
      });
    } else {
      push("/login");
    }
  };
  if (userIsLoading || acceptedFetching) {
    return (
      <div className="ml-20 mb-20 px-10 py-20 text-center">
        <Spin />
      </div>
    );
  }
  return (
    <>
      <Card
        title={
          <>
            <Space>
              {creatorData?.data.avatar_url ? (
                <Avatar
                  src={<img src={creatorData?.data.avatar_url} alt="avatar" />}
                />
              ) : (
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              )}
              <div>{creatorData?.data.full_name}</div>
              <div>#{id} </div>
            </Space>
          </>
        }
        bordered={true}
        cover={<img alt="example" src={bannerURL} />}
        hoverable={showViewButton}
        onClick={() => showViewButton && push(`/competition/${slug}`)}
      >
        <Card.Grid style={{ width: "100%" }} hoverable={false}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}></Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div></div>
              <Link to={`/competition/${slug}`} className="">
                <h1 className="text-3xl text-left">{name}</h1>
                <p>{description}</p>
              </Link>
            </Col>
          </Row>
        </Card.Grid>
        <Card.Grid style={{ width: "33.3%" }} hoverable={false}>
          <div>Start: {dayjs(startDate).format("MMM DD, YYYY")}</div>
        </Card.Grid>
        <Card.Grid style={{ width: "33.3%" }} hoverable={false}>
          <div>End: {dayjs(endDate).format("MMM DD, YYYY")}</div>
        </Card.Grid>
        <Card.Grid style={{ width: "33.3%" }} hoverable={false}>
          <WatchingWidget
            isLoggedIn={isLoggedIn}
            watched={watched}
            user={user}
            handleWatchClick={handleWatchClick}
            handleWatchUnclick={handleWatchUnclick}
          />
        </Card.Grid>
      </Card>
      {!showViewButton && (
        <Card>
          <CompetitionStatus
            isLoggedIn={isLoggedIn}
            accepted={accepted}
            user={user}
            handleChallegenUnClick={handleChallegenUnClick}
            handleChallegenClick={handleChallegenClick}
          />
        </Card>
      )}
    </>
  );
};
