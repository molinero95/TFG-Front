import { IBaseItem } from "./IBaseItem";


export interface INetwork extends IBaseItem {
	alfa: number,
	inputs: number,
	layers: number,
	classes: Array<string>,
}