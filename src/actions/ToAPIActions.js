import API from '../API';
import AppDispatcher from '../AppDispatcher';

const ToAPIActions = {
  submitAnimal: API.submitAnimal,
  submitClient: API.submitClient,
  // submitBoth: API.submitBoth,
  getClients: API.getClients,
  getAnimals: API.getAnimals,
  getBoth: API.getBoth,
  seeNames: API.seeNames,
  getDetails: API.getDetails,
};

export default ToAPIActions;
