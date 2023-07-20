import { useCreate, useDelete, useNavigation } from "@refinedev/core";
import { Button } from "antd";

export const VoteWidget: React.FC<{
  isLoggedIn: boolean;
  voted: any;
  user: any;
  id: number;
}> = ({ isLoggedIn, voted, user, id }) => {
  const { mutate: createMutate, isLoading: createLoading } = useCreate();
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDelete();
  const { push } = useNavigation();

  const handleVoteClick = () => {
    if (isLoggedIn) {
      createMutate({
        resource: "votes",
        values: {
          challengers_id: id,
          user_id: user?.id,
        },
        successNotification: (data, id, resource) => {
          return {
            message: `You have succesfully voted this challenge!`,
            description: "Nice!",
            type: "success",
          };
        },
      });
    } else {
      push("/login");
    }
  };
  const handleVoteUnclick = () => {
    if (isLoggedIn) {
      deleteMutate({
        resource: "votes",
        id: voted?.id || 0,
        successNotification: (data, id, resource) => {
          return {
            message: `You have succesfully unvoted!`,
            description: "Okay!",
            type: "success",
          };
        },
      });
    } else {
      push("/login");
    }
  };
  return (
    <>
      {isLoggedIn && voted?.user_id === user?.id && (
        <Button
          type="default"
          className=" bg-green-500 text-white drop-shadow-sm"
          // icon={<StarOutlined />}
          onClick={handleVoteUnclick}
        >
          🗑️ Unvote
        </Button>
      )}

      {!voted && (
        <Button
          type="default"
          className=" bg-green-700 text-white drop-shadow-sm"
          // icon={<StarOutlined />}
          onClick={handleVoteClick}
        >
          👍 Vote this
        </Button>
      )}
    </>
  );
};
