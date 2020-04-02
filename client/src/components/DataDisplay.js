import React from 'react';
import '../styles/modal.css';
import AppMode from './../AppMode.js';

class DataDisplay extends React.Component {


  constructor(props) {
    super(props);
    //confirmDelete state variable determines whether to show or hide the
    //confirm delete dialog box
    this.state = {confirmDelete: false}; 
  }

  //editData
  //For IA6
  editData = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.DATA_EDIT);
  }

  //confirmDelete -- Triggered when the user clicks on the delete button
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    this.setState({confirmDelete: true});
  }

  //doDelete -- Triggered when the user clicks on the "Yes Delete" button
  doDelete = () => {
      this.props.deleteData();
      this.setState({confirmDelete: false});
    }

  //cancelDelete -- Triggered when the user chooses to cancel a delete
  //operation. We just need to update state to toggle confirmDelete to false
  cancelDelete = () => {
    this.props.setDeleteId(""); 
    this.setState({confirmDelete: false});
  }

  //renderConfirmDeleteDialog: presents user with dialog to confirm deletion
  //of round. Credit: https://getbootstrap.com/docs/4.0/components/modal/
  renderConfirmDeleteDialog = () => {
      return (
        <div className="modal" role="dialog">
          <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title">confirm deletion</p>
                  <button className="close-modal-button" onClick={this.cancelDelete}>
                    &times;</button>
              </div>
              <div className="modal-body">
                <h4>you sure that you want to delete this?</h4>
                <div className="modal-footer">
                    <button className="btn btn-primary btn-color-scheme"
                      onClick={this.doDelete}>
                    yes, delete round</button>
                    <button className="btn btn-secondary" 
                      onClick={this.cancelDelete}>
                    no, do not delete round</button>
                </div>
              </div>
          </div>
        </div>
      );
    }


  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  renderTable = () => {
    let table = [];
    for (const r in this.props.name) {
      table.push(
        <tr key={r}>
          <td>{this.props.name[r].name}</td>
          <td>{this.props.name[r].birthday}</td>
          <td><button onClick={this.props.menuOpen ? null : () => this.editData(r)}>
                <span className="fa fa-edit"></span></button></td>
          <td><button onClick={this.props.menuOpen ? null : () => this.confirmDelete(r)}>
                <span className="fa fa-trash"></span></button></td>
        </tr> 
    );
  }
  return table;
}

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>name</th>
          <th>birthday</th>
          <th>view/edit...</th>
          <th>delete</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.name).length === 0 ? 
          <tr>
          <td colSpan="4" style={{fontStyle: "italic"}}>no data logged</td>
          </tr> : this.renderTable()
          }
        </tbody>
      </table>
      {this.state.confirmDelete ? this.renderConfirmDeleteDialog() : null}
    </div>
    );
  }
}

export default DataDisplay;