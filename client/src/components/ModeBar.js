import React from 'react';
import AppMode from './../AppMode.js';

class ModeBar extends React.Component {

    handleModeBtnClick = (newMode) => {
      if (this.props.mode != newMode) {
          this.props.changeMode(newMode);
      }
    }
  
    render() {
      return(
        <div className={"modebar" + (this.props.mode === AppMode.LOGIN ? 
          " invisible" : " visible")}>
          <a className={"modebar-btn" + 
            (this.props.mode === AppMode.DISPLAY ? " modebar-item-selected" : "")} 
            onClick={this.props.menuOpen ? null : 
              () => this.handleModeBtnClick(AppMode.DATA)}>
            <span className="modebar-icon nonMenuItem fa fa-th-list"></span>
            <span className="modebar-text">display</span>
          </a>
          <a className={"modebar-btn" +
            (this.props.mode === AppMode.CONSTRUCTION ? " modebar-item-selected" : "")} 
            onClick={this.props.menuOpen ? null : 
              () => this.handleModeBtnClick(AppMode.CONSTRUCTION)}>
            <span className="modebar-icon fa fa-wrench"></span>
            <span className="modebar-text">under construction</span>
          </a>
        </div>
      );
    }

}

export default ModeBar;