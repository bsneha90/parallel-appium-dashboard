import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles, Grid } from "material-ui";
import {
  ItemGrid
} from "./components";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parallel Appium Dashboard</h1>
        </header>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 1</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 2</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 3</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 4</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 5</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 6</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 7</p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <p>Device 8</p>
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default App;
