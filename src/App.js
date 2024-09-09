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

async refreshNotes(){
  fetch(this.API_URL + "api/todoapp/GetNotes").then(response=>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
}

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

render() {
  const{notes} = this.state;
  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      <input id="newNotes"/>&nbsp;
      <button onClick={()=>this.addClick()}>+</button>
      {notes.map(note=>
      <p>
        <b>* {note.description}</b>&nbsp;
        <button onClick={()=>this.deleteClick(note.id)}>✓</button>
      </p>
      )}
    </div>
  );
}
}


export default App;
