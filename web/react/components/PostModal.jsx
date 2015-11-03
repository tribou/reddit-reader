import React from 'react';
import { closePost } from '../actions/RedditActions.js';

export default class PostModal extends React.Component {

  constructor(props) {
    super(props);
    this._allowDrop = this._allowDrop.bind(this);
    this._onBackdropClick = this._onBackdropClick.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDropMail = this._onDropMail.bind(this);
    this._onDropReddit = this._onDropReddit.bind(this);
  }

  componentDidMount() {
    // fade in
    $('.backdrop, .post-modal').fadeIn();
  }

  _allowDrop(event) {
    event.preventDefault();
  }

  _onBackdropClick() {
    closePost();
  }

  _onDragStart(event) {
    // const data = this.props.index;
    // event.dataTransfer.setData('text', data);
  }

  _onDropReddit(event) {
    window.open(this.props.permalink, '_blank');
  }

  _onDropMail(event) {
    window.location.href = 'mailto:mail@example.org'
      + '?subject=Check out this Reddit post'
      + '&body=' + this.props.permalink;
  }

  render() {
    return (
      <div>
        <div
          className="backdrop"
          onClick={this._onBackdropClick}>
        </div>
        <div className="container">
          <div className="row">
            <div
              className="post post-modal col-sm-2 col-sm-offset-3 fixed"
              draggable={true}>
              <div className="col-md-8 col-md-offset-2">
                <div className="profile-image">
                  <img
                    draggable={false}
                    src={this.props.thumbnail}
                  />
                </div>
              </div>
              <div className="col-md-10 col-md-offset-1">
                <div className="post-author">{this.props.author}</div>
                <div className="post-title">{this.props.title}</div>
              </div>
              <div className="col-md-12">
                <div className="post-attributes">
                  <div className="post-comments comments-icon">
                    {this.props.comments}
                  </div>
                  <div className="post-ups ups-icon">
                    {this.props.ups}
                  </div>
                </div>
              </div>
            </div>
            <div className="instruction post-modal col-sm-2 col-sm-offset-5 fixed">
              Drag the card on the left to the desired action
            </div>
            <div
              className="select-option post-modal col-sm-2 col-sm-offset-7 fixed"
              onDragOver={this._allowDrop}
              onDrop={this._onDropReddit}>
              <div className="row">
                <img
                  draggable={false}
                  src="/images/reddit-logo.png"
                />
                <br />
                Open on Reddit
              </div>
            </div>
            <div
              className="email select-option post-modal col-sm-2 col-sm-offset-7 fixed"
              onDragOver={this._allowDrop}
              onDrop={this._onDropMail}>
              <div className="row">
                <img
                  src="/images/mail-logo.png"
                />
                <br />
                Email to a Friend
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostModal.propTypes = {
  author: React.PropTypes.string,
  comments: React.PropTypes.number,
  index: React.PropTypes.number,
  permalink: React.PropTypes.string,
  thumbnail: React.PropTypes.string,
  title: React.PropTypes.string,
  ups: React.PropTypes.number,
};

