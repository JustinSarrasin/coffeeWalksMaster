import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Qs from 'qs';
import config from "./config.js";

let key1 = "AIzaSyCqAPO1t-7KMYt8f0YU2Pi4z2j-SWPvykg";
let key2 = "AIzaSyAX858sfNr7KcSp6NdszHBoxH8ZDix-nf8";
let key3 = "AIzaSyA3iTZwH8cw1ZHEDOOykYqzrPK-7WBzJgA";
let key4 = "AIzaSyAmlAUFOnmBXKDuYmCTVFbEKejUPCZOQBg";
let key5 = "AIzaSyDPIDnwygCBYYAxcjXu4S8aeogRkWAYXDI";
let key6 = "AIzaSyBjO03NjG4133czcPIqYEC_3vPszHKoVB8";
let key7 = "AIzaSyB1ak9DkHT163E0newMhdQNt1g5ZTP6qko";

class MyWalks extends React.Component {
   constructor() {
      super();
      this.state = {
         lat: "",
         lng: "",
         location: "",
         nearbyPlaces: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.setLocation = this.setLocation.bind(this);
      this.nearbySearch = this.nearbySearch.bind(this);
   }
  
   handleChange(e) {
      e.preventDefault();
      this.setState({
         [e.target.id]: e.target.value
      })
   }
  
   setLocation(e) {
      e.preventDefault();
      console.log("set location")
      axios({
         method:'GET',
         url: 'https://proxy.hackeryou.com',
         dataResponse:'json',
         paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
         },
         params: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            params: {
              key: "AIzaSyBAe60xu3dCFjaU6oJA_Id-tgA9LO3B7XU",
               query: this.state.location
            }, 
            proxyHeaders: {
               'header_params': 'value'
            },
            xmlToJSON: false
         }
      }).then(({data}) => {
         console.log(data);
         this.setState({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },() => this.nearbySearch());
      });
   }
  
   nearbySearch() {
      console.log("nearby search")
      console.log(this.state.lat, this.state.lng)
      axios({
         method:'GET',
         url: 'https://proxy.hackeryou.com',
         dataResponse:'json',
         paramsSerializer: function(params) {
               return Qs.stringify(params, {arrayFormat: 'brackets'})
         },
         params: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            params: {
              key: "AIzaSyBAe60xu3dCFjaU6oJA_Id-tgA9LO3B7XU",
               location: `${this.state.lat},${this.state.lng}`,
               radius: 5000,
               type: "cafe"
            }, 
         }
      }).then(({data}) => {
         console.log(data);
         this.setState({
            nearbyPlaces: data.results
         }, () => this.props.getNearbyPlaces(this.state.nearbyPlaces), this.props.getUserAreaLocation(this.state.lat, this.state.lng))
      });
   }  
    
   render() {
      return (
         <div className="searchFormDiv" >
            <form className='searchForm' action="" onSubmit={this.setLocation}>
               <p className="logInIntro">
                  Enter Your current address below, and we'll populate the closest cafes nearby you to start a walk.
               </p>
               <input className="walkButtonInput" type="text" placeholder="ex. 483 Queen St. West, Toronto" value={this.state.location} onChange={this.handleChange} id="location"/>
               <input className="medButton startSearch" type="submit" value="Start Search"/>
            </form>
         </div>
      )
   }
}

export default MyWalks;