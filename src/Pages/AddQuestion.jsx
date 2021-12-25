import React from 'react';

export default class AddQuestion extends React.Component {

  render() {
    return (
      <div className="ui container max-width-smaller">
        <form className="ui form" >
          <h3>Add Question</h3>
          <div className="field">
            <label>Question</label>
            <input id="addQuestion" type="text" name="question" placeholder="Will You make it on time?" onChange={this.props.handleChangeAdd} />
          </div>
          <div className="field">
            <label>Answer</label>
            <input id="addQuestion" type="text" name="answer" placeholder="No!!😰" onChange={this.props.handleChangeAdd} />
          </div>
          <input className="ui button" value="Add" type="submit" onClick={this.props.handleSubmitAdd} />
        </form>
      </div>
    )
  }
}