import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import NameContainer from './components/NameContainer';

class App extends Component {

  state = {
    names: [],
    searchTerm: ''
  };

  getData = axios.create({
    method: 'GET',
    baseURL: 'https://jsonplaceholder.typicode.com',
    responseType: 'json'
  });

  getUsers = response => {
    let names = [];
    response.data.map(item => names.push({id: item.id, name: item.name}));
    this.setState({names: names})
  };

  componentDidMount() {
    this.getData('/users')
    .then(response => this.getUsers(response))
    .catch(error => console.log('Request failure: ', error.message))
  }

  editSearchTerm = event => this.setState({ searchTerm: event.target.value });
  dynamicSearch = () => this.state.names.filter(name => this.state.searchTerm !== '' ? name.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : '');

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.searchTerm} onChange={this.editSearchTerm} placeholder="Search for a name" />
        <br/><br/>
        <h3>There are the important names:</h3>
        <NameContainer names={this.dynamicSearch()} />
      </div>
    );
  }
}

export default App;
