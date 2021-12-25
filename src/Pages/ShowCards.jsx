import React from 'react';
import Card from "../Components/Card"
import { v4 as uuidv4 } from "uuid"; // makes random IDs


export default class App extends React.Component {

  render() {
    return (
      <div className="ui special cards">
        {this.props.state.data.map((item) => {
          return <Card key={uuidv4()} item={item} deleteCallBack={(item) => this.props.handleClickDelete(item)} editCallBack={(id) => this.props.handleClickEdit(id)} />
        })}
      </div>

    )
  }
}


