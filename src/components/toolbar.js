import React, { Component } from 'react';
import '../assets/styles/components/toolbar.css';
import Utils from '../utils/utils';
import ToolbarOpts from './toolbar-opts';


class Toolbar extends Component {
  constructor(props) {
      super(props);

      this.state = {type: null};
      
  }

  renderFooter() {
    let footer,
        {type, data} = this.props;
    switch (type) {
      case 'datasets':
        // footer = <section>
        //             {'Je découvre '}
        //             {<ToolbarOpts type={type} level={0} data={this.props.location} />}
        //             {' de catégorie(s) '}
        //             {<ToolbarOpts type={type} level={1} data={data.cats}/>}
        //             {' de types '}
        //             {<ToolbarOpts type={type} level={2} data={data.types} />}
        //             {'.'}
        //           </section>;
        break;
      case 'authors':
        footer = <section>Je découvre  les femmes qui se sont distinguées dans la littérature, héroïnes incontournables ou méconnues d'hier et d'aujourd'hui.</section>
        break;
      default:
        break
    }
    return footer;
  }

  render() {
    return  <footer className='toolbar'>
                {this.renderFooter()}
            </footer>;
  }
}

export default Toolbar;
