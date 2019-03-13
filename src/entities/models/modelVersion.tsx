import { ClassItem } from "./classItem";

export interface ModelVersion{
    id: number;
    name: string;
    classes: Array<ClassItem>;
}