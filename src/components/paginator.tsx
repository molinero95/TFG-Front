import React = require("react");
//import { number } from "prop-types";

interface IPaginatorProps {
    actualPage: number;
    numberOfPages: number;
    onNextPageSelected(): void;
    onPreviousPageSelected(): void;
    onFirstPageSelected():void;
    onLastPageSelected(): void;
}

interface IPaginatorprops {
}

export class Paginator extends React.Component<IPaginatorProps, IPaginatorprops>{
    constructor(props: IPaginatorProps) {
        super(props);
    }

    private zeroPages(): JSX.Element {
        return (<div className="pageButtons"></div>);
    }

    private onePage(): JSX.Element {
        return (
            <div className="pageButtons">
                <button disabled={true} className="btn btn-primary">1</button>
            </div>
        );
    }

    private twoPages(): JSX.Element {
        if (this.props.actualPage === this.props.numberOfPages) {
            return (
                <div className="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-secondary">1</button>
                    <button disabled={true} className="btn btn-primary">2</button>
                </div>
            );
        }
        else {
            return (
                <div className="pageButtons">
                    <button disabled={true} className="btn btn-primary">1</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-secondary">2</button>
                </div>
            );
        }
    }

    private threePages(): JSX.Element {
        if (this.props.actualPage === this.props.numberOfPages) {
            return (
                <div className="pageButtons">
                    <button onClick={this.props.onFirstPageSelected} className="btn btn-secondary">1</button>
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-secondary">2</button>
                    <button disabled={true} className="btn btn-primary">3</button>
                </div>
            );
        }
        else if (this.props.actualPage !== 0 && this.props.actualPage !== this.props.numberOfPages) {
            return (
                <div className="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-secondary">1</button>
                    <button disabled={true} className="btn btn-primary">2</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-secondary">3</button>
                </div>
            );
        }
        else {
            return (
                <div className="pageButtons">
                    <button disabled={true} className="btn btn-primary">1</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-secondary">2</button>
                    <button onClick={this.props.onLastPageSelected} className="btn btn-secondary">3</button>
                </div>
            );
        }
    }

    private fourOrMorePages(): JSX.Element {
        if (this.props.actualPage === 0) {
            return (
                <div id="pageButtons">
                    <button disabled={true} className="btn btn-primary">1</button>
                    <span>...</span>
                    <button onClick={this.props.onLastPageSelected} className="btn btn-secondary">{this.props.numberOfPages}</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-primary">Siguiente</button>
                </div>
            );
        }
        else if (this.props.actualPage === this.props.numberOfPages - 1) {
            return (
                <div id="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-primary"> Anterior </button>
                    <button onClick={this.props.onFirstPageSelected} className="btn btn-secondary">1</button>
                    <span>...</span>
                    <button disabled={true} className="btn btn-primary">{this.props.numberOfPages}</button>
                </div>
            )
        }
        else if (this.props.actualPage === 1) {
            return (
                <div id="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-primary">Anterior</button>
                    <button onClick={this.props.onFirstPageSelected} className="btn btn-secondary">1</button>
                    <button disabled={true} className="btn btn-primary">{this.props.actualPage + 1}</button>
                    <span>...</span>
                    <button onClick={this.props.onLastPageSelected} className="btn btn-secondary">{this.props.numberOfPages}</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-primary">Siguiente</button>
                </div>
            );
        }
        else if (this.props.actualPage === this.props.numberOfPages - 2) {
            return (
                <div id="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-primary">Anterior</button>
                    <button onClick={this.props.onFirstPageSelected} className="btn btn-secondary">1</button>
                    <span>...</span>
                    <button disabled={true} className="btn btn-primary">{this.props.actualPage + 1}</button>
                    <button onClick={this.props.onLastPageSelected} className="btn btn-secondary">{this.props.numberOfPages}</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-primary">Siguiente</button>
                </div>
            );
        }
        else {
            return (
                <div id="pageButtons">
                    <button onClick={this.props.onPreviousPageSelected} className="btn btn-primary">Anterior</button>
                    <button onClick={this.props.onFirstPageSelected} className="btn btn-secondary">1</button>
                    <span>...</span>
                    <button disabled={true} className="btn btn-primary">{this.props.actualPage + 1}</button>
                    <span>...</span>
                    <button onClick={this.props.onLastPageSelected} className="btn btn-secondary">{this.props.numberOfPages}</button>
                    <button onClick={this.props.onNextPageSelected} className="btn btn-primary">Siguiente</button>
                </div>
            );
        }
    }


    public render() {
        switch (this.props.numberOfPages) {
            case 0: return this.zeroPages();
            case 1: return this.onePage();
            case 2: return this.twoPages();
            case 3: return this.threePages();
            default: return this.fourOrMorePages();
        }
    }
}