import React, { Component, Fragment } from "react";
import SearchComponent from "./Component/SearchComponent";
import axios from "axios";
import DisplayGitUsers from "./Component/DisplayGitUsers";
class App extends Component {
  state = {
    term: "",
    reposData: "",
    loading: false,
  };
  onTermSubmit = async term => {
    let client_id = "Iv1.78b28e91f97285a3";
    let client_secret = "7811a25f34f4d787593d71db738c070a1a66d6bc";
    let response = await axios.get(
      `https:api.github.com/users/${term}?Client_Id${client_id}&Client_Secret${client_secret}`
    );

    let repos = await axios.get(
      `https://api.github.com/users/${term}/repos?Client_Id${client_id}&Client_Secret${client_secret}`
    );

    this.setState({ term: response.data, reposData: repos, loading: true });
  };
  render() {
    return (
      <Fragment>
        <SearchComponent onTermSubmit={this.onTermSubmit} />
        <section className="container my-2">
          <hr className="hr" />
          <DisplayGitUsers
            users={this.state.term}
            repos={this.state.reposData}
            loading={this.state.loading}
          />
        </section>
      </Fragment>
    );
  }
}

export default App;
