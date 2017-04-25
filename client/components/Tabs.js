import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component{
  constructor(props){
      super(props);
      this.state = {
          selected: this.props.selected
      }
  }
  static defaultProps() {
    return {
      selected: 0
    };
  }
  
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }

  renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index} className={activeClass}>
          <a href="#" 
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }
  renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  
  render() {
    return (
      <div className="tabs">
        {this.renderTitles()}
        {this.renderContent()}
      </div>
    );
  }
};


Tabs.propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
}

export default Tabs;