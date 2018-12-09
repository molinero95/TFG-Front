import * as React from 'react'
import { Paginator } from "./paginator";
import { IBaseItem } from "../entities/IBaseItem";
import { INetwork } from "../entities/inetwork";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption, IDropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

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
	private _basicDropdown = React.createRef<IDropdown>();
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
			console.log("ressssss", itemsRes);
			let aux: Array<INetwork> = new Array<INetwork>();
			itemsRes.forEach(item => {
				aux.push({
					name: item,
					alfa: 0.1,
					classes: [],
					inputs: 2,
					layers: 2
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

	/*private setSelectedItem(item: IBaseItem): void {
		this.setState({
			selectedItem: item
		});
	}*/

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

	/*private onSelectBtnClicked(): void {
		if (this.state.selectedItem) {
			this.props.onItemSelected(this.state.selectedItem);
		}
	}*/

	private onModelChange(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
		this.setState({
			selectedItem: { name: item.text }
		}, function (this: any): void {
			this.props.onItemSelected(this.state.selectedItem);
		}.bind(this));

	}

	public render(): JSX.Element {
		let displayItems: Array<IDropdownOption> = new Array<IDropdownOption>();
		this.state.items.forEach((item) => {
			if (this.state.selectedItem == item)
				displayItems.push({ 'key': item.name, 'text': item.name });
			else
				displayItems.push({ 'key': item.name, 'text': item.name });
		});
		return (
			<div>
				<div>
					<Dropdown placeHolder="Selecciona un modelo" id="dropdown" ariaLabel="Basic dropdown example" options={displayItems}
						onChange={this.onModelChange.bind(this)}
						componentRef={this._basicDropdown} style={{ width: '200px' }} />
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
			</div>
		);
	}
}