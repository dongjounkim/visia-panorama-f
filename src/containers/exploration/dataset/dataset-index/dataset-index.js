import React, { Component } from 'react';
import './dataset-index.css';
import API from '../../../../utils/api';
import Utils from '../../../../utils/utils';
import Header from '../../../../components/header';
import Toolbar from '../../../../components/toolbar';
import IndexList from '../../../../components/index-list';
import Menu from '../../../../components/menu';

class DatasetIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: {
        all: [],
        cats: [],
        types: {}
      },
    }
  }

  static defaultProps = {
    type: 'datasets'
  }

  componentDidMount() {
    API.datasetsIndex()
       .then(d => {
        let _d = {};

        _d.all = d;
        _d.cats = Utils.pluckThenUniq(d, 'cat');
        _d.types = {};
        _d.cats.forEach(c => {
          _d.types[c] = Utils.uniqObjs(
                          d.filter(e => e.cat === c)
                            .map(e => { return {id: e.stats_type_id_FK, name: e.type}; })
                        );
        }) 

        this.setState({datasets: _d});
        return(_d);
       })
       .catch(e => console.log(e));
  }  

  render() {
    console.log(this.state);
    return (
      <main className='index-view'>
          <Menu />
          <Header level={1} title='Vue de détail : ' subtitle='les aventures' type={this.props.type} isIndexView={true} />
          <section className='section'>
            <IndexList dataType='datasets' data={this.state.datasets} />
          </section>
          <Toolbar type={this.props.type} data={this.state.datasets} />
      </main>
    );
  }
}

export default DatasetIndex;
