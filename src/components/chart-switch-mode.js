import React, { Component } from 'react';
import _ from 'lodash';
import '../assets/styles/components/chart.css';

class ChartSwitchMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            mode: this.props.mode
        };
    }

    renderChartSwitchMode = () => {
        let renderedElement;

        switch (this.state.type) {
            case 'bar':
                renderedElement = this.state.mode.map((m, i) => 
                        <button 
                            key = {`barChartSwitchMode${i+1}`} 
                            onClick={() => this.props.handleSwitchMode(m)}>
                            {`Intervalle de ${m} année${m === 1 ? '' : 's'}`}
                        </button>
                    );
                break;
        
            default:
                break;
        }

        return renderedElement;
    }

    componentWillReceiveProps(newProps) {
        this.setState(((prevState, newProps) => {
            return {mode: newProps.mode};
        }));
    }

    render() {
        if (this.state.mode.length === 0) {
            return <div />;
        } else {
            return <nav className='chart__switch-modeBtns'>{this.renderChartSwitchMode()}</nav>;
        }
    }
}

export default ChartSwitchMode;
