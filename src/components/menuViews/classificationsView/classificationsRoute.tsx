import React = require("react");
import { ClassificationsMainView } from "./classificationsMainView";

interface IClassificationsRouteProps {

}

interface IClassificationsRouteState {

}

export class ClassificationsRoute extends React.Component<IClassificationsRouteProps, IClassificationsRouteState>{

	public constructor(props: IClassificationsRouteProps) {
		super(props);

    }
    
    
    public render(){
        return (
            <ClassificationsMainView></ClassificationsMainView>
        )
    }
}
