import React from 'react';
import RedditStore from '../stores/RedditStore.js';
import { selectPost } from '../actions/RedditActions.js';
import Post from './Post.jsx';

export default class PostList extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.state = {
      posts: RedditStore.getAllPosts(),
      loading: RedditStore.isLoading(),
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
      posts: RedditStore.getAllPosts(),
      loading: RedditStore.isLoading(),
    });
  }

  handlePostClick(index) {
    selectPost(this.state.posts[index]);
  }

  render() {
    // get array of posts
    let posts = [];

    if (this.state.loading) {
      // if page is loading, return loader
      posts = (

        <div className="row loader">
          <img
            src="/images/loader.gif"
          />
        </div>

      );
    }

    if (this.state.posts.length > 0) {
      posts = this.state.posts.map((post, index) => {
        return (

          <Post
            key={index}
            index={index}
            author={post.author}
            comments={post.comments}
            downs={post.downs}
            thumbnail={post.thumbnail}
            title={post.title}
            ups={post.ups}
            handlePostClick={this.handlePostClick}
          />

        );
      });
    }
    return (

      <div className="container">
        {posts}
      </div>

    );
  }
}

PostList.propTypes = {
};

