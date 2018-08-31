import React, { Component } from 'react';
import './author-index.css';
import API from '../../../../utils/api';
import Header from '../../../../components/header';
import Toolbar from '../../../../components/toolbar';
import IndexList from '../../../../components/index-list';
import Menu from '../../../../components/menu';
import LoadingScreen from '../../../../components/loading-screen';

class AuthorIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appOK: false,
      authors: [],
    }
  }

  static defaultProps = {
    type: 'authors'
  }

  componentDidMount() {
    API.authorsIndex()
       .then(d => {
        this.setState({authors: d, appOK: true})
       })
       .catch(e => console.log(e));
  }  

  render() {
    console.log(this.state);
    return (
      <main className='index-view'>
          <LoadingScreen appOK={this.state.appOK} />
          <Menu />
          <Header level={1} title='Vue de détail :' subtitle='les héroines' type={this.props.type} isIndexView={true} />
          <section className='section'>
            <IndexList type='horizontal-scroll' dataType='authors' data={this.state.authors} />
          </section>
          <Toolbar type={this.props.type} />
      </main>
    );
  }
}

export default AuthorIndex;
