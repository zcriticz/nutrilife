import * as React from "react";
import registerComponent from "expo/build/launch/registerRootComponent";

import Routes from "./routes/routes";

const Index = () => {
  return <Routes />;
};

export default Index;
registerComponent(Index);
