import React, { Component } from 'react';
import '../assets/styles/components/header.css';


class Header extends Component {
  constructor(props) {
      super(props);

      this.state = {type: null};
      
  }

  static defaultProps = {
    title: '',
    subtitle: '',
    isIndexView: false,
  }

  renderHeader = () => {
    let header;
    const {title, subtitle, level, isIndexView} = this.props;
    switch (level) {
      case 1:
        header = <header className={`header header--1 ${isIndexView ? 'index-view' : ''}`}>
                  <h1>{title} <span className="header__subtitle">{subtitle}</span>.</h1>
                </header>;
        break;
      case 2:
      case 3:
        header = <header className={`header header--${level}`}>
                    <h2>{title}</h2>
                    {
                      !subtitle ? 
                        <div /> :  
                        <div className="header__subtitle">
                            <p>{subtitle}</p>
                        </div>
                    }
                </header>;
          break;
      case 4:
          header = <header className='header header--4'>
                      <h2>{title.slice(0, -1)}<span>{title.substring(title.length-1)}</span>.</h2>
                      {
                      !subtitle ? 
                        <div /> :  
                        <div className="header__subtitle">
                            <p>{subtitle}</p>
                        </div>
                      }
                    </header>;
          break;
      default:
        break;
    }
    return header;
  }

  render() {
    return this.renderHeader();
  }
}

export default Header;
