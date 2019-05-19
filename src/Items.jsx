import React, { Component } from "react";
import NavBar from "./NavBar";
import Item from "./Item";

export class Items extends Component {
  constructor(props) {
    super(props);
    this.onExtract = this.onExtract.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.urlRef = React.createRef();
    this.selectorRef = React.createRef();
    this.removeRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    fetch("/api/items", {
      method: "GET",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
         return res.json();
      }).then(items=>{
        console.log(items);
        this.setState({items : items});
      }) 
      .catch(err => {
        console.error(err);
      });
  }

  onAddItem(){
    let data = {
        url: this.urlRef.current.value,
        selector: this.selectorRef.current.value,
        remove: this.removeRef.current.value
      };

      //add and check are the same, try to extract out
      fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include", // Don't forget to specify this if you need cookies
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res.text());
            // todo : on success, refresh page to get list of items again
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
        });
  }

  onExtract() {
    let data = {
      url: this.urlRef.current.value,
      selector: this.selectorRef.current.value,
      remove: this.removeRef.current.value
    };

    fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.json());
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let items=[];
    for (var key in this.state.items) {
      let _item = this.state.items[key];
      items.push (
        <Item key = {_item.id} url={_item.url} selector={_item.selector} remove = {_item.remove} prices={_item.prices}/> 
      );
    }

    return (
      <div>
        <NavBar />
        <h1>Items</h1>
        {items}
        <div>
          <input id="url" ref={this.urlRef} placeholder="URL" />
          <input id="selector" ref={this.selectorRef} placeholder="selector" />
          <input id="remove" ref={this.removeRef} placeholder="remove characters" />
          <button id="extract" onClick={this.onExtract}>
            test price extraction
          </button>
          <p>*check console</p>
        </div>
        <button onClick={this.onAddItem}>Add Item</button>
      </div>
    );
  }
}

export default Items;
