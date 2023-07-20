import { AlertOutlined } from "@ant-design/icons";
import { Space } from "antd";

interface LogoProps {
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ collapsed } = {}) => {
  return (
    !collapsed && (
      <a href="/" className="flex items-center">
        <Space>
          <AlertOutlined className="text-2xl font-extrabold text-orange-500" />
          <div className="logo text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 pr-5">
            COMPETEE
          </div>
        </Space>
      </a>
    )
  );
};
