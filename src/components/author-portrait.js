import React, { Component } from 'react';
import '../assets/styles/components/author-portrait.css';
import Scribble from './scribble';
import DefaultPortrait from '../assets/images/decor--4.svg';


class AuthorPortrait extends Component {

  static defaultProps = {
    img: {
        url: '',
        src: '',
    },
    pseudonym: ''
  }

  render() {

    const {pseudonym, img} = this.props; 
    return  <section className='author-portrait'>
                <Scribble type={1} />
                <figure>
                    <a href={img.url} target='_blank'>
                        <img src={img.url ? img.url : DefaultPortrait} alt={`${pseudonym}, ©${img.src}`} />
                    </a>
                </figure>
            </section>;
  }
}

export default AuthorPortrait;
