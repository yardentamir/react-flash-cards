import React from 'react';
import { Link } from 'react-router-dom';

export default class EditQuestion extends React.Component {


  render() {
    return (
      <div className="ui container max-width-smaller">
        <form className="ui form" >
          <h3>Edit Question</h3>
          <div className="field">
            <label>Question</label>
            <input id="currentEdit" type="text" name="question" defaultValue={this.props.state.currentEdit.question} onChange={this.props.handleChangeAdd} />
          </div>
          <div className="field">
            <label>Answer</label>
            <input id="currentEdit" type="text" name="answer" defaultValue={this.props.state.currentEdit.answer} onChange={this.props.handleChangeAdd} />
          </div>
          <Link to="/edit" className="item"><input className="ui button" value="EDIT" type="submit" onClick={() => this.props.handleClickEdit(this.props.state.currentEdit)} /></Link>
        </form>
      </div>
    )
  }
}