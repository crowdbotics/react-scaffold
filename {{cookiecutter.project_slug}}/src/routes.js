import React from "react";

const Home = React.lazy(() => import("./features/Home"));

const routes = [
  { path: "/", name: "Home", exact: true },
  { path: "/welcome", name: "Hello World", exact: true, component: Home }
  //@InsertModuleRoutes
];

export default routes;