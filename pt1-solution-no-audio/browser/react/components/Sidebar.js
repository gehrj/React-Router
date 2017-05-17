import React from 'react';
import {Link} from 'react-router';

const Sidebar = (props) => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to='/albums' className='nav nav-tabs' activeClassName='active'>ALBUMS</Link>
          <br/>
          <Link to='/artists' className='nav nav-tabs' activeClassName='active'>ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
