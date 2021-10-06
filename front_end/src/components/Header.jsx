import React, { Component } from 'react';
import '../css/edubin/slick.css';
import '../css/edubin/animate.css';
import '../css/edubin/nice-select.css';
import '../css/edubin/jquery.nice-number.min.css';
import '../css/edubin/magnific-popup.css';
import '../css/edubin/bootstrap.min.css';
import '../css/edubin/font-awesome.min.css';
import '../css/edubin/default.css';
import '../css/edubin/style.css';
import '../css/edubin/responsive.css';

import imageSlider1 from '../img/edubin/slider/slider1.jpg';
import iconMap from '../img/edubin/all-icon/map.png';
import iconEmail from '../img/edubin/all-icon/email.png';
import iconSupport from '../img/edubin/all-icon/support.png';
import logo from '../img/edubin/logo.png';

export class Header extends Component {

    render() {
      return(
       
        <header id="header-part">
            <div class="row" style={{backgroundColor: '#07294D'}} >
                <div class="col-lg-6">
                    <div class="header-contact text-lg-left text-center">
                        <ul>
                            <li><img src={iconMap} alt="icon" /><span>127/5 Kalideres, Jakarta Barat</span> </li>
                            <li><img src={iconEmail} alt="icon" /><span>bewell-pharmacy@ahzplay.com</span></li>
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
                                <a href="index-2.html"><img src={logo} alt="Logo" width={130}/> </a>
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

            <div class="navigation">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-md-10 col-sm-9 col-8">
                            <nav class="navbar navbar-expand-lg">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>

                                <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item">
                                            <a class="active" href="index-2.html">Home</a>
                                            <ul class="sub-menu">
                                                <li><a class="active" href="index-2.html">Home 01</a></li>
                                                <li><a href="index-3.html">Home 02</a></li>
                                                <li><a href="index-4.html">Home 03</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item">
                                            <a href="about.html">About us</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="courses.html">Courses</a>
                                            <ul class="sub-menu">
                                                <li><a href="courses.html">Courses</a></li>
                                                <li><a href="courses-singel.html">Course Singel</a></li>
                                            </ul>
                                        </li>    
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-3 col-4">
                            <div class="right-icon text-right">
                                <ul>
                                    <li><a href="#"><i class="fa fa-shopping-bag"></i><span>0</span></a></li>
                                </ul>
                            </div> 
                        </div>
                    </div> 
                </div> 
            </div>
            <section id="slider-part" class="slider-active">
                <div class="single-slider bg_cover pt-150" style={{background: `url(${imageSlider1})`, backgroundSize: 'cover'}} data-overlay="4">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-7 col-lg-9">
                                <div class="slider-cont">
                                    <h1 data-animation="bounceInLeft" data-delay="1s">Choose your right medical needs</h1>
                                    <p data-animation="fadeInUp" data-delay="1.3s"></p>
                                    <ul>
                                        <li><a data-animation="fadeInUp" data-delay="1.6s" class="main-btn" href="#">Read More</a></li>
                                        <li><a data-animation="fadeInUp" data-delay="1.9s" class="main-btn main-btn-2" href="#">Get Started</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </section>
        </header>
      );
    }
  
  }

