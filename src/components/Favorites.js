import React, { Component } from 'react';
import uuid from 'uuid';
import { browserHistory } from 'react-router';

import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';

export default class Favorites extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount () {

  }

  componentWillUnmount () {

  }

  _onChange () {

  }

  render () {
    return (
      <div>
        <h1>@FAVORITES</h1>
      </div>
    );
  }
}
