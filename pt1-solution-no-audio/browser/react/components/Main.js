import React, { Component } from 'react';
import axios from 'axios';
import Albums from './Albums';
import Album from './Album';
import Sidebar from './Sidebar';
import Player from './Player';
import { convertAlbum, convertAlbums, convertSong } from '../utils';

export default class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      albums: [],
      artistAlbums: [],
      selectedAlbum: {},
      artists: [],
      selectedArtist: {},
      songs: []
    };
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.selectArtistAlbums = this.selectArtistAlbums.bind(this);
    this.selectArtistSongs = this.selectArtistSongs.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums: convertAlbums(albums) })
      });

    axios.get('/api/artists')
    .then(res => res.data)
    .then(artists => {
      this.setState({ artists })
    })
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist (artistId) {
    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => this.setState({ selectedArtist: artist }));
  }

  selectArtistAlbums (artistId) {
    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(albums => this.setState({ artistAlbums: convertAlbums(albums) }))
  }

  selectArtistSongs (artistId) {
    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs => songs.map(song => convertSong(song)))
      .then(songs => this.setState({ songs }))
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
            albums: this.state.albums,

            //for one artist
            artist: this.state.selectedArtist,
            artistAlbums: this.state.artistAlbums,
            songs: this.state.songs,
            selectArtistAlbums: this.selectArtistAlbums,
            selectArtistSongs: this.selectArtistSongs,

            //for all artists
            selectArtist: this.selectArtist,
            artists: this.state.artists,
          })

        }
        </div>
        <Player />
      </div>
    );
  }
}
