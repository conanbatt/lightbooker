import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import Navbar from './navbar';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export default class Layout extends React.Component {

  render(){

    let { user, children } = this.props;

    return(<div className="layout">
      <Head>
        <style>{`
          html, body {
              height: 100%;
          }
        `}
      </style>
        <title>LightBooker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"/>
        <link rel="stylesheet" href="/static/rc-slider.css"/>
        
        <script src="https://code.jquery.com/jquery-3.2.1.slim.js"></script>
      </Head>
      <style jsx>{`
        .header {
            border-top: 1px solid transparent;
        }
      `}
      </style>
      <Navbar/>
      { children }
    </div>)
  }

}