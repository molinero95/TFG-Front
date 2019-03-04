import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {    
    public render() {
        return (
            <div className=''>
                <div className='row'>
                    <NavMenu />
                </div>
                    {this.props.children}
            </div>
        );
    }
}
