import React = require("react");
import { ItemSelect } from "../../common/itemSelect";
import { ItemSelectComp } from "./ItemSelectComp";
import { Identificable } from "../../entities/identificable";

interface IItemSelectorCompProps<T> {
    itemSelectionList: Array<ItemSelect<T>>;
    onItemSelected: (item: T) => void;
    itemSelectConfirmed: T;
}

interface IItemSelectorCompState {
}


export class ItemSelectorComp<T extends Identificable> extends React.Component<IItemSelectorCompProps<T>, IItemSelectorCompState>{

    public constructor(props: IItemSelectorCompProps<T>) {
        super(props);
    }


    public render(): JSX.Element {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        if (this.props.itemSelectionList.length > 0) {
            this.props.itemSelectionList.forEach((modelSelection, index) => {
                res.push(
                    <ItemSelectComp
                        itemSelectConfirmed={this.props.itemSelectConfirmed}
                        key={index}
                        itemTextToShow={modelSelection.textToShow}
                        itemSelect={modelSelection}
                        onItemSelected={() => { this.props.onItemSelected(modelSelection.item) }}
                    ></ItemSelectComp>
                );
            });
        }
        else {
            res.push(<div key="0">No existen objetos</div>)
        }
        return (
            <div className="smallMinHeigth">
                {res}
            </div>
        )
    }

}