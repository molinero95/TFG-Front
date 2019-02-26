import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";


interface IVersionCreatorCompProps {
    onVersionCreated: (newVersion: ModelVersion) => void;
}

interface IVersionCreatorCompState {
    newVersion: ModelVersion;
}

export class VersionCreatorComp extends React.Component<IVersionCreatorCompProps, IVersionCreatorCompState>{
    constructor(props: IVersionCreatorCompProps) {
        super(props);
        this.state = {
            newVersion: {
                id: -1,
                name: null
            }
        }
    }

    private onVersionNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let name: string = event.target.value;
        let version = this.state.newVersion;
        version.name = name;
        this.setState({
            newVersion: version
        });
    }




    public render() {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin text-white">Creacion de versión:</h4>
                    </div>
                    <div>
                        <div className="topBottomPadding smallMarginTop row smallMarginBottom">
                            <div className="offset-md-1 col-md-5">
                                <label className="smallMarginRight">Nombre:</label>
                                <input type="text" onChange={this.onVersionNameChange.bind(this)}></input>
                            </div>

                        </div>
                        <div className="row">
                            <button onClick={() => { this.props.onVersionCreated(this.state.newVersion) }} className="btn prettyMargin btn-success offset-md-9 col-md-2">Crear versión</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}