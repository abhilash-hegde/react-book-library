import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  NavLink
} from 'reactstrap';

import HeaderDropdown from './HeaderDropdown';
class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        {this.props.isAdmin ? null :
            <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#/user/books">Books</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/user/myBooks">My Books</NavLink>
          </NavItem>
        </Nav>
         }
        
        <HeaderDropdown isAdmin={this.props.isAdmin}/>
        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
      </header>
    );
  }
}

export default Header;
