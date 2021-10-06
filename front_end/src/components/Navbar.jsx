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
        <Navbar color="light" light>
          <NavbarBrand>
            <Link to="/">Pharma2</Link>
          </NavbarBrand>
          <Nav>
            {
              this.props.userGlobal.username ?
              <>
                <NavItem>
                  <NavbarText className="nav">Hello, {this.props.userGlobal.username}</NavbarText>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Pages
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/cart">Cart</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/history">History</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/change-pass">Change Password</Link>
                    </DropdownItem>
                    {
                      this.props.userGlobal.role === "admin" ?
                      <DropdownItem>
                        <Link to="/admin">Admin</Link>
                      </DropdownItem>
                      : null
                    }
                    <DropdownItem divider />
                    <DropdownItem>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
              :
              <NavItem>
                <NavbarText>
                  <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </NavbarText>
              </NavItem>
            }
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(MyNavbar);
