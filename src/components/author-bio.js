import React, { Component } from 'react';
import '../assets/styles/components/author-bio.css';


class AuthorBio extends Component {

  static defaultProps = {
    author: {
        id: 0,
        idBnf: 0,
        idWikidata: 0,
        pseudonym: '',
        firstName: '',
        lastName: '',
        birth: 0,
        death: 0,
        img: '',
        works: null,
        datasets: null
    }
  }

  render() {
    const {author}= this.props;
    return  <section className='author-bio'>
                <p>{author.pseudonym}{` (${author.birth ? author.birth : '?'} - ${author.death ? author.death : '?'}).`}</p>
                {
                    author.firstName && author.lastName 
                        ? () => <p>Également connue sous le nom de <strong>{`${author.firstName} ${author.lastName}`}</strong></p> 
                        : <div />
                }
                
            </section>;
  }
}

export default AuthorBio;
