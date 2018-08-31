import React, { Component } from 'react';
import '../assets/styles/components/call-to-action.css';


class CallToAction extends Component {

  static defaultProps = {
      actions: []
  }

  renderCalltoAction = () => {
    const {actions} = this.props;
    if (actions.length > 0) {
      return actions.map((a, i) => 
          <li key={`call-to-action--${i}`}> 
              {(a.url && <a href={a.url}> {a.details} </a>)
              ||
              <span> {a.details} </span>} 
          </li>
      );
    } else {
      return false;
    }
  }

  render() {
    return <ul className="actions">
            {this.renderCalltoAction()}
            <li key={`call-to-action--add`}>
              <a href='mailto:george-2e-texte@gmx.fr'>Proposez-nous vos propres idées !</a> 
            </li>
          </ul>;
  }
}

export default CallToAction;
