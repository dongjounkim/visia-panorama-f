import React, { Component } from 'react';

class ToolbarOptsGroupName extends Component { 

  static defaultProps = {
      name: '',
  }

  render() {
    return  <span className='toolbar__group__name' 
                onClick={() => this.props.toggleOptsVisible()}>
                {this.props.name}
            </span>;
  }
}

export default ToolbarOptsGroupName;
