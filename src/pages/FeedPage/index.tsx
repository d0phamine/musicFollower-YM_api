import { FC, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react-lite";
import { MainLayout } from "../../Layout/mainLayout";

import { CustomSearch } from "../../components";

import "./index.scss";

export const FeedPage: FC = observer(() => {
	return (
		<MainLayout>
			<div className="feed-page">
				<div className="feed-page__background-image">
					<div className="feed-block">
                        <CustomSearch />
                    </div>
					<div className="user-block"></div>
				</div>
			</div>
		</MainLayout>
	);
});

