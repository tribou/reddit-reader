import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions } from '../utils/AppConstants.js';
import * as Reddit from '../utils/RedditAPI.js';

export function getCategory(category) {
  AppDispatcher.handleViewAction({
    type: Actions.GET_REDDIT_CATEGORY,
    category: category,
  });

  Reddit.getCategory(category);
}

export function selectPost(post) {
  AppDispatcher.handleViewAction({
    type: Actions.SELECT_POST,
    post: post,
  });
}

export function closePost() {
  AppDispatcher.handleViewAction({
    type: Actions.CLOSE_POST,
  });
}

