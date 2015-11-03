// Utilities for getting data from the Reddit API
import { receiveGetCategory } from '../actions/RedditServerActions.js';
import request from 'superagent';

export function getCategory(category) {
  request.get(`http://www.reddit.com/r/${category}.json`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        console.error(err);
        return receiveGetCategory(false);
      }
      // Pass response payload to server action to repopulate store
      receiveGetCategory(response.body.data);
    });
}

