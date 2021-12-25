import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Game from "./Pages/Game";
import AddQuestion from "./Pages/AddQuestion";
import Api from "./Utilities/api";
import { InitialState } from "./Utilities/initialState";
import ShowCards from "./Pages/ShowCards";
import EditQuestion from "./Pages/Edit";

export default class App extends React.Component {
  state = InitialState;

  componentDidMount = () => {
    this.start();
  };

  start = async () => {
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
  };

  handelReshuffleClick = async () => {
    this.setState(InitialState);
    this.start();
  };

  handleClickEditCard = (item) => {
    this.setState({ currentEdit: item });
  };

  handleChangeAdd = async (event) => {
    const { name, value, id } = event.target;
    this.setState((prevState) => ({
      [id]: { ...prevState[id], [name]: value },
    }));
  };

  handleSubmitAdd = async () => {
    await Api.addItem(this.state.addQuestion);
    this.handelReshuffleClick();
    this.setState({ addQuestion: {} });
  };

  handleClickDelete = async (Item) => {
    await Api.deleteItem(Item.id);
    await this.updateData();
  };

  handleClickEdit = async (item) => {
    await Api.editItem(item.id, this.state.currentEdit);
    await this.updateData();
  };

  updateData = async () => {
    const data = await Api.getItems();
    this.setState({ data });
  };

  render = () => {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Game
                  state={this.state}
                  handelNewCardClick={this.handelNewCardClick}
                  handelRevealAnswerClick={this.handelRevealAnswerClick}
                  handelRightClick={this.handelRightClick}
                  handelReshuffleClick={this.handelReshuffleClick}
                />
              }
            />
            <Route
              path="/edit"
              exact
              element={
                <ShowCards
                  state={this.state}
                  handleClickDelete={this.handleClickDelete}
                  handleClickEdit={this.handleClickEditCard}
                />
              }
            />
            <Route
              path="/add"
              exact
              element={
                <AddQuestion
                  handleChangeAdd={this.handleChangeAdd}
                  handleSubmitAdd={this.handleSubmitAdd}
                />
              }
            />
            <Route
              path="/edit/:id"
              exact
              element={
                <EditQuestion
                  handleChangeAdd={this.handleChangeAdd}
                  handleClickEdit={this.handleClickEdit}
                  state={this.state}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  };
}
