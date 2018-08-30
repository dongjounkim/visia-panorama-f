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
    const {author}= this.props,
          ul = () => <ul>
          {author.idBnf && <li>{author.idBnf}</li>}
          {author.idWikidata && <li>{author.idWikidata}</li>}
        </ul>;
    return  <section className='author-bio'>
                <h1>{author.pseudonym}</h1>
                <p>{` (${author.birth ? author.birth : '?'} - ${author.death ? author.death : '?'}).`}</p>
                {/* {
                  (author.idBnf || author.idWikidata) && ul()
                } */}
                {/* {
                    author.firstName && author.lastName 
                        ? () => <p>Également connue sous le nom de <strong>{`${author.firstName} ${author.lastName}`}</strong></p> 
                        : <div />
                } */}
            </section>;
  }
}

export default AuthorBio;
