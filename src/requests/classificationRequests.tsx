import { RequestException } from "../exceptions/requestException";
import { ClassificationParameters } from "../entities/classificationParameters";
import { Constants } from "../common/constants";

export class ClassificationRequests {

	public static async makeClassification(classificationParameters: ClassificationParameters): Promise<any> {
		let formData: FormData = new FormData();
		formData.append("data", JSON.stringify(classificationParameters));
		formData.append(classificationParameters.file.name, classificationParameters.file);
		return fetch(Constants.SERVICE_URL + "/classify", {
			method: "POST",
			body: formData
		})
			.then(data => data.json())
	}
}