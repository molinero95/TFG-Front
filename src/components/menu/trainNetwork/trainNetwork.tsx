import * as React from "react";
import { ItemSelector } from "../../itemSelector";
import { INetwork } from "../../../entities/inetwork";
import { NetworkService } from "../../../requestServices/networkService";

interface ITrainNetworkProps {

}
interface ITrainNetworkState {
	selectedNetwork: INetwork;
}

export class TrainNetwork extends React.Component<ITrainNetworkProps, ITrainNetworkState>{

	public constructor(props: ITrainNetworkProps) {
		super(props);
		this.state = {
			selectedNetwork: null,
		}
	}

	private onSelectedNetwork(network: INetwork): void {
		this.setState({ selectedNetwork: network }, function () {
			NetworkService.getNetwork("prueba").then(resp => {
				return resp.json();
			}).then((network: INetwork) => {
				console.log(network);
			}).catch(error => { console.error(error) });
		}.bind(this));
	}

	public render(): JSX.Element {
		if (!this.state.selectedNetwork) {
			//Item selector es para seleccionar el network que vamos a entrenar
			return (
				<div>
					<h1 style={{ textAlign: "center" }}>Este es el entrenador</h1>
					<ItemSelector getItemsService={NetworkService.getNetworkNames.bind(this)} pageSize={20} getNumberOfPagesService={NetworkService.getNerworkPages.bind(this)} onItemSelected={this.onSelectedNetwork.bind(this)} />
				</div>
			);
		}
		else {
			return (
				<div>

				</div>
			);
		}

	}
}