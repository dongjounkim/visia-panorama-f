import React, { Component } from 'react';
import '../assets/styles/components/index-list.css';
import IndexListHorizontalScroll from './index-list-horizontal-scroll';


class IndexList extends Component {
  constructor(props) {
      super(props);
  }

  static defaultProps = {
    type: 'horizontal-scroll'
  }

  renderIndexList = () => {
    switch (this.props.type) {
      case 'horizontal-scroll':
        return <ul className='index-list--hs'>
                <IndexListHorizontalScroll dataType={this.props.dataType} data={this.props.data} />
              </ul>;
        break;
      default:
        break;
    }
  }

  render() {
    return this.renderIndexList();
  }
}

export default IndexList;
