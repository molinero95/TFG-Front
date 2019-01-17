import { ClassData } from "../trainer/classData";

export interface ImageToTrainData {
    imageUrl: string;
    imageData: ImageData;
    labelData: ClassData;
    selected: boolean;
    classified: boolean;
}