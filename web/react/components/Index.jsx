import React from 'react';
import RedditStore from '../stores/RedditStore.js';
import Nav from './Nav.jsx';
import PostList from './PostList.jsx';
import PostModal from './PostModal.jsx';

// Entrypoint for the React app
export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      modal: RedditStore.getModal(),
    };
  }

  componentDidMount() {
    RedditStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    RedditStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      modal: RedditStore.getModal(),
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <PostList />
        {(() => {
          // if there is a modal loaded, show it
          if (Object.keys(this.state.modal).length > 0) {
            const post = this.state.modal;
            return (

              <PostModal
                key={post.id}
                index={post.id}
                author={post.author}
                comments={post.comments}
                permalink={post.permalink}
                thumbnail={post.thumbnail}
                title={post.title}
                ups={post.ups}
              />

            );
          }
        })()}
      </div>
    );
  }
}

Index.propTypes = {
};

