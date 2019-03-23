import { ImageItem } from "./ImageItem";

export interface PredictionParameters {
	modelId: number;
	versionId: number;
	file: File;
	fileName: string;
}