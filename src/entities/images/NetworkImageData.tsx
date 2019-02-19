import { ClassData } from "../trainer/classData";

export interface NetworkImageData {
    imageUrl: string;
    classData: ClassData;
    selected: boolean;
    classified: boolean;
}