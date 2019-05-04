import React = require("react");

interface ITrainerTopMenuProps {
    onDeselectAllClick: () => void;
    onSelectAllClick: () => void;
    onRemoveImagesClick: () => void;
}

interface ITrainerTopMenuState {
}

export class TrainerTopMenu extends React.Component<ITrainerTopMenuProps, ITrainerTopMenuState>{
    constructor(props: ITrainerTopMenuProps) {
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