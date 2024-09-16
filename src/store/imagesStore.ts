import { makeAutoObservable } from "mobx";

import { getNekos } from "../api/neko";

export interface IImages {
    images: []
}

export class imagesStore{
    public imageData:IImages = {
        images: [],
    }

    constructor() {
        makeAutoObservable(this)
    }

    public async getImages(){
        this.imageData.images = await getNekos()
    }

    public clearImages(){
        this.imageData.images = []
    }
}