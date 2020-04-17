import React from 'react';

import './App.css';
class App extends React.Component{

  constructor(props){
    super(props);
      this.state={
        newItem:"",
        list:[]
      }
    }
  addItem(todoValue){
    if(todoValue!==""){
      const newItem={
        id:Date.now(),
        value:todoValue,
        isDone:false
      };
      const list=[...this.state.list];
      list.push(newItem);
      this.setState({
        list,newItem:""
      });
    }
  }
  deleteItem(id){
    const list=[...this.state.list];
    const updatedlist=list.filter(item=>item.id!==id);
    this.setState({list:updatedlist})
  }
  updateInput(input){
    this.setState({newItem:input});
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){
    return (
      <div>
        <h1 className="app-title">My Todo List</h1>
        <div className="comtainer">
          Add an item...
          <br/>
          <input 
            type="text" 
            className="input-text"
            placeholder="Write your todo"
            value={this.state.newItem}
            onchange={e=>this.updateInput(e.target.value)}
            /><br/>
          <input type="text" name="my" value={this.state.my} onChange={this.onChange} />

          <button 
            className="add-btn"
            onClick={()=>this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
            > Add Todo</button>
          <div className="list">
            <ul>
              <li>
                <input type="checkbox" name=""/>
                Cooking
                <button className="btn">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default App;