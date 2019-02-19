import { ClassData } from "../trainer/classData";

export interface NetworkImageData {
    imageUrl: string;
    imageData: ImageData;
    labelData: ClassData;
    selected: boolean;
    classified: boolean;
}