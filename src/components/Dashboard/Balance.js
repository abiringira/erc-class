import React, {  useEffect,useState} from 'react'
import PropTypes from "prop-types";
import { Col } from "shards-react";
import SmallStats from "../common/SmallStats";




const Dashboard = ({ smallStats }) => { 
  const [notifications, setNotifications] = useState(null)
 
  useEffect(() => {
    
    
   
    fetch('http://localhost:7778/v1/notification/balance' ,{ 
          method: 'GET',
          headers: {  
          'Authorization': 'Bearer f0e739a8-5a7d-4d5b-8775-4dc20db592f3',
          //  IKOFI KEY : '76c274f6-948b-4b7a-b263-60114b227df4'
          // IB KEY : '1168367d-473c-46b3-b975-e3685ce40a34'
          //IGURIZE KEY: 'f0e739a8-5a7d-4d5b-8775-4dc20db592f3'
        }})
        .then(res => res.json())
        .then((data) => {
          setNotifications(  data   );
          
          
        })

  },[notifications])

     let smallStatData = smallStats.map((stats,status) =>{
         return (
            <Col className="col-lg mb-4" key={status} {...stats.attrs}>
          
            <SmallStats
              id={`small-stats-${status}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value= {!notifications ? 0 : notifications.available}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
         )
     })
  

  return (smallStatData)
      };

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Dashboard.defaultProps  = {
   
  smallStats: [
    
    {
      label: "REMAINING BALANCE",
      value: !Dashboard.notifications ? 0 : Dashboard.notifications.length ,
      percentage: "78.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    }
   
   
   
  
  ]
};

export default Dashboard;
