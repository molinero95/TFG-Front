import React = require("react");

interface ITrainerTopMenuCompProps {
    onDeselectAllClick: () => void;
    onSelectAllClick: () => void;
    onRemoveImagesClick: () => void;
}

interface ITrainerTopMenuCompState {
}

export class TrainerTopMenuComp extends React.Component<ITrainerTopMenuCompProps, ITrainerTopMenuCompState>{
    constructor(props: ITrainerTopMenuCompProps) {
        super(props);
    }

    public render() {
        return (
            <div className="smallIconNavBar maxWidth spaceBetweenContent">
                <span className="leftPadding">Arrastre imagenes aqui:</span>
                <span className="text-right ">
                    <button id="removeImageBtn" onClick={this.props.onRemoveImagesClick}></button>
                    <button id="selectAllBtn" onClick={this.props.onSelectAllClick}></button>
                    <button id="deselectAllBtn" onClick={this.props.onDeselectAllClick}></button>
                </span>
            </div>
        );
    }
}