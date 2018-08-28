import React, { Component } from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import './dataset-content.css';
import Wordcloud from '../../../../components/wordcloud';
import API from '../../../../utils/api';
import Chart from '../../../../components/chart';
import Header from '../../../../components/header';
import CallToAction from '../../../../components/call-to-action';
import Menu from '../../../../components/menu';

class DatasetContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: '',
      cat: '',
      desc: '',
      begin: '',
      end: '',
      data: [],
      authorsM: [],
      authorsF: [],
      actions: [],
    }
  }

  componentDidMount() {
    API.datasetsOne(this.props.match.params.id)
       .then(d => {
        this.setState({
          id: d.dataset_id,
          name: d.name,
          cat: d.category,
          desc: d.description,
          begin: d.date_begin,
          end: d.date_end,
          data: _.values(d.data),
          authorsM: _.values(d.authorsM), //_.uniqBy(_.values(d.authorsM), 'id_author'),
          authorsF: _.values(d.authorsF), //_.uniqBy(_.values(d.authorsF), 'id_author'),
          actions: d.actions
        });
        return new Set(_.map(_.values(d.authorsF), a => a.id_author));
       })
       .then(authorsF => this.updateAuthorsImg(authorsF))
       .catch(e => console.log(e));
  }  

  updateAuthorsImg(authors) {
    for (const authorId of authors) {
     API.authorsImg(authorId)
        .then(img => {
          this.setState(prevState => {
            //Only make change from the first occurence of the author
            //(since other occurences doesn't matter anyway)
            prevState.authorsF
              .find(a => a.id_author === authorId)
              .img = img;
            return {authorsF: prevState.authorsF};
          });
        })
        .catch(e => console.log(e));
    }
  } 

  render() {
    const dataset = this.state;
    console.log(dataset);
    return (
      <main>
        <Menu />
        <section className="section">
          <Header level={2} title={`${dataset.name}.`} subtitle={dataset.desc} />
        </section>

        <section className="section">
          <Header level={3} title={'La présence de nos héroïnes.'} subtitle={'Phrase percutante ou récap.'} />
          <div className='content'>
            <Chart type='pie' data={dataset.data} authorsF={dataset.authorsF} authorsM={dataset.authorsM}/>
            <Wordcloud authorsF={dataset.authorsF} />
          </div>
        </section>

        <section className="section">
          <Header level={3} title={'Les données.'} subtitle={'Accédez à chacune des données en y cliquant !'} />
          <div className='content'>
            <Chart type='bar' data={dataset.data} authorsF={dataset.authorsF} authorsM={dataset.authorsM}/>
            <Chart type='bubble' name={dataset.name} data={dataset.data} authorsF={dataset.authorsF} authorsM={dataset.authorsM}/>
          </div>
        </section>

        <section className="section">
          <Header level={3} title={'Rejoignez cette belle aventure !'} 
            subtitle={`Voici quelques idées pour embellir cette aventure${dataset.cat.category ? ` d'${dataset.cat.category}` : ''}, et n'hésitez pas de proposer vos propres idées !`} />
          <CallToAction actions={dataset.actions} />
        </section>
      </main>
    );
  }
}

export default withRouter(DatasetContent);
