import React from 'react';
import ObjectFit from 'object-fit';

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this._onPostClick = this._onPostClick.bind(this);
  }

  componentDidMount(){
    // polyfill "object-fit" CSS property for IE
    // https://github.com/anselmh/object-fit
    ObjectFit.polyfill({
      selector: '.profile-image img',
      fittype: 'contain',
    });
  }

  _onPostClick() {
    this.props.handlePostClick(this.props.index);
  }

  render() {
    return (
      <div className="row">
        <div
          className="post col-sm-8 col-sm-offset-2"
          onClick={this._onPostClick}>
          <div className="col-md-2">
            <div className="profile-image">
              <img
                src={this.props.thumbnail}
              />
            </div>
          </div>
          <div className="col-md-10">
            <div className="post-author">{this.props.author}</div>
            <div className="post-title">{this.props.title}</div>
            <div className="post-attributes">
              <div className="post-comments comments-icon">
                {this.props.comments} comments
              </div>
              <div className="post-ups ups-icon">
                {this.props.ups} ups
              </div>
              <div className="post-downs downs-icon">
                {this.props.downs} downs
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  author: React.PropTypes.string,
  comments: React.PropTypes.number,
  downs: React.PropTypes.number,
  handlePostClick: React.PropTypes.func,
  index: React.PropTypes.number,
  thumbnail: React.PropTypes.string,
  title: React.PropTypes.string,
  ups: React.PropTypes.number,
};

