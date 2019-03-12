import { ClassItem } from "./modelClass";

export interface ModelVersion{
    id: number;
    name: string;
    classes: Array<ClassItem>;
}