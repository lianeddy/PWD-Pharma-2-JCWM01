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
import { logoutUser } from "../redux/actions/user";

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
              this.props.userGlobal.username && this.props.userGlobal.navbarLogin ?
              <>
                <NavItem>
                  <NavbarText className="nav">Hello, {this.props.userGlobal.username}</NavbarText>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Pages
                  </DropdownToggle>
                  <DropdownMenu right>
                    {
                      this.props.userGlobal.role === "admin" ?
                      <> 
                        <DropdownItem>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/confirm-reject">Confirm-Reject Transaction</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/sales">Sales Report</Link>
                        </DropdownItem>
                      </>
                      : 
                      <>
                        <DropdownItem>
                          <Link to="/profile">Profile</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/cart">Cart</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/transaction">Transaction</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/change-pass">Change Password</Link>
                        </DropdownItem>
                      </>
                    }
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logoutUser}>
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

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
