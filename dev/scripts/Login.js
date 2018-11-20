import React from "react";

import FaIconPack from 'react-icons/lib/fa'
import FaGoogle from 'react-icons/lib/fa/google'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKx7F81JukRaS7nTCRAQOvg-FNndk8NfM",
  authDomain: "coffee-walks.firebaseapp.com",
  databaseURL: "https://coffee-walks.firebaseio.com",
  projectId: "coffee-walks",
  storageBucket: "coffee-walks.appspot.com",
  messagingSenderId: "201759711918"
};
firebase.initializeApp(config);

class Login extends React.Component {
   constructor() {
      super();
      this.state = {
         loggedIn: false,
         user: {},
         userText: ""
      };
      this.signOut = this.signOut.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addText = this.addText.bind(this);
   }

   signIn() {

      // console.log("sign In");
      //new instance of a google auth provider
      const provider = new firebase.auth.GoogleAuthProvider();

      //prompts user to select their acconut
      provider.setCustomParameters({

      prompt: "select_account"
      });

      //in this pop up, we are passing the provider
      //the pop up will accept a promise
      //go into authentication on firebase, and enable the provider you plan on using
      firebase

      .auth()
      .signInWithPopup(provider)
      .then(user => {
         // console.log(user);
      });
   }
   signOut() {
      // console.log("sign out");
      firebase.auth().signOut();

      //you can set the state to false explicitly, but componentDidMount watches for the changes in user thus, updating it
   }

   handleChange(e) {
      // console.log(e.target.value);
      this.setState({
         [e.target.id]: e.target.value
      });
   }


  addText(e) {
      e.preventDefault();
      // console.log("form submitted");

      //must reference our current database
      //create a reference in firebase using the UID in the user  object
      const dbRef = firebase.database().ref(`users/${this.state.user.uid}`);

      //this is to push your information into the database
      dbRef.push(this.state.userText);

      this.setState({
      userText: ""
      });
   }

   componentDidMount(props) {
      //this will check for a user object which we will call res
      firebase.auth().onAuthStateChanged(res => {
         // console.log(res);
         this.props.loggedInCheck(res)
      });
   }

   componentWillReceiveProps(props) {
      this.setState({
         loggedIn: props.loggedIn,
         user: props.user
      })
   }

   render() {
      return (
         <React.Fragment>
            {this.state.loggedIn ? (
               <React.Fragment>
                  {/* <h2>Welcome, {this.state.user.displayName}</h2> */}
                  <button className="smlButton logOutButton titleButton" onClick={this.signOut}>Sign Out</button>
               </React.Fragment>
            ) : (
               <React.Fragment>
                  <p className="logInIntro" >Sign-in with Google and map out your next coffee walk!</p>
                  <button className="lrgButton" onClick={this.signIn}><FaGoogle className="googleIcon" />Sign in with Google</button>
               </React.Fragment>
            )}
         </React.Fragment>
      );
   }
}

export default Login;