import { ClassItem } from "./classItem";
import { Identificable } from "./identificable";

export interface ModelVersion extends Identificable{
    id: number;
    name: string;
    classes: Array<ClassItem>;
    denseUnits: number;
    learningRate: number;
}