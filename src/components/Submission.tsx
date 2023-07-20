import React, { useState } from "react";
import { Button, Card, Spin } from "antd";
import {
  useGetIdentity,
  useList,
  useNavigation,
  useUpdate,
} from "@refinedev/core";
import { IUser } from "@/interfaces";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

export const Submission: React.FC<{ id: number | undefined }> = ({ id }) => {
  const { push } = useNavigation();
  const { data: user, isLoading: userIsLoading } = useGetIdentity<IUser>();
  const isLoggedIn = !!user;
  type ChallengeProps = {
    id: number;
    competition_id: number;
    user_id: string;
    body: string;
    submission_date: string;
    is_submitted: boolean;
  };
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

  const { mutate: updateMutate, isLoading: updateLoading } = useUpdate();
  const [textarea, setTextarea] = useState("");
  if (userIsLoading || acceptedFetching) {
    return (
      <div className="ml-20 mb-20 px-10 py-20 text-center">
        <Spin />
      </div>
    );
  }
  return (
    <Card title="Your Submission">
      {!accepted && <div>You did not accept this challenge</div>}
      {accepted && !accepted?.is_submitted && (
        <div>
          Upload your submission below:
          <ReactQuill theme="snow" value={textarea} onChange={setTextarea} />
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded my-3"
            onClick={() =>
              updateMutate({
                resource: "challengers",
                id: accepted?.id,
                values: {
                  body: textarea,
                  is_submitted: true,
                  submission_date: new Date().toISOString(),
                },
                successNotification: (data, value, resource) => {
                  return {
                    message: `You have succesfully submitted your challenge.`,
                    description: "Nice Work!",
                    type: "success",
                  };
                },
              })
            }
          >
            Submit
          </Button>
        </div>
      )}
      {accepted && accepted?.body !== "" && (
        <div>
          <p>Your submission:</p>
          {parse(accepted?.body)}
        </div>
      )}
    </Card>
  );
};
