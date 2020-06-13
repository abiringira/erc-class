export default function() {
  return [
    {
      title: "Notification Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Notifications",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/notifications",
    },
    {
      title: "Send Notification",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/send-new-notification",
    },
   
    // {
    //   title: "Resend Notification",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/resend-notification",
    // },
    
    {
      title: "Application",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/Application",
    },

    {
      title: "Logout",
      htmlBefore: '<i class="material-icons">rowing</i>',
      to: "/login",
    },
    
  ];
}
