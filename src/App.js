import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Notifications from "./views/Notifications";
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class App extends Component {
 
 
  

 

  render() {

    return(

      <React.Fragment>
      
      {/* <Notifications Notifications={this.state.Notifications} /> */}
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
  

     
      {routes.map((route, index) => {
       
        return (   
       
         



          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              if(route.path === "/login")  {
              return (
              
                  <route.component {...props} />
                 
              
              )} else {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );

              }
            })
            
            
          
          
          }
          />
        );
      })}

      
    </div>
  </Router>
  </React.Fragment>
  )
}
    }

    export default App;