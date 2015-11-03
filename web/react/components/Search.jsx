import React from 'react';
import { getCategory } from '../actions/RedditActions.js';

const defaultCategory = 'funny';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this._onKeyChange = this._onKeyChange.bind(this);
    this.state = {
      text: defaultCategory,
    };

    // get defaultCategory
    getCategory(defaultCategory);
  }

  _onKeyChange(event) {
    const category = event.target.value.trim();
    this.setState({
      text: category,
    });
    getCategory(category);
  }

  render() {
    return (
      <div className="form-group">
        <input
          className="search"
          onChange={this._onKeyChange}
          placeholder="Category"
          type="text"
          value={this.state.text}
        />
      </div>
    );
  }
}

Search.propTypes = {
};

