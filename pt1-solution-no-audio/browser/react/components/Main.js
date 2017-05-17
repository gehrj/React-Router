import React, { Component } from 'react';
import axios from 'axios';
import Albums from './Albums';
import Album from './Album';
import Sidebar from './Sidebar';
import Player from './Player';
import { convertAlbum, convertAlbums } from '../utils';

export default class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      albums: [], 
      selectedAlbum: {},
      artists: [],
      selectedArtist: {}
    };
    this.selectAlbum = this.selectAlbum.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums: convertAlbums(albums) })
      });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, {
            //for one album
            album: this.state.selectedAlbum,
            
            //for multiple albums
            selectAlbum: this.selectAlbum,
            albums: this.state.albums
          })

        }
        </div>
        <Player />
      </div>
    );
  }
}
