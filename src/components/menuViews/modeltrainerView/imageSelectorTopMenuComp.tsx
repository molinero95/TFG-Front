import React = require("react");

interface IImageSelectorTopMenuCompProps {
    onDeselectAllClick: () => void;
    onSelectAllClick: () => void;
}

interface IImageSelectorTopMenuCompState {
}

export class ImageSelectorTopMenuComp extends React.Component<IImageSelectorTopMenuCompProps, IImageSelectorTopMenuCompState>{
    constructor(props: IImageSelectorTopMenuCompProps) {
        super(props);
    }

    public render() {
        return (
            <div className="smallIconNavBar maxWidth spaceBetweenContent">
                <span className="leftPadding">Arrastre imagenes aqui:</span>
                <span className="text-right ">
                    <button id="selectAllBtn" onClick={this.props.onSelectAllClick}></button>
                    <button id="deselectAllBtn" onClick={this.props.onDeselectAllClick}></button>
                </span>
            </div>
        );
    }
}