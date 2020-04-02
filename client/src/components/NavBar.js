import React from 'react';
import AppMode from './../AppMode.js';
import Delta from './../delta.png'

class NavBar extends React.Component {

    handleMenuBtnClick = () => {
      if (this.props.mode === AppMode.DISPLAY_ADDDATA ||
          this.props.mode === AppMode.DISPLAY_EDITDATA) {
        this.props.changeMode(AppMode.DISPLAY);
      } else if (this.props.mode !== AppMode.LOGIN) {
        this.props.toggleMenuOpen();
      }
    }

    getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.DISPLAY_ADDDATA || 
          this.props.mode === AppMode.DISPLAY_EDITDATA)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
    }

    render() {
       return (
        <div className="navbar">  
        <span className="navbar-items">
          <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
            <span id="sidemenu-btn-icon" 
              className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
            </span>
          </button>
          <img src={Delta} alt="Delta Logo" height="38px"
          width="38px" />
          <span id="topBarTitle" className="navbar-title">
            &nbsp;{this.props.title}
          </span>
        </span>
      </div>
    ); 
  }
}

export default NavBar;