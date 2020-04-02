  import React from 'react';
import AppMode from './../AppMode.js';

class SideMenu extends React.Component {

  //renderModeItems -- Renders correct subset of mode menu items based on
  //current mode, which is stored in this.prop.mode. Uses switch statement to
  //determine mode.
  renderModeMenuItems = () => {
    switch (this.props.mode) {
      case AppMode.DATA:
        return(
          <div>
          <a className="sidemenu-item" onClick={() => this.props.changeMode(AppMode.DATA_ADD)}>
              <span className="fa fa-plus"></span>&nbsp;add data</a>
          </div>
        );
      break;
      case AppMode.CONSTRUCTION:
        return(
          <div>
            <a className="sidemenu-item">
              <span className="fa fa-wrench"></span>&nbsp;still fixing</a>
            <a className="menuItem">
              <span className="fa fa-wrench"></span>&nbsp;still fixing</a>
          </div>
        );
      default:
          return null;
      }
  }

    
    render() {
       return (
        <div className= {"sidemenu " + 
        (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")} >
          {/* SIDE MENU TITLE */}
          <div className="sidemenu-title">
            <span className="sidemenu-userID">&nbsp;{this.props.userId}</span>
          </div>
          {/* MENU CONTENT */}
          {/*Mode-based menu items */}
          {this.renderModeMenuItems()}
          {/* Always-there menu items */}
          <a className="sidemenu-item" onClick={this.props.showAbout}><span className="fa fa-info-circle">
              </span>&nbsp;about</a>
          <a className="sidemenu-item" onClick={() => this.props.changeMode(AppMode.LOGIN)}><span className="fa fa-sign-out">
              </span>&nbsp;log out</a>
        </div>
        );
    }
  }

export default SideMenu;