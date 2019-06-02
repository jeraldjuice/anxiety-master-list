import React from 'react';

const Header = () => {
    return (
        <header className="container">
        <div id="title">
          Anxiety Master List
        </div>
        <nav>
          <ul>
            <li>
              Dashboard
            </li>
            <li>
              Today
            </li>
            <li>
              Tasks
            </li>
            <li>
              Categories
            </li>
            <li>
              Settings
            </li>
          </ul>
        </nav>
      </header>
    );
};

export default Header;