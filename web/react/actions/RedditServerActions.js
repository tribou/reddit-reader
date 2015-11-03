import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions } from '../utils/AppConstants.js';

export function receiveGetCategory(posts) {
  AppDispatcher.handleServerAction({
    type: Actions.RECEIVE_REDDIT_CATEGORY,
    posts: posts,
  });
}

