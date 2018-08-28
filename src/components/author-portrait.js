import React, { Component } from 'react';
import '../assets/styles/components/author-portrait.css';


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
                <figure>
                    <a href={img.url} target='_blank'>
                        <img src={img.url} alt={`${pseudonym}, ©${img.src}`} />
                    </a>
                </figure>
            </section>;
  }
}

export default AuthorPortrait;
