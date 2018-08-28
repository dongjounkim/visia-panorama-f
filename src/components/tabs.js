import React, { Component } from 'react';
import '../assets/styles/components/tabs.css';
import Tab from './tabs-tab';
import TabButton from './tabs-btn';
import Utils from '../utils/utils';


class Tabs extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      active: '',
      activeFlex: 'start'
    }
  }

  static defaultProps = {
      data: []
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.length > 0) {
      this.setState({active: newProps.data[0].query});
    }
  }

  switchTab = (alias) => {
    const {active} = this.state;
    if (alias === active) {
      return;
    } else {
      const newActiveFlex = this.props.data.findIndex(e => e.query === alias) > 0 ? 'end' : 'start';
      this.setState({
        active: alias, 
        activeFlex: newActiveFlex
      });
    }
  }

  renderTabs = () => {
    const {data} = this.props,
          {active} = this.state;
    if (data[0].query) {
        return <div className='tabs__container'>{
          data.map((c, i) => 
            <Tab key={`tab--content--${c.query}`}
                 text={c.description}
                 isActive={c.query === active ? true : false}
                 alias={c.query} />)
        }</div>;
    }
    
  }

  renderTabsController = () => {
    const {data} = this.props,
          {active} = this.state;;
    if (data[0].query) {
        const btns = data.map((c, i) => 
            <TabButton key={`tab--button--${c.query}`}
                name={c.name}
                isActive={c.query === active ? true : false}
                alias={c.query}
                onTabBtnClick={this.switchTab} />);
        return <nav className={`tabs--active-${this.state.activeFlex}`}>
                {Utils.intersperse(btns, <span key={`span--${Utils.generateString()}`}>{' & '}</span>)}
              </nav>;
    }
  }

  render() {
    return <div className='tabs'>
            {this.renderTabs()}
            {this.renderTabsController()}
           </div>;
  }
}

export default Tabs;
