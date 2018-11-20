import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import FaIconPack from 'react-icons/lib/fa'
import FaCoffee from 'react-icons/lib/fa/coffee'

const MyMapComponent = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBAe60xu3dCFjaU6oJA_Id-tgA9LO3B7XU&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `55vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withStateHandlers(() => ({
      isOpen: false, 
      selectedID: '',
   }), {
   onToggleOpen: ({ isOpen, selectedID }) => (selectedID) => ({
      isOpen: !isOpen,
      selectedID,
     })
   }),
   withScriptjs,
   withGoogleMap
)((props) =>
   <GoogleMap
      defaultZoom={13}
      defaultCenter={{ 
         lat: props.areaLat, 
         lng: props.areaLng 
      }}
   >
   <Marker 
      position={{ lat: props.areaLat, lng: props.areaLng }} 
      onClick={props.onToggleOpen}

      defaultOpacity= {0.5}

      // onClick={props.onMarkerClick} 
   >
   </Marker>

   {props.nearbyPlaces.map((place, i) => {
      console.log(place)
      return (
         <Marker 
         position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
         onClick={() => props.onToggleOpen(place.id)}
         key={place.id}
         >
         {props.isOpen && props.selectedID === place.id &&
         
            <InfoWindow className="infoWindowContainer" onCloseClick={() => props.onToggleOpen(place.id)}>
               <div className="infoWindows">
                  <p className="infoWindow_header">{props.nearbyPlaces[i].name}</p>
                  <p>{props.nearbyPlaces[i].vicinity}</p>
                  <p>{props.nearbyPlaces[i].rating} <FaCoffee /></p>
                  {/* <img src={props.nearbyPlaces[i].icon}/> */}
                  {/* <p>{props.nearbyPlaces[i].opening_hours.open_now}</p> */}
                  
                  {/* <img src={props.nearbyPlaces[i].photos[1]} /> */}
                  <button className="optionButton startingDest" onClick={() => props.handleStartCafeClick(place)}>Confirm Starting Cafe</button>
                  <button className="optionButton endingDest" onClick={() => props.handleEndCafeClick(place)}>Confirm Ending Cafe</button>
               </div>
               
            </InfoWindow>}
            
         </Marker>
      )
   })}
   </GoogleMap>
);

class MapContainer extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         // loadMap: false,
         isMarkerShown: false,
         areaLat: "",
         areaLng: "",
         nearbyPlaces: [],
      };

   this.delayedShowMarker = this.delayedShowMarker.bind(this);
   this.handleMarkerClick = this.handleMarkerClick.bind(this);
   }

   componentDidMount() {
      this.delayedShowMarker();
   }

   cafeClick() {
      console.log('newStyle')
   }

   delayedShowMarker() {
      setTimeout(() => {
         this.setState({ isMarkerShown: true });
      }, 3000);
   }

   handleMarkerClick(e) {
      e.preventDefault(); 
      this.setState({ isMarkerShown: false });
      this.delayedShowMarker();
   
   }



  render() {
      const { loadMap } = this.state;
      const { areaLat, areaLng, nearbyPlaces } = this.props;

      return (
        <div>
            <div>
               <MyMapComponent
                  areaLat={areaLat}
                  areaLng={areaLng}
                  nearbyPlaces={nearbyPlaces}
      
                  isMarkerShown={this.state.isMarkerShown}
                  onMarkerClick={this.handleMarkerClick}
                  handleClick={this.handleClick}
                  handleStartCafeClick={this.props.handleStartCafeClick}
                  handleEndCafeClick={this.props.handleEndCafeClick}
               /> 
            </div> 
        </div>

      );
   }
}

export default MapContainer;

//KEEP THIS ONE FOR REFERENCE
// componentWillReceiveProps(nextProps) {
//    console.log(nextProps, this.props);

//    if (
//       nextProps.areaLat !== this.props.areaLat && 
//       nextProps.areaLng !== this.props.areaLng && 
//       nextProps.nearbyPlaces !== this.props.nearbyPlaces
//    ) {
//       this.setState({ loadMap: true });
//    }
// }