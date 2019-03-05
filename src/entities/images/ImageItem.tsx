import { ModelClass } from "../models/modelClass";

export interface ImageItem{
    file: File,
    imageUrl: string,
    class: ModelClass,
}