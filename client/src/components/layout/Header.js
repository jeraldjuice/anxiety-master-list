import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  {
    url: '/',
    label: 'Planner',
  },
  {
    url: '/items/',
    label: 'Items',
  },
  {
    url: '/categories/',
    label: 'Categories',
  },
  {
    url: '/notes/',
    label: 'Notes',
  },
  {
    url: '/settings/',
    label: 'Settings',
  },
];

const Header = () => {
    return (
        <header className="container">
        <div id="title">
          Masterlist
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