import { action, makeAutoObservable, runInAction } from "mobx";

import { getNekos } from "../api/neko";

export interface IImages {
	images: any[];
	newImages: any[];
	hasMore: boolean;
	isFetching: boolean;
	limit: number;
}

export class imagesStore {
	public imageData: IImages = {
		images: [],
		newImages: [],
		hasMore: true,
		isFetching: false,
		limit: 10,
	};

	constructor() {
		makeAutoObservable(this, {
			getImages: action,
			clearImages: action,
			changeHasMore: action,
			changeIsFetching: action,
		});
	}

	public async getImages(offset: number, limit: number) {
		try {
            runInAction(() => {
                this.imageData.isFetching = true;  // Флаг загрузки
            });
    
            const newImages = await getNekos(offset, limit);
            
            // Проверяем, что данные — это массив
            if (Array.isArray(newImages)) {
                runInAction(() => {
                    this.imageData.newImages = newImages; // Сохраняем новые изображения
                    this.imageData.images = [
                        ...this.imageData.images, // Добавляем к старым
                        ...newImages,
                    ];
                    this.imageData.isFetching = false; // Сбрасываем флаг
                    if (newImages.length < limit) {
                        this.imageData.hasMore = false; // Если данных меньше лимита, новых больше нет
                    }
                });
            } else {
                console.error("Error: Invalid data format. Expected an array.");
                runInAction(() => {
                    this.imageData.isFetching = false; // Сбрасываем флаг при ошибке
                });
            }
        } catch (error) {
            runInAction(() => {
                this.imageData.isFetching = false; // Сбрасываем флаг при ошибке
            });
            console.error("Error fetching images:", error);
        }
	}

	public clearImages() {
		this.imageData.images = [];
	}

	public changeHasMore() {
		this.imageData.hasMore = !this.imageData.hasMore;
	}

	public changeIsFetching() {
		this.imageData.isFetching = !this.imageData.isFetching;
	}
}
