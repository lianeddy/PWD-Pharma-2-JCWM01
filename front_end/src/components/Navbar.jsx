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

import iconMap from "../img/edubin/all-icon/map.png";
import iconEmail from "../img/edubin/all-icon/email.png";
import iconSupport from "../img/edubin/all-icon/support.png";
import logo from "../img/edubin/logo.png";

import "../css/edubin/slick.css";
import "../css/edubin/animate.css";
import "../css/edubin/nice-select.css";
import "../css/edubin/jquery.nice-number.min.css";
import "../css/edubin/magnific-popup.css";
import "../css/edubin/bootstrap.min.css";
import "../css/edubin/font-awesome.min.css";
import "../css/edubin/default.css";
import "../css/edubin/style.css";
import "../css/edubin/responsive.css";

class MyNavbar extends React.Component {
  render() {
    return (
      <>
        <header id="header-part">
          <div class="row" style={{ backgroundColor: "#07294D" }}>
            <div class="col-lg-6">
              <div class="header-contact text-lg-left text-center">
                <ul>
                  <li>
                    <img src={iconMap} alt="icon" />
                    <span>127/5 Kalideres, Jakarta Barat</span>{" "}
                  </li>
                  <li>
                    <img src={iconEmail} alt="icon" />
                    <span>bewell@pharmacy.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="header-contact text-lg-right text-center">
                <p>Opening Hours : Monday to Saturay - 8 Am to 5 Pm</p>
              </div>
            </div>
          </div>

          <div class="header-logo-support pt-30 pb-30">
            <div class="container">
              <div class="row">
                <div class="col-lg-4 col-md-4">
                  <div class="logo">
                    <a href="index-2.html">
                      <img src={logo} alt="Logo" width={130} />{" "}
                    </a>
                  </div>
                </div>
                <div class="col-lg-8 col-md-8">
                  <div class="support-button float-right d-none d-md-block">
                    <div class="support float-left">
                      <div class="icon">
                        <img src={iconSupport} alt="icon" />
                      </div>
                      <div class="cont">
                        <p>Be Well Pharma Support</p>
                        <span>021 22865968</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </header>

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
                          <DropdownItem>
                            <Link to="/stock">Product List and Stock</Link>
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
      </>
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
