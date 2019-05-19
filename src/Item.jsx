import React, { Component } from "react";
import * as moment from "moment";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      id: this.props.id,
      url: this.props.url,
      selector: this.props.selector,
      remove: this.props.remove,
      prices: this.props.prices
    };
  }

  onDelete() {
    // TODO : right now it's not deleting based on id
    fetch("http://localhost:3001/api/delete", {
      method: "POST",
      body: JSON.stringify({ id: this.props.id }),
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.text());
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
    let pricesHtml = [];
    if (this.props.prices !== undefined) {
      this.props.prices.forEach(price => {
        pricesHtml.push(
          <tr key={price.price_id}>
            <td>{moment(price.datetime).format("DD MMM YYYY hh:mm a")}</td>
            <td>{price.price}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>url</td>
              <td>{this.props.url}</td>
            </tr>
            <tr>
              <td>selector</td>
              <td>{this.props.selector}</td>
            </tr>
            <tr>
              <td>remove</td>
              <td>{this.props.remove}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{pricesHtml}</tbody>
          </table>
        </div>
        <button onClick={this.onDelete}>Delete Item</button>
      </div>
    );
  }
}

export default Item;
