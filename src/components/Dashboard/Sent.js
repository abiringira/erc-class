import React, {  useEffect,useState} from 'react'
import PropTypes from "prop-types";
import { Col } from "shards-react";
import SmallStats from "../common/SmallStats";




const Dashboard = ({ smallStats }) => { 
  const [notifications, setNotifications] = useState(null)
  const [status,setStatus] = useState(null)
  useEffect(() => {
    
    
   
    fetch('http://localhost:7778/v1/notification?status=SENT' ,{ 
          method: 'GET',
         })
        .then(res => res.json())
        .then((data) => {
          setNotifications(  data   );
          
          
        })
        setStatus('SENT');

  },[notifications, status])

       if(!notifications) {
         console.log('blala')
       } else{
         console.log(notifications.length);
       }

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
      label: "SENT NOTIFICATION",
      value: !Dashboard.notifications ? 0 : Dashboard.notifications.length ,
      percentage: "12.4",
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
