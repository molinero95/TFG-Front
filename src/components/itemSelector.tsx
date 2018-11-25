import React = require("react");
import { Paginator } from "./paginator";
import { IBaseItem } from "../entities/IBaseItem";
import { INetwork } from "../entities/inetwork";

interface IItemSelectorProps {
    getItemsService(pageSize: number, page: number): Promise<Response>;
    pageSize: number;
    getNumberOfPagesService(pageSize: number): Promise<Response>;
    onItemSelected(item: IBaseItem): void;

}

interface IItemSelectorState {
    items: Array<IBaseItem>;
    selectedItem: IBaseItem;
    page: number;
    numberOfPages: number;
}

export class ItemSelector extends React.Component<IItemSelectorProps, IItemSelectorState>{

    constructor(props: IItemSelectorProps) {
        super(props);
        this.state = {
            items: [],
            selectedItem: null,
            page: 0,
            numberOfPages: 0
        }

    }

    private requestItems(): void {
        this.props.getItemsService(this.state.page, this.props.pageSize).then(res => {
            return res.json();
        }).then((itemsRes: Array<string>) => {
            let aux: Array<INetwork> = new Array<INetwork>();
            itemsRes.forEach(item=> {
                aux.push({
                    alfa: 0.1,
                    classes: [],
                    inputs: 2,
                    layers: 2,
                    name: item
                });
            })
            this.setState({
                items: aux
            });
        }).catch(() => {
            alert("Hubo un problema obteniendo los datos");
        });
    }

    private requestPages(): void {
        this.props.getNumberOfPagesService(this.props.pageSize).then(res => {
            return res.json();
        }).then((numberOfPagesRes) => {
            this.setState({
                numberOfPages: numberOfPagesRes
            });
        }).catch(() => {
            alert("Hubo un problema obteniendo la paginación")
        });
    }

    private setSelectedItem(item: IBaseItem): void {
        this.setState({
            selectedItem: item
        });
    }

    private nextPage(): void {
        this.setState({ page: this.state.page + 1 });
    }

    private previousPage(): void {
        this.setState({ page: this.state.page - 1 });
    }

    private firstPage(): void {
        this.setState({ page: 0 });
    }

    private lastPage(): void {
        this.setState({ page: this.state.page + 1 });
    }

    public componentDidMount(): void {
        this.requestPages();
        this.requestItems();
    }

    private onSelectBtnClicked(): void {
        if (this.state.selectedItem) {
            this.props.onItemSelected(this.state.selectedItem);
        }
    }

    public render() {
        let displayItems: Array<JSX.Element> = new Array<JSX.Element>();
        this.state.items.forEach((item) => {
            if (this.state.selectedItem == item)
                displayItems.push(<button onClick={() => this.setSelectedItem(item)} className="btn btn-primary">{item.name}</button>);
            else
                displayItems.push(<button onClick={() => this.setSelectedItem(item)} className="btn btn-secundary">{item.name}</button>);
        });
        return (
            <div className="container">
                <div className="flex">
                    {displayItems}
                </div>
                <div>
                    <Paginator
                        onNextPageSelected={this.nextPage.bind(this)}
                        onPreviousPageSelected={this.previousPage.bind(this)}
                        onFirstPageSelected={this.firstPage.bind(this)}
                        onLastPageSelected={this.lastPage.bind(this)}
                        actualPage={this.state.page}
                        numberOfPages={this.state.numberOfPages}
                    />
                </div>
                <div>
                    <button className="btn btn-primary" disabled={this.state.selectedItem === null} onClick={this.onSelectBtnClicked.bind(this)}>Seleccionar</button>
                </div>
            </div>
        );
    }


}