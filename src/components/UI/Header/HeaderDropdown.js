import React, { useState } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';

const HeaderDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Dropdown nav isOpen={dropdownOpen} toggle={setDropdownOpen(dropdownOpen => !dropdownOpen)}>
      <DropdownToggle nav>
        <img src={'img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
        <DropdownItem><i className="fa fa-user"></i> <Link to={this.props.isAdmin ? "/admin/profile" : "/user/profile"}>Profile </Link></DropdownItem>
        <DropdownItem><i className="fa fa-lock"></i> <Link to='/logout'>Logout</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default HeaderDropdown;
