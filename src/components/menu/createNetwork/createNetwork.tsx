import * as React from "react";
import { INetwork } from "../../../entities/inetwork";
import { NetworkService } from "../../../requestServices/networkService";

interface ICreateNetworkProps {

}

interface ICreateNetworkState {
    network: INetwork;
    numClassInputs: number;
    buttonEnabled: boolean;
}
export class CreateNetwork extends React.Component<ICreateNetworkProps, ICreateNetworkState>{

    constructor(props: ICreateNetworkProps) {
        super(props);
        this.state = {
            network: {
                alfa: 0.1,
                classes: new Array<string>(2),
                inputs: 2,
                layers: 2,
                name: ""
            },
            numClassInputs: 2,
            buttonEnabled: true
        };
    }




    private createModel(): void {
        console.log(this.state.network);
        this.setState({ buttonEnabled: false });
        if (this.checkIfDataIsCorrect()) {
            NetworkService.createNetwork(this.state.network).then(() => {
                alert("Modelo creado correctamente");
                this.setState({ buttonEnabled: true });
            }).catch(() => {
                alert("Ha ocurrido un error");
                this.setState({ buttonEnabled: true });
            });
        }
        else{
            alert("Por favor, rellene todos los datos");
            this.setState({ buttonEnabled: true });
        }
    }


    private checkIfDataIsCorrect(): boolean {
        if (this.state.network.alfa < 0.1 || this.state.network.alfa > 1)
            return false;
        if (this.state.network.classes.length == 0)
            return false;
        if (this.state.network.inputs == 0)
            return false;
        if (this.state.network.layers == 0)
            return false;
        if (this.state.network.name.length < 2)
            return false;
        return this.checkIfAllClasesFilled();
    }


    private checkIfAllClasesFilled(): boolean {
        let correct: boolean = true;
        let i = 0;
        while (i < this.state.network.classes.length && correct) {
            if (this.state.network.classes[i] === null || this.state.network.classes[i].length === 0)
                correct = false;
            i++;
        }
        return correct;
    }

    //Setters

    private setNetworkName(event: React.ChangeEvent<HTMLSelectElement>) {
        let name: string = event.target.value;
        this.setState({
            network: {
                name: name,
                alfa: this.state.network.alfa,
                classes: this.state.network.classes,
                inputs: this.state.network.inputs,
                layers: this.state.network.layers
            },
        });
    }

    private setNetworkAlfa(event: React.ChangeEvent<HTMLSelectElement>) {
        let alfa: number = Number(event.target.value);
        this.setState({
            network: {
                name: this.state.network.name,
                alfa: alfa,
                classes: this.state.network.classes,
                inputs: this.state.network.inputs,
                layers: this.state.network.layers
            },
        });
    }

    private setNetworkInputs(event: React.ChangeEvent<HTMLSelectElement>) {
        let inputs: number = Number(event.target.value);
        this.setState({
            network: {
                name: this.state.network.name,
                alfa: this.state.network.alfa,
                classes: this.state.network.classes,
                inputs: inputs,
                layers: this.state.network.layers
            },
        });
    }


    private setNetworkLayers(event: React.ChangeEvent<HTMLSelectElement>) {
        let layers: number = Number(event.target.value);
        this.setState({
            network: {
                name: this.state.network.name,
                alfa: this.state.network.alfa,
                classes: this.state.network.classes,
                inputs: this.state.network.inputs,
                layers: layers
            },
        });
    }

    private setNumClasses(event: React.ChangeEvent<HTMLSelectElement>) {
        let numClasses: number = Number(event.target.value);
        if (numClasses >= 0) {
            let aux = new Array<string>(numClasses);
            for (let i = 0; i < numClasses; i++) {
                aux[i] = this.state.network.classes[i];
            }
            this.setState({
                numClassInputs: numClasses,
                network: {
                    name: this.state.network.name,
                    alfa: this.state.network.alfa,
                    classes: aux,
                    inputs: this.state.network.inputs,
                    layers: this.state.network.layers
                },
            });
        }
    }


    private setClass(index: number, event: React.ChangeEvent<HTMLSelectElement>) {
        this.state.network.classes[index] = event.target.value;
    }

    //Dom rendering

    private generateInputs(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        for (let i = 0; i < this.state.numClassInputs; i++) {
            let htmlClass = "";
            if (i % 2 == 0)
                htmlClass = "offset-md-2";
            res.push(
                <div className={"col-md-4 form-group " + htmlClass}>
                    <label>Clase {i + 1}: </label>
                    <input type="text" className="form-control" value={this.state.network.classes[i]} onChange={this.setClass.bind(this, i)} />
                </div>
            );
        }
        return res;
    }


    public render(): JSX.Element {
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2 form-group">
                    <label>Nombre:</label>
                    <input type="text" className="form-control" value={this.state.network.name} onChange={this.setNetworkName.bind(this)} />
                </div>
                <div className="col-md-4 offset-md-2 form-group">
                    <label>Alfa:</label>
                    <input min="0.1" max="1" step="0.1" value={this.state.network.alfa} onChange={this.setNetworkAlfa.bind(this)} className="form-control" />
                </div>
                <div className="col-md-4 form-group">
                    <label>Número de entradas:</label>
                    <input value={this.state.network.inputs} onChange={this.setNetworkInputs.bind(this)} className="form-control" />
                </div>
                <div className="col-md-4 offset-md-2 form-group">
                    <label>Número de capas:</label>
                    <input value={this.state.network.layers} onChange={this.setNetworkLayers.bind(this)} className="form-control" />
                </div>
                <div className="col-md-4 form-group">
                    <label>Número de clases:</label>
                    <input value={this.state.numClassInputs} onChange={this.setNumClasses.bind(this)} className="form-control" />
                </div>
                <hr className="col-md-10 offset-md-1" />
                {this.generateInputs()}
                <div className="col-md-2 offset-md-5">
                    <button className="btn btn-success" disabled={!this.state.buttonEnabled} onClick={this.createModel.bind(this)}>Crear modelo</button>
                </div>
            </div>
        );
    }
}