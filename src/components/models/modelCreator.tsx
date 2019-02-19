import React = require("react");

interface IModelCreatorProps{
    onModelCreated: (newModelName: string) => void;
}

interface IModelCreatorState{

}

export class ModelCreator extends React.Component<IModelCreatorProps, IModelCreatorState>{
    constructor(props: IModelCreatorProps){
        super(props);
        this.state = {
            
        }
    }
    public render(){
        return (
        <div>
            
        </div>
        );
    }
}