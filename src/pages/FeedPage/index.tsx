import { FC, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { MainLayout } from "../../Layout/mainLayout";
import { CustomSearch } from "../../components";
import { useStores } from "../../store";

import "./index.scss";
import { ImageCard } from "../../components/imageCard";

export const FeedPage: FC = observer(() => {
	const { userStore, imagesStore } = useStores();

	useEffect(() => {
		userStore.getUserData();
		imagesStore.getImages();
	}, [userStore, imagesStore]);

	console.log(imagesStore.imageData.images);

	return (
		<MainLayout>
			<div className="feed-page">
				<div className="feed-page__background-image">
					<div className="feed-block">
						<CustomSearch />
						<div className="feed-block__card-container">
							<Masonry columnsCount={3} gutter="10px">
								{imagesStore.imageData.images.map(
									(item: any, index) => (
										<ImageCard key={index}>
											<img src={item.image_url} alt=""/>
										</ImageCard>
									),
								)}
							</Masonry>
						</div>
					</div>
					<div className="user-block">
						<div className="user-block__info">
							<div className="info-avatar">
								<SmileOutlined
									style={{
										color: "#424242",
										fontSize: "18px",
									}}
								/>
							</div>
							<div className="info-username">
								{userStore.userData.username}
							</div>
						</div>
						<div className="user-block__more"></div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
});

