import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions, ViewFilters } from '../utils/AppConstants.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Could be replaced with ImmutableJS or Immutability helpers:
// https://facebook.github.io/react/docs/update.html
let _store = {
  loading: false,
  modal: {},
  posts: [],
};

class RedditStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllPosts() {
    return _store.posts;
  }

  isLoading() {
    return _store.loading;
  }

  getModal() {
    return _store.modal;
  }
}

const RedditStore = new RedditStoreClass();

AppDispatcher.register((payload) => {
  switch (payload.action.type) {

  case Actions.GET_REDDIT_CATEGORY:
    // set the status to loading
    _store.loading = true;
    RedditStore.emit(CHANGE_EVENT);
    break;

  case Actions.RECEIVE_REDDIT_CATEGORY:
    // build a post result array from the API results
    let postArray;
    if (payload.action.posts === false) {
      // if no posts were returned from Reddit
      postArray = [];
    } else {
      // if we have posts from Reddit
      postArray = payload.action.posts.children.map((post, index) => {
        const thumb = post.data.thumbnail;
        let thumbnail;
        // return profile image only if it is an image file
        if (thumb.endsWith('.jpg') || thumb.endsWith('.png')) {
          thumbnail = thumb;
        } else {
          // otherwise, use unknown image
          thumbnail = '/images/unknown.png';
        }
        // return formatted data
        return {
          id: index,
          author: post.data.author,
          comments: post.data.num_comments,
          downs: post.data.downs,
          permalink: `http://reddit.com${post.data.permalink}`,
          thumbnail: thumbnail,
          title: post.data.title,
          ups: post.data.ups,
        };
      });
    }
    // populate posts with post array
    _store.posts = postArray;
    _store.loading = false;
    // tell all store subscribers the data has changed
    RedditStore.emit(CHANGE_EVENT);
    break;

  case Actions.SELECT_POST:
    // set the modal to the post object
    _store.modal = payload.action.post;
    RedditStore.emit(CHANGE_EVENT);
    break;

  case Actions.CLOSE_POST:
    // set the modal to empty
    _store.modal = {};
    // fade out before removing
    $('.backdrop, .post-modal').fadeOut(() => {
      RedditStore.emit(CHANGE_EVENT);
    });
    break;

  default:
  }
});

export default RedditStore;

