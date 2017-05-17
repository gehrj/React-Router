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

  render () {
    const { artist, artistAlbums, songs } = this.props
    console.log("artist", artist)
    return (
      <div>
        <h3>{ artist.name }</h3>
        <Link to={`/${this.props.routeParams.artistId}/albums`}><h4>ALBUMS</h4></Link>
        <Link to={`/${this.props.routeParams.artistId}/songs`}><h4>SONGS</h4></Link>
        <Albums albums={ artistAlbums } />
        <Songs songs={ songs } />
      </div>
    )
  }
}

export default Artist
