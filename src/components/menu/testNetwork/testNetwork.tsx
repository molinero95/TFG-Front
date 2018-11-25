import * as React from "react";

interface ITestNetworkProps {

}

interface ITestNetworkState {

}
export class TestNetwork extends React.Component<ITestNetworkState, ITestNetworkState>{


    public constructor(props: ITestNetworkProps){
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                Este es el test
            </div>
        );
    }
}