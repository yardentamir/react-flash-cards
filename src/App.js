import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Game from "./Pages/Game";
import AddQuestion from "./Pages/AddQuestion";
import Api from "./Utilities/api";
import { InitialState } from "./Utilities/initialState";

export default class App extends React.Component {
  state = InitialState;

  componentDidMount = async () => {
    console.log(InitialState);
    const data = await Api.getItems();
    this.setState({
      data,
      dataToFilter: data,
      randomQuestionIndex: Math.floor(Math.random() * data.length),
      countRights: data.filter((item) => item.wasRight).length,
    });
    console.log(this.state);
  };

  handelNewCardClick = () => {
    console.log(this.state.dataToFilter);
    this.setState({
      randomQuestionIndex: Math.floor(
        Math.random() * this.state.dataToFilter.length
      ),
      showQuestionOrAnswer: "question",
    });
  };

  handelRevealAnswerClick = () => {
    this.setState({
      showQuestionOrAnswer: "answer",
    });
  };

  handelRightClick = (item) => {
    const dataToFilter = this.state.dataToFilter.filter(
      (itemData) => itemData.id !== item.id
    );
    this.setState((prevState) => ({
      countRights: prevState.countRights + 1,
      dataToFilter,
      randomQuestionIndex: Math.floor(Math.random() * dataToFilter.length),
      showQuestionOrAnswer: "question",
    }));
    console.log(this.state.dataToFilter);
  };

  handelWrongClick = () => {};

  render = () => {
    return (
      <div className="container ui">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Game
                  randomQuestionIndex={this.state.randomQuestionIndex}
                  state={this.state}
                  handelNewCardClick={this.handelNewCardClick}
                  handelRevealAnswerClick={this.handelRevealAnswerClick}
                  showQuestionOrAnswer={this.state.showQuestionOrAnswer}
                  handelRightClick={this.handelRightClick}
                  // handelWrongClick={this.handelWrongClick}
                />
              }
            />
            <Route path="/edit" exact element={<AddQuestion />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
}
