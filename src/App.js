import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
class App extends Component{
  
constructor(props){
  super(props);
  this.state={
    notes:[]
  }
}

API_URL = "http://localhost:5178/";

componentDidMount(){
  this.refreshNotes();
}

// function to refresh the page after adding or deleting a task
async refreshNotes(){
  fetch(this.API_URL + "api/todoapp/GetNotes").then(response=>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
}

// function to add tasks
// it creates a task that the user defines and assigns it an id
async addClick(){
  var newNotes = document.getElementById("newNotes").value;
  const data = new FormData();
  data.append("newNotes", newNotes);

  fetch(this.API_URL + "api/todoapp/AddNotes", {
    method: "POST",
    body: data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

// function to delete task
// it calls the id of the task to delete it and refresh the page
async deleteClick(id){
  fetch(this.API_URL + "api/todoapp/DeleteNotes?id=" + id, {
    method: "DELETE",
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

// custom components
// import CustomForm from './components/CustomForm'

// rendering of website, HTML to create header and buttons
render() {
  const{notes} = this.state;
  return (
    <form>
    <div className="container">
    <header>
        <h1>My Task List</h1>
      </header>
    </div>
    <div className="wrapper">
      <input 
        type="text"
        className="input"
        id="newNotes"
        required
        autoFocus
        maxLength={60}
        placeholder="Enter Task"/>&nbsp;
      <button 
      className="btn"
      onClick={()=>this.addClick()}>+</button>
      {notes.map(note=>
      <p>
        <b className="list">• {note.description}</b>&nbsp;
        <button 
        className="btn"
        onClick={()=>this.deleteClick(note.id)}>✓</button>
      </p>
      )}
    </div>
    </form>
  );
}
}

export default App;