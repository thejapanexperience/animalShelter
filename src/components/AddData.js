import React, { Component } from 'react';
import uuid from 'uuid';
import {Link} from 'react-router';

import ToAPIActions from '../actions/ToAPIActions';
import Store from '../stores/Store';

export default class AddData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: false,
      clients: false
    }

    this._onChange = this._onChange.bind(this);
    this._submitAnimal = this._submitAnimal.bind(this);
    this._submitClient = this._submitClient.bind(this);

  }

  componentWillMount(){
    ToAPIActions.getClients()
    Store.startListening(this._onChange)

  }

  componentWillUnmount(){
    Store.stopListening(this._onChange)
  }

  _onChange () {
    console.log('_onChange', Store.getAnimals());
    this.setState({
      animals: Store.getAnimals(),
      clients: Store.getClients(),
    });
  }

  _submitAnimal () {
    let { clients } = this.state
    let { animalType, animalName, animalAge, existingClient } = this.refs
    let theClient = existingClient.value
    let filter = clients.filter((client) => {
      return client.name === theClient
    })
    console.log('theClient: ', theClient)
    console.log('filter[0]: ', filter[0])
    let animal = {
      type: animalType.value,
      name: animalName.value,
      age: animalAge.value,
    }
    if (filter[0]) {
      animal.clientId = filter[0].clientId
    }
    console.log(animal);
    ToAPIActions.submitAnimal(animal)
  }

  _submitClient() {
    let { clientName } = this.refs
    let client={
      name: clientName.value
    }
    ToAPIActions.submitClient(client)
  }

  render () {

    console.log('in AddData render');
    const { clients } = this.state;
    let clientDropdown
    let clientList
    console.log('clients: ', clients)
    if (!clients) {
      console.log('no clients');
      clientDropdown =
        <select className="form-control">
          <option>None</option>
        </select>
    } else {
      clientList = clients.map(client => {
        console.log('client: ', client)
        return (
          <option key={client.clientId}>{client.name}</option>
        )
      })
      console.log('clientList: ', clientList)
      clientDropdown =
        <select ref="existingClient" className="form-control">
          <option disabled selected value> Choose a client</option>
          {clientList}
        </select>
      }


    return (
      <div className="container">
        <h1>Add Animals and Clients Below</h1>
        <h2>Add Add both to link them</h2>
        <div className="input-group input-group-lg">
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Animal Type</span>
          <input ref='animalType' type="text" className="form-control" defaultValue="Dog" aria-describedby="sizing-addon1"/>
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Animal Name</span>
          <input ref='animalName' type="text" className="form-control" defaultValue="Buster" aria-describedby="sizing-addon1"/>
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Animal Age</span>
          <input ref='animalAge' type="number" className="form-control" defaultValue="13" aria-describedby="sizing-addon1"/>
        </div>
        <br/>
        {clientDropdown}
        <br/>
        <Link to='/viewdata'><button onClick={this._submitAnimal} className="btn">Submit Data</button></Link>
        <br/>
        <br/>
        <div className="input-group input-group-lg">
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Add New Client</span>
          <input ref='clientName'type="text" className="form-control" defaultValue="Richard Mands" aria-describedby="sizing-addon1"/>
        </div>
        <br/>
        <button onClick={this._submitClient} className="btn">Add New Client</button>
      </div>
    );
  }
}
