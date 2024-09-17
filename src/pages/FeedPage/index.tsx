import { FC, useEffect, useState, useRef } from "react";
import { ConfigProvider, Divider, theme } from "antd";
import { SmileOutlined, LoadingOutlined} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { MainLayout } from "../../Layout/mainLayout";
import { CustomSearch } from "../../components";
import { useStores } from "../../store";

import "./index.scss";
import { ImageCard } from "../../components/imageCard";

export const FeedPage: FC = observer(() => {
	const { userStore, imagesStore } = useStores();
	const feedBlockRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		userStore.getUserData();
		if (imagesStore.imageData.images.length === 0) {
			imagesStore.getImages(0, imagesStore.imageData.limit);
			console.log(imagesStore.imageData.images, "get images");
		}

		const feedBlock = feedBlockRef.current;
		if (feedBlock) {
			// Добавляем обработчик скролла на блок
			feedBlock.addEventListener('scroll', handleScroll);
		}
		return () => {
			// Очищаем обработчик при размонтировании
			if (feedBlock) {
				feedBlock.removeEventListener('scroll', handleScroll);
			}
		};
	}, [imagesStore]);

	const handleScroll = () => {
		const feedBlock = feedBlockRef.current;
		if (feedBlock) {
			const scrollTop = feedBlock.scrollTop;
			const scrollHeight = feedBlock.scrollHeight;
			const clientHeight = feedBlock.clientHeight;

			// Проверяем, что пользователь прокрутил до конца блока
			if (scrollTop + clientHeight >= scrollHeight - 100 && !imagesStore.imageData.isFetching && imagesStore.imageData.hasMore) {
				fetchMoreImages();
			}
		}
	};

	const fetchMoreImages = async () => {
		imagesStore.changeIsFetching(); // Устанавливаем флаг загрузки

		// Подгружаем новые изображения с учётом текущего офсета
		const newImages: any = await imagesStore.getImages(
			imagesStore.imageData.images.length,
			imagesStore.imageData.limit,
		);
		if (newImages.length < imagesStore.imageData.limit) {
			
			// Если меньше, чем `limit`, значит больше данных нет
			imagesStore.changeIsFetching();
		}

		imagesStore.changeIsFetching(); // Отключаем флаг загрузки после получения данных
	};

	return (
		<MainLayout>
			<div className="feed-page">
				<div className="feed-page__background-image">
					<div className="feed-block">
						<CustomSearch />
						<div className="feed-block__card-container" ref={feedBlockRef}>
							<Masonry columnsCount={3} gutter="10px">
								{imagesStore.imageData.images.map(
									(item: any, index) => (
										<ImageCard key={index}>
											<img src={item.image_url} alt="" />
										</ImageCard>
									),
								)}
							</Masonry>
							{imagesStore.imageData.isFetching && <LoadingOutlined style={{color:"#7f6bce"}}/>} {/* Индикатор загрузки */}
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

