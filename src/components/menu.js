//Core
import React, { Component } from 'react';

//Styles
import '../assets/styles/components/menu.css';

const defaultFontSizeMapper = word => word.value;


class Menu extends Component {

  ref = React.createRef();
  
  componentDidMount() {
        let node = this.ref.current,
              els = node.querySelectorAll('.menu a, .menu header'),
              groupLen = Math.ceil(els.length/3),
              groupNb = 0,
              i = 1;
        
        node.style.setProperty('--count', `${els.length}`);

        els.forEach(el => {
            if (i > groupLen) {
                groupNb++;
                i = 1;
            }
            el.setAttribute('data-group', groupNb);
            i++;
        });

        els.forEach((el, j) => {
            el.style.setProperty('--top', `${el.getBoundingClientRect().top + (el.getAttribute('data-group') * -15) - 20}px`);
            el.style.setProperty('--delay-in',` ${j*.1}s`);
            el.style.setProperty('--delay-out', `${(els.length-j)*.1}s`);
        });

        node.querySelector('footer button').addEventListener('click', e => {
            e.preventDefault();
            els.forEach((el, j) => {
                el.style.setProperty('--top', `${el.getBoundingClientRect().top + (el.getAttribute('data-group') * -15) - 20}px`);
                el.style.setProperty('--delay-in',` ${j*.1}s`);
                el.style.setProperty('--delay-out', `${(els.length-j)*.1}s`);
            });
            node.classList.toggle('closed');
            e.stopPropagation();
        });
  }

  render() {
    return <nav ref={this.ref} className="menu closed">
        <header><span>×</span></header>
        <ul>
            <li className="menu__gritem">
                <a href="/">Embarquement</a>
                <ul className="menu__sub">
                    <li className="menu__item"><a href="/">une.</a></li>
                    <li className="menu__item"><a href="/">préface.</a></li>
                </ul>
            </li>
            <li className="menu__gritem">
                <a href="/explore">Exploration</a>
                <ul className="menu__sub">
                    <li className="menu__item"><a href="/explore/datasets">aventures.</a></li>
                    <li className="menu__item"><a href="/explore/authors">héroines.</a></li>
                </ul>
            </li>
        </ul>
        <footer><button aria-label="Afficher/Cacher le menu">Afficher/Cacher le menu</button></footer>
    </nav> ;
  }
}

export default Menu;
