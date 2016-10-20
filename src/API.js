import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {

  submitBoth (animal, client) {
    console.log('in API');
    console.log('animal: ', animal)
    axios.post(`http://localhost:8000/api/animal`,{animal})
      .then((res) => {
        console.log('res.data: ', res.data)
        ServerActions.gotAnimals(res.data)
        console.log('client in API before post: ', client)
        return axios.post(`http://localhost:8000/api/client`,{client})
      })
      .then(res => {
        console.log('res.data: ', res.data)
        ServerActions.gotClients(res.data)
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  },

  getBoth(){
    axios.get(`http://localhost:8000/api/animal`)
    .then((res) => {
      ServerActions.gotAnimals(res.data)
      return axios.get(`http://localhost:8000/api/client`)
    })
    .then((res) => {
      ServerActions.gotClients(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  getAnimals(){
    axios.get(`http://localhost:8000/api/animal`)
    .then((res) => {
      ServerActions.gotAnimals(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  seeNames(){
    axios.get(`http://localhost:8000/api/animalowners`)
    .then((res) => {
      ServerActions.gotAnimals(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  submitAnimal (animal) {
    console.log('in API');
    console.log('animal: ', animal)
    axios.post(`http://localhost:8000/api/animal`,{animal})
      .then((res) => {
        ServerActions.gotAnimals(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  getClients(){
    axios.get(`http://localhost:8000/api/client`)
    .then((res) => {
      ServerActions.gotClients(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  getDetails(id){
    console.log('id: ', id)
    axios.get(`http://localhost:8000/api/clientdetails/${id}`)
    .then((res) => {
      ServerActions.gotDetails(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  submitClient (client) {
    console.log('in API');
    console.log('client: ', client)
    axios.post(`http://localhost:8000/api/client`,{client})
      .then((res) => {
        ServerActions.gotClients(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

}

export default API;
