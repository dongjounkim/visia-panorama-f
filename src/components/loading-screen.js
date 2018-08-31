//Core
import React, { Component } from 'react';

import SVG from 'react-inlinesvg';
import Warp from 'warpjs';
import charming from 'charming';

//Styles
import '../assets/styles/components/loading-screen.css';


class LoadingScreen extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  static defaultProps = {
      appOK: false
  }

  static defaultProps = {
    title: `Histoires d'Autrices`,
    subtitle: `À la découverte des femmes de lettres étudiées, jouées, lues, primées ou publiées en France.`
  }
  
  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.props.appOK) {
      const screen = this.ref.current;
      screen.classList.add('on-page-ready');
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div ref={this.ref} className="loading-screen">
                <div className="spinner-eff spinner-eff-3">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                <div className="spinner-eff spinner-eff-3">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                <div className="spinner-eff spinner-eff-3">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
    </div> ;
  }
}

export default LoadingScreen;
 