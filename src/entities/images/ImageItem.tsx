import { ClassItem } from "../models/modelClass";

export interface ImageItem{
    file: File,
    imageUrl: string,
    class: ClassItem,
}