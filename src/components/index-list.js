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
    let {dataType} = this.props,
        classNames = ['index-list--hs'],
        indexList;

    switch (this.props.dataType) {
      case 'authors':
      case 'datasets':
        break;
      case 'authorWorks':
        classNames = [...classNames, 'index-list--hs-alt', 'index-list--hs-between'];
        break;
      case 'authorDatasets':
        classNames = [...classNames, 'index-list--hs-alt', 'index-list--hs-around'];
        break;
      default:
        break;
    }
    
    indexList = <ul className={classNames.join(' ')}>
      <IndexListHorizontalScroll dataType={this.props.dataType} data={this.props.data} />
    </ul>;
    return indexList;
  }

  render() {
    return this.renderIndexList();
  }
}

export default IndexList;
