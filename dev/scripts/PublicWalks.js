import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "./RouteCard";


class PublicWalks extends React.Component {
  constructor() {
    super();
    this.state = {
      publicWalks: []
    }
    this.removeWalk = this.removeWalk.bind(this);
  }

  componentDidMount() {
    const dbref = firebase.database().ref("public/");
    dbref.on("value", snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const state = [];
      for (let key in data) {
        data[key].key = key;
        state.push(data[key]);
      }
      this.setState({
        publicWalks: state
      });
    });
  }

  removeWalk(route) {
    console.log("button Clicked")
    // console.log(route.key)
    let removeId = route.key;
    firebase
      .database()
      .ref(`public/${removeId}`)
      .remove();
  }

  render() {
    console.log(this.state.publicWalks);
    return (
      <div className="walkContainer">
         <div className="searchForm">
            <p className="logInIntro">
               These are the public walks currently scheduled right now. Feel free to view the walk and even join the meetup!
            </p>
         </div>

        {this.state.publicWalks.map(route => {
          return <RouteCard data={route} key={route.key} removeWalk={this.removeWalk}/>;
        })}
      </div>
    );
  }
}

export default PublicWalks;
