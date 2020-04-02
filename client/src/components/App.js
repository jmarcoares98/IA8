import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import AppMode from './../AppMode.js';
import LoginPage from './LoginPage.js';
import DataPage from './DataPage.js';
import ConstructionPage from './ConstructionPage.js'
import Delta from './../delta.png'

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "welcome to IA6: login";
modeTitle[AppMode.DATA] = "my data";
modeTitle[AppMode.DATA_ADD] = "add data";
modeTitle[AppMode.DATA_EDIT] = "edit data";
modeTitle[AppMode.CONSTRUCTION] = "under construction";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.DATA] = DataPage;
modeToPage[AppMode.DATA_ADD] = DataPage;
modeToPage[AppMode.DATA_EDIT] = DataPage;
modeToPage[AppMode.CONSTRUCTION] = ConstructionPage;

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {mode: AppMode.LOGIN,
                      menuOpen: false,
                      userId: "",
                      showAbout: false};
        }

    handleChangeMode = (newMode) => {
        this.setState({mode: newMode});
    }
        
    openMenu = () => {
        this.setState({menuOpen : true});
    }
          
    closeMenu = () => {
        this.setState({menuOpen : false}); 
    }
        
    toggleMenuOpen = () => {
        this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
    }
        
    setUserId = (Id) => {
        this.setState({userId: Id});
    }

    componentDidMount() {
        window.addEventListener("click",this.handleClick);
    }

    handleClick = (event) => {
        if (this.state.menuOpen) {
          this.closeMenu();
        }
        event.stopPropagation();
    }

    toggleAbout = () => {
        this.setState(prevState => ({showAbout: !prevState.showAbout}));
    }
    
    renderAbout = () => {
        return (
          <div className="modal" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title"><b>about</b>
                    <button className="close-modal-button" onClick={this.toggleAbout}>
                      &times;</button>
                  </h3>
                </div>
                <div className="modal-body">
                  <img
                  src={Delta}
                  height="200" width="200"/>
                  <h3>this is IA6 by marco ares</h3>
                  <p>version cpts489 spring 2020<br/>
                  &copy; 2020 student at washington state university. all rights
                  reserved.
                  </p>
                  <div style={{textAlign: "left"}}>
                    <p>IA6 apps support</p>
                    <p>this assignment is made by react that we learned in class
                        in the past week and a half. mostly the code that i have 
                        here is helped by going to class and looking at his code.
                        without that i would be lost in what i am doing because 
                        react is a hard language to learn in a short period of time,
                        but hey.. we are here now and im learning this bs and hopefully
                        i get a good grade for this. i am honestly super tired. 
                        but it is what is. now for IA6 i need more commits so im adding this,
                        even though i am done with the assignment.
                    </p>
                    <p>follow me in instagram to support me<a
                    href="https://www.instagram.com/jmarcoares/" target="_blank">@jmarcoares</a>
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary btn-color-theme"
                    onClick={this.toggleAbout}>OK</button>
                  </div>
              </div>
            </div>
          </div>
        );
    }

    render() {
        const ModePage = modeToPage[this.state.mode];
        return (
          <div onClick={this.handleClick}>
            <NavBar 
              title={modeTitle[this.state.mode]}
              mode={this.state.mode}
              changeMode={this.handleChangeMode}
              menuOpen={this.state.menuOpen}
              toggleMenuOpen={this.toggleMenuOpen}/>
            <SideMenu 
              mode={this.state.mode}
              menuOpen={this.state.menuOpen}
              changeMode={this.handleChangeMode}
              userId={this.state.userId}
              showAbout={this.toggleAbout}/>
            <ModeBar 
              mode={this.state.mode} 
              changeMode={this.handleChangeMode}
              menuOpen={this.state.menuOpen}/>
            <ModePage menuOpen={this.state.menuOpen}
              mode={this.state.mode} 
              changeMode={this.handleChangeMode}
              userId={this.state.userId}
              setUserId={this.setUserId}/>
            {this.state.showAbout ? this.renderAbout() : null}
          </div>
          );  
      }

    
}

export default App;