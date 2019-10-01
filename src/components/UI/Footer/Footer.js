import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="http://localhost:8080">My Library</a> &copy; 2018.</span>
        <span className="ml-auto">Developed by <a href="http://localhost:8080">Abhilash</a></span>
      </footer>
    )
  }
}
export default Footer;