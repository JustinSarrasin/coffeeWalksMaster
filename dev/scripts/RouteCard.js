import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RouteCard extends React.PureComponent {
   constructor() {
      super()
   }

   render(props){
      return (
         <section className="routeContainer clearfix">
            <p className="titleButton">{this.props.data.startTime}</p>
            <button className="cardX" onClick={() => this.props.removeWalk(this.props.data)}>X</button>
            <div className="route routeStart">
               <div className="routeHeader clearfix">
                  <h4>Start</h4>
                  <h3>{this.props.data.start.name}</h3>
               </div>
               <div className="routeContent">
                  <p><em><span className="innerTitle">Address: </span></em>
                  {this.props.data.start.vicinity}</p>
                  <p><em><span className="innerTitle">Cafe Rating:</span></em>{this.props.data.start.rating}</p>
               </div>
            </div>
            <div className="route routeEnd clearfix">
               <div className="routeHeader clearfix">
                  <h4>End</h4>
                  <h3>{this.props.data.end.name}</h3>
               </div>
               <div className="routeContent">
                  <p><em><span className="innerTitle">Address:</span></em>
                  {this.props.data.end.vicinity}</p>
                  <p><em><span className="innerTitle">Cafe Rating:</span></em>
                  {this.props.data.end.rating}</p>
               </div>
            </div>
            <Link to={{ pathname: `/DirectionsShare/${this.props.data.key}` }}>
               <button className="insideButton"> Let's View Your Walk</button>
            </Link>
         </section>
      )
      
   }
}

export default RouteCard;