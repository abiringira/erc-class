import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Participants from "./views/Participants";
import Errors from "./views/Errors";
import ResendNotification from "./views/ResendNotification";
import Courses from "./views/Courses";
import login from "./views/Login";
import CreateNewCourse from "./views/createNewCourse"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: login
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/users",
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/participants",
    layout: DefaultLayout,
    component: Participants
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/resend-notification",
    layout: DefaultLayout,
    component: ResendNotification
  },
  {
    path: "/new-course",
    layout: DefaultLayout,
    component: CreateNewCourse
  },
  {
    path: "/courses",
    layout: DefaultLayout,
    component: Courses
  },
  
];
