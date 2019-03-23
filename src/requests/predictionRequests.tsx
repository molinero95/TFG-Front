import { RequestException } from "../exceptions/requestException";
import { PredictionParameters } from "../entities/predictionParameters";
import { Constants } from "../common/constants";

export class PredictionRequests {

	public static async makePrediction(predictionParameters: PredictionParameters): Promise<Array<any>> {
		let formData: FormData = new FormData();
		formData.append("data", JSON.stringify(predictionParameters));
		formData.append(predictionParameters.file.name, predictionParameters.file);
		return fetch(Constants.SERVICE_URL + "/predict", {
			method: "POST",
			body: formData
		})
			.then(data => data.json())
			.then(data => data.prediction)
			.catch(err => { throw new RequestException(err) });
	}
}