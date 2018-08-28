import React, { Component } from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import './author-content.css';
import API from '../../../../utils/api';
import Header from '../../../../components/header';
import AuthorPortrait from '../../../../components/author-portrait';
import AuthorBio from '../../../../components/author-bio';
import IndexList from '../../../../components/index-list';

class AuthorContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: {                
        id: 0,
        idBnf: '',
        idWikidata: '',
        pseudonym: '',
        firstName: '',
        lastName: '',
        birth: 0,
        death: 0,
        img: {},
        works: {all: []},
        datasets: []
      },
    }
  }

  componentDidMount() {
    API.authorsOne(this.props.match.params.id)
       .then(a => {
        this.setState({
            author: {
                id: a.id_author,
                idBnf: a.id_bnf,
                idWikidata: a.id_wikidata,
                pseudonym: a.pseudonym,
                firstName: a.first_name,
                lastName: a.last_name,
                birth: a.date_of_birth,
                death: a.date_of_death,
                img: a.img,
                works: a.works,
                datasets: a.datasets
            },
        });
        return a.id_author;
       })
       .then(id => {
          this.updateAuthorImg(id);
          return id;
       })
       .then(id => this.updateAuthorWorks(id))
       .catch(e => console.log(e));
  }
  
  updateAuthorImg(authorId) {
     API.authorsImg(authorId)
        .then(img => {
          this.setState(prevState => {
            prevState.author.img = img;
            return {author: prevState.author};
          });
        })
        .catch(e => console.log(e));
  } 

  updateAuthorWorks(authorId) {
    API.authorsWorks(authorId)
       .then(works => {
         this.setState(prevState => {
           prevState.author.works = works;
           return {author: prevState.author};
         });
       })
       .catch(e => console.log(e));
 } 

  render() {
    const author = this.state.author;
    console.log(author);
    return (
      <main>
        <section className="section">
          <Header level={2} title={'L\'héroïne...'} subtitle={''} />
          <div className='content'>
            <AuthorPortrait pseudonym={author.pseudonym} img={author.img} />
            <AuthorBio />
          </div>
        </section>

        <section className="section">
          <Header level={3} title={`...les aventures auxquelles elle a pris part...`} subtitle={`Découvrez les jeux de données concernant ${author.pseudonym}.`} />
          <div className='content'>
            titititi
          </div>
        </section>

        <section className="section">
          <Header level={3} title={`...et les histoires auxquelles elle a donné vie.`} subtitle={`Plongez aussi dans ses œuvres de merveilles.`} />
          <div className='content'>
            <IndexList dataType='authorWorks' data={author.works} />
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(AuthorContent);
