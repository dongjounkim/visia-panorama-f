import React, { Component } from 'react';


class TabButton extends Component { 

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        let node = this.ref.current,
            height = node.getBoundingClientRect().height,
            span = node.querySelector('span');
        span.style.setProperty('--height',`${height/2}px`);
    }

    render() {
        const {name, alias, isActive, onTabBtnClick } = this.props;
        return <button ref={this.ref} className={`tabs__btn ${isActive ? 'active' : ''}`} onClick={() => onTabBtnClick(alias)}>
                <span>{name}</span>
            </button>;
    }
}
            
export default TabButton;
            