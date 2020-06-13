import React, {  useEffect,useState} from 'react'
import PropTypes from "prop-types";
import {  Col } from "shards-react";
import SmallStats from "../common/SmallStats";




const Dashboard = ({ smallStats }) => { 
  const [notifications, setNotifications] = useState(null)
  const [status,setStatus] = useState(null)
  useEffect(() => {
    
    setStatus('PENDING');
   
    fetch('http://localhost:7778/v1/notification?status=PENDING',{ 
          method: 'GET',
          })
        .then(res => res.json())
        .then((data) => {
          setNotifications(  data   );
         
         
          
        })

  },[notifications, status])


     
   
  let smallStatData = smallStats.map((stats,status) =>{
    return (
       <Col className="col-lg mb-4" key={status} {...stats.attrs}>
     
       <SmallStats
         id={`small-stats-${status}`}
         variation="1"
         chartData={stats.datasets}
         chartLabels={stats.chartLabels}
         label={stats.label}
         value= {!notifications ? 0 : notifications.length}
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
        label: "PENDING NOTIFICATION",
        value: "29",
        percentage: "2.71%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: [1, 7, 1, 3, 1, 4, 8]
          }
        ]
      }
  
  ]
};

export default Dashboard;
