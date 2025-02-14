//Core
import React, { Component } from 'react';

import SVG from 'react-inlinesvg';
import Warp from 'warpjs';
import charming from 'charming';

//Styles
import '../assets/styles/components/splash-screen.css';

import loremIpspumSVG from '../assets/images/lorem-ipsum.svg';
import decor2SVG from '../assets/images/decor--2.svg';

import { animateLetters1 } from './animations';


class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      splashScreenOK: false
    }
  }

  static defaultProps = {
    title: `Histoires d'Autrices`,
    subtitle: `À la découverte des femmes de lettres étudiées, jouées, lues, primées ou publiées en France.`
  }
  
  componentDidMount() {
  }

  componentDidUpdate() {
    // setTimeout(() => {
    if (!this.state.splashScreenOK) {
      const screen = this.ref.current;

      let loremIpspum = screen.querySelector('.splash-screen__lorem-ipsum'),
          svg = loremIpspum.querySelector('svg'),
          warp;

      while (!svg) {
        svg = loremIpspum.querySelector('svg');
      }

      warp = new Warp(svg);
      warp.interpolate(4);
      warp.transform(([ x, y ]) => [ x, y + 4 * Math.sin(x / 16), x + 10 * Math.sin(y/8), y + 2 * Math.sin(x / 16) ]);
      loremIpspum.classList.contains('hidden') && loremIpspum.classList.remove('hidden');

      let title = screen.querySelector('.splash-screen__title'),
          titleWords = Array.from(title.querySelectorAll('span.splash-screen__title__word'));

      titleWords.forEach(w => {
        let letters;
        charming(w);
        letters = w.querySelectorAll('span');
        animateLetters1(letters);
      });

      this.setState({splashScreenOK: true});
      this.props.onRendered();
    }
    // }, 500);
  }

  render() {
    return <div ref={this.ref} className="splash-screen">
        <div className='splash-screen__lorem-ipsum hidden'>
          <SVG src={loremIpspumSVG} />
        </div>
        <h1 className='splash-screen__title'>
          {this.props.title.split(' ')
            .map((w, i) => <span className='splash-screen__title__word' key={`title__w${i}`}>{w}</span>)}
        </h1>
        <p className='splash-screen__subtitle'>
          {this.props.subtitle}
          <SVG src={decor2SVG} />
        </p>
    </div> ;
  }
}

export default SplashScreen;
 