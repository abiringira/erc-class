import React, { Component } from 'react'

    class List extends Component {
      
      componentDidMount() {
        fetch('mongodb://127.0.0.1:27017/BK_SMS_DATABASE/notifications')
        .then(res => res.json())
        .then((data) => {
          this.setState({ notifications: data })
        })
        .catch(console.log)
      }
    
    }

   

    export default  List;