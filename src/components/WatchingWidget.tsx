import { Button } from "antd";

export const WatchingWidget: React.FC<{
  isLoggedIn: boolean;
  watched: any;
  user: any;
  handleWatchUnclick: () => void;
  handleWatchClick: () => void;
}> = ({ isLoggedIn, watched, user, handleWatchUnclick, handleWatchClick }) => {
  return (
    <>
      {isLoggedIn && watched?.user_id === user?.id && (
        <Button
          type="default"
          className=" bg-yellow-600 text-white drop-shadow-sm"
          block
          onClick={handleWatchUnclick}
        >
          🗑️ Unwatch
        </Button>
      )}

      {!watched && (
        <Button
          type="default"
          className=" bg-yellow-500 text-white drop-shadow-sm"
          block
          onClick={handleWatchClick}
        >
          👀 Watch this
        </Button>
      )}
    </>
  );
};
