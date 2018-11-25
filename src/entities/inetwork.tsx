import { IBaseItem } from "./IBaseItem";


export interface INetwork extends IBaseItem {
    name: string,
    alfa: number,
    inputs: number,
    layers: number,
    classes: Array<string>,
}