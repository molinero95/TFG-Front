import * as React from "react";

interface IHomeProps {

}

interface IHomeState {

}
export class Home extends React.Component<IHomeProps, IHomeState>{

    public constructor(props: IHomeProps){
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                Este es el home
            </div>
        );
    }
}