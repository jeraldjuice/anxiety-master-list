import React from 'react';
import { NavLink } from 'react-router-dom';
import { appier } from 'utils';

const navLinks = [
  {
    url: '/',
    label: 'Dashboard'
  },
  {
    url: '/today/',
    label: 'Today'
  },
  {
    url: '/tasks/',
    label: 'Tasks'
  },
  {
    url: '/categories/',
    label: 'Categories'
  },
  {
    url: '/notes/',
    label: 'Notes'
  },
  {
    url: '/settings/',
    label: 'Settings'
  },
];

const Header = ({ match }) => {
    return (
        <header className="container">
        <div id="title">
          Anxiety Master List
        </div>
        <nav>
          <ul>
            {
              navLinks.map( link => {
                return (
                  <li key={ link.url }>
                    <NavLink to={ link.url } exact activeClassName="current">{ link.label }</NavLink>
                  </li>
                );
              } )
            }
          </ul>
        </nav>
      </header>
    );
};

export default Header;