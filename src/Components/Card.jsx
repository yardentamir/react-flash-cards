import React from 'react';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <span className="header" href="#">Question</span>
          <div className="meta">
            <span>{this.props.item.question}</span>
          </div>
          <span className="header" href="#">Answer</span>
          <div className="meta">
            <span>{this.props.item.answer}</span>
          </div>
          <div className="edit-delete-buttons">
            <Link to={`/edit/${this.props.item.id}`} type="submit" className="item"><button type="submit" className="ui button" onClick={() => this.props.editCallBack(this.props.item)} >Edit</button></Link>
            <button className="ui button" type="submit" onClick={() => this.props.deleteCallBack(this.props.item)}> Delete </button>
          </div>
        </div>
      </div>
    )
  }
}