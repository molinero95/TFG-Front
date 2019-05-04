import React = require("react");
import { SelectableItem } from "../../common/selectableItem";
import { SelectItem } from "./SelectItem";
import { Identificable } from "../../entities/identificable";

interface IItemSelectorProps<T> {
    itemSelectionList: Array<SelectableItem<T>>;
    onItemSelected: (item: T) => void;
    itemSelectConfirmed: T;
}

interface IItemSelectorState {
}


export class ItemSelector<T extends Identificable> extends React.Component<IItemSelectorProps<T>, IItemSelectorState>{

    public constructor(props: IItemSelectorProps<T>) {
        super(props);
    }


    public render(): JSX.Element {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        if (this.props.itemSelectionList.length > 0) {
            this.props.itemSelectionList.forEach((modelSelection, index) => {
                res.push(
                    <SelectItem
                        itemSelectConfirmed={this.props.itemSelectConfirmed}
                        key={index}
                        itemTextToShow={modelSelection.textToShow}
                        itemSelect={modelSelection}
                        onItemSelected={() => { this.props.onItemSelected(modelSelection.item) }}
                    ></SelectItem>
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