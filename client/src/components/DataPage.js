import React from 'react';
import DataAdd from './DataAdd.js';
import FloatingButton from './FloatingButton.js';
import AppMode from './../AppMode.js';
import DataDisplay from './DataDisplay.js';

class DataPage extends React.Component {

    //Initialize objects based on local storage
    constructor(props) {
          super(props);
          let data = JSON.parse(localStorage.getItem("userData")); 
          this.state = {name: data[this.props.userId].name,
                        nameCount: data[this.props.userId].nameCount,
                        deleteId: "",
                        editId: ""};          
    }

    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.setState({deleteId: val});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.setState({editId: val});
    }
 
    //This is where the local storage for editing data is
    editData = (newData) => {
        let data = JSON.parse(localStorage.getItem("userData")); 
        let newName = this.state.name;
        newName[this.state.editId] = newData;
        data[this.props.userId].name = newName;
        localStorage.setItem("userData",JSON.stringify(data));
        this.setState({name: newName, editId: ""});
        this.props.changeMode(AppMode.DATA);
    }

    deleteData = () => {
        let data = JSON.parse(localStorage.getItem("userData"));
        let newName = this.state.name;
        delete newName[this.state.deleteId];
        data[this.props.userId].name = newName;
        localStorage.setItem("userData",JSON.stringify(data));
        this.setState({name: newName, deleteId: ""});
    }

    addData = (newData) => {
        let data = JSON.parse(localStorage.getItem("userData"));
        let newName = this.state.name;
        newData.nameNum = this.state.nameCount + 1;
        newName[this.state.nameCount + 1] = newData;
        data[this.props.userId].name = newName;
        data[this.props.userId].nameCount = this.state.nameCount + 1;
        localStorage.setItem("userData",JSON.stringify(data));
        this.setState({name: newName, nameCount: newData.nameNum});
        this.props.changeMode(AppMode.DATA);
    }

    
    //render
    render() {
        switch(this.props.mode) {
            case AppMode.DATA:
                return (
                  <React.Fragment>
                  <DataDisplay 
                    name={this.state.name}
                    setEditId={this.setEditId}
                    setDeleteId={this.setDeleteId}
                    deleteData={this.deleteData}
                    changeMode={this.props.changeMode}
                    menuOpen={this.props.menuOpen} /> 
                  <FloatingButton
                      handleClick={() => 
                        this.props.changeMode(AppMode.DATA_ADD)}
                      menuOpen={this.props.menuOpen}
                      icon={"fa fa-plus"} />
                  </React.Fragment>
                );
            case AppMode.DATA_ADD:
                return (
                    <DataAdd
                       mode={this.props.mode}
                       startData={""} 
                       saveData={this.addData} />
                );
            case AppMode.DATA_EDIT:
                return (
                    <DataAdd
                      mode={this.props.mode}
                      startData={this.state.name[this.state.editId]} 
                      saveData={this.editData} />
                );
        }
    }
}    

    export default DataPage;