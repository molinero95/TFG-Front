import React = require("react");
import { ItemSelect } from "../../../entities/itemSelect";


interface ISelectableItemCompProps<T> {
    itemSelect: ItemSelect<T>;
    itemTextToShow: string;
    onItemSelected: (item: T) => void;
}

interface ISelectableItemCompState {

}


export class SelectableItemComp<T> extends React.Component<ISelectableItemCompProps<T>, ISelectableItemCompState>{

    public constructor(props: ISelectableItemCompProps<T>) {
        super(props);
        this.state = {

        }
    }
    public render() {
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