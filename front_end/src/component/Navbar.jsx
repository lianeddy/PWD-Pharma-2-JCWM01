import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarBrand,
  NavbarText,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class MyNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar color = "dark">
            <NavbarBrand className="mx-4">
                <Link />
                PHARMA2
                </NavbarBrand>
            
            <Nav>
                <NavItem>
                    <NavLink>Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Cart</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
