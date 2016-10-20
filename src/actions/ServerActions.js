import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  gotAnimals (data) {
    console.log('in ServerActions');
    AppDispatcher.dispatch({
      type: 'GOT_ANIMALS',
      payload: {data}
    });
  },

  gotClients (data) {
    console.log('in ServerActions');
    AppDispatcher.dispatch({
      type: 'GOT_CLIENTS',
      payload: {data}
    });
  },

  gotDetails (data) {
    console.log('in ServerActions');
    console.log('data: ', data)
    AppDispatcher.dispatch({
      type: 'GOT_DETAILS',
      payload: {data}
    });
  },

  updateFavorites (favorites) {
    AppDispatcher.dispatch({
      type: 'UPDATE_FAVORITES',
      payload: {favorites}
    });
  }
};

export default ServerActions;
