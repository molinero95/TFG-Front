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
        this.setState({ selectedNetwork: network });
    }

    public render(): JSX.Element {
        if (!this.state.selectedNetwork) {
            //Item selector es para seleccionar el network que vamos a entrenar
            return (
                <div>
                    Este es el entrenador
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