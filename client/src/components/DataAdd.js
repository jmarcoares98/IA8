import React from 'react';
import AppMode from './../AppMode.js';

//Add Data -- this component presents a controlled form through which the user
//can enter a new data or edit an existing data.
class DataAdd extends React.Component {
    constructor(props) {
      super(props);
      //Create date object for today, taking time zone into consideration
      let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
      //store date as ISO string
      if (this.props.mode === AppMode.DATA_ADD) {
        this.state = {name: "",
                      birthday:  today.toISOString().substr(0,10), 
                      faIcon: "fa fa-save",
                      btnLabel: "save data"}
      } else {
        //if editing an existing data, the starting state is the current data
        //Already added from IA5 but this is for IA6
        this.state = this.props.startData;
        this.state.faIcon = "fa fa-edit";
        this.state.btnLabel = "update data";
      }
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
      }
  
    //handleSubmit
    handleSubmit = (event) => {
      //start spinner
      this.setState({faIcon: "fa fa-spin fa-spinner",
                     btnLabel: (this.props.mode === AppMode.DATA_ADD ? 
                                  "saving..." : "updating...")});
      //Prepare current data to be saved
      let thisData = this.state;
      delete thisData.faIcon;
      delete thisData.btnLabel;
      //call saveData on 1 second delay to show spinning icon
      setTimeout(this.props.saveData,1000,thisData); 
      event.preventDefault(); 
    }

  
    //render -- renders the form to enter data.
    render() {
      return (
        <div className = "padded-page">
        <form onSubmit={this.handleSubmit}>
          <center>
            <label>
              name:
              <input name="name" className="form-control form-center" type="text"
                value={this.state.name} onChange={this.handleChange}
                placeholder="full name" size="50" maxLength="50" />
            </label>
            <p></p>
            <label>
              birthday:
              <input name="birthday" className="form-control form-center" 
                type="date" value={this.state.birthday} onChange={this.handleChange} />
            </label>
            <p></p>
            <p></p>
            <button type="submit" style={{width: "70%",fontSize: "36px"}} 
                className="btn btn-primary btn-color-theme">
                <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}</button>
          </center>
        </form>
        </div>
      );
    }
}

  export default DataAdd;