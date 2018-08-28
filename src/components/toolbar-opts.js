import React, { Component } from 'react';
import Utils from '../utils/utils';
import ToolbarOptsGroupName from './toolbar-opts-groupName';
import ToolbarOptsGroup from './toolbar-opts-group';
import { verticalAnimateIn, verticalAnimateOut } from './toolbar-opts-group-animations';

class ToolbarOpts extends Component { 

  constructor(props) {
    super(props);

    this.state = {
        optsGroupVisible: false
    }
  }

  toggleOptsVisible = () => {
    this.setState(prevState => {
        return {optsGroupVisible: !prevState.optsGroupVisible};
    });
  }

  renderOpts = () => {
    let opts,
        {type} = this.props;
    switch (type) {
        case 'datasets':
            opts = this.optsDatasets();
            break;
        default:
            break;
    }
    return opts;
  }

  optsDatasets = () => {
    let optsGroup, optsName,
        {type, level, data} = this.props;
    switch (level) {
        case 0: //datasets
            optsName = <ToolbarOptsGroupName
                        name='les aventures'
                        toggleOptsVisible={this.toggleOptsVisible}
                        key={`opts--${type}--${level}--name`} />;

            break;
        case 1: //categories
            console.log(data);
            optsName = <ToolbarOptsGroupName
                        name={Utils.intersperse(data.map(c => c.toLowerCase()), ' & ')}
                        toggleOptsVisible={this.toggleOptsVisible} 
                        key={`opts--${type}--${level}--name`} />;
            optsGroup = <ToolbarOptsGroup 
                        key={`opts--${type}--${level}--group`}
                        visible={this.state.optsGroupVisible}
                        opts={data} />;
        default:
            break;
    }
    return [optsName, optsGroup];
  }

  render() {
    return  <div className='toolbar__opts'>{this.renderOpts()}</div>;
  }
}

export default ToolbarOpts;
