import { FC } from "react";
import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useHover } from "@uidotdev/usehooks";

import "./index.scss";

export interface ComponentProps {
	children: React.ReactNode;
}

export const ImageCard: FC<ComponentProps> = ({ children }) => {
	const [ref, hovering] = useHover();
	return (
		<div className="image-card">
			{children}
			<div className="image-card__footer">
				<Button ref={ref}>
					{hovering ? <StarFilled /> : <StarOutlined />}
				</Button>
			</div>
		</div>
	);
};
