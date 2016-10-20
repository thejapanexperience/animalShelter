import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

let _animals
let _clients
let _details

class Store extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {

        case 'GOT_ANIMALS':
          _animals = action.payload.data
          console.log('_animals: ', _animals)
          this.emit('CHANGE');
          break;

        case 'GOT_CLIENTS':
        console.log('_clients: ', _clients)
          _clients = action.payload.data
          console.log('_clients: ', _clients)
          this.emit('CHANGE');
          break;

        case 'GOT_DETAILS':
        console.log('_clients: ', _clients)
          _details = action.payload.data
          console.log('_details: ', _details)
          this.emit('CHANGE');
          break;

        default:
          console.log('INVALID_ACTION_TYPE');
          break;
      }
    });
  }

  startListening (callback) {
    this.on('CHANGE', callback);
  }

  stopListening (callback) {
    this.removeListener('CHANGE', callback);
  }

  getAnimals () {
    return _animals;
  }

  getClients () {
    return _clients;
  }

  getDetails () {
    return _details;
  }
}

export default new Store();
