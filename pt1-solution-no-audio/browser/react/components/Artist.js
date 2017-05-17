import React from 'react'
import { Link } from 'react-router'
import Albums from './Albums'
import Songs from './Songs'

class Artist extends React.Component {
  componentDidMount() {
    let aId = this.props.routeParams.artistId;
    this.props.selectArtist(aId);
    this.props.selectArtistAlbums(aId);
    this.props.selectArtistSongs(aId)
  }

  render() {
    const { artist, artistAlbums, songs } = this.props
    const children = this.props.children;
    const propsToPassToChildren = {
      /**todo: make sure to include all the props that the child components need! **/
      albums: artistAlbums,
      songs: songs
    }
    return (
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${this.props.routeParams.artistId}/albums`}><h4>ALBUMS</h4></Link></li>
          <li><Link to={`/artists/${this.props.routeParams.artistId}/songs`}><h4>SONGS</h4></Link></li>
        </ul>
        {children && React.cloneElement(children, propsToPassToChildren)}
      </div>
    )
  }
}

export default Artist
