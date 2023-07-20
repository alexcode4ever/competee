import { ICompetition } from "@/interfaces";
import { Card } from "antd";
import parse from "html-react-parser";

type CompetitionProps = {
  id: any;
  name: string;
  slug: string;
  body: string;
  description: string;
};

export const CompetitionDetail: React.FC<CompetitionProps> = ({
  name,
  body,
  description,
  slug,
  id,
}) => {
  return (
    <div>
      <Card title="About the Competition">{parse(body)}</Card>
    </div>
  );
};
