import React, { Component } from 'react';

class ToolbarOptsElement extends Component { 

  static defaultProps = {
    opt: '',
  }

  render() {
    const {id, opt} = this.props
    return  <button data-id={id}>
              {opt}
            </button>
  }
}

export default ToolbarOptsElement;
