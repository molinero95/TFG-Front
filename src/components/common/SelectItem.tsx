import React = require("react");
import { Identificable } from "../../entities/identificable";
import { SelectableItem } from "../../common/SelectableItem";


interface ISelectItemProps<T> {
    itemSelectConfirmed: T;
    itemSelect: SelectableItem<T>;
    itemTextToShow: string;
    onItemSelected: (item: T) => void;
}

interface ISelectItemState {

}


export class SelectItem<T extends Identificable> extends React.Component<ISelectItemProps<T>, ISelectItemState>{

    public constructor(props: ISelectItemProps<T>) {
        super(props);
        this.state = {

        }
    }
    public render() {
        if(this.props.itemSelectConfirmed && this.props.itemSelect.item.id === this.props.itemSelectConfirmed.id){
            return (
                <div className="btn secondaryColorBg btn-light maxWidth topBottomPadding pointerCursor smallMarginTop" onClick={() => this.props.onItemSelected(this.props.itemSelect.item)}>
                    <span className="modelSelected">{this.props.itemTextToShow}</span>
                </div>
            );
        }
        if (this.props.itemSelect.isSelected) {
            return (
                <div className="btn btn-light maxWidth topBottomPadding pointerCursor smallMarginTop" onClick={() => this.props.onItemSelected(this.props.itemSelect.item)}>
                    <span className="modelSelected">{this.props.itemTextToShow}</span>
                </div>
            );
        }
        else {
            return (
                <div className="btn btn-light maxWidth topBottomPadding pointerCursor smallMarginTop " onClick={() => this.props.onItemSelected(this.props.itemSelect.item)}>
                    <span>{this.props.itemTextToShow}</span>
                </div>
            );
        }
    }

}