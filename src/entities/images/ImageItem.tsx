import { ClassItem } from "../models/classItem";

export interface ImageItem{
    file: File,
    imageUrl: string,
    class: ClassItem,
}