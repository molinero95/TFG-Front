import React = require("react");
import { ItemSelect } from "../../common/itemSelect";
import { Identificable } from "../../entities/identificable";


interface IItemSelectCompProps<T> {
    itemSelectConfirmed: T;
    itemSelect: ItemSelect<T>;
    itemTextToShow: string;
    onItemSelected: (item: T) => void;
}

interface IItemSelectCompState {

}


export class ItemSelectComp<T extends Identificable> extends React.Component<IItemSelectCompProps<T>, IItemSelectCompState>{

    public constructor(props: IItemSelectCompProps<T>) {
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