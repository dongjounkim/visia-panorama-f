import React, { Component } from 'react';
import Utils from '../utils/utils';


class Tab extends Component {

    render() {
        const {text, isActive} = this.props;
        return <div className={`tabs__tab ${isActive ? 'active' : ''}`} 
                    dangerouslySetInnerHTML={Utils.createMarkup(text)} />
    }
}
            
export default Tab;
            