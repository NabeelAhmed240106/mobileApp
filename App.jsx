

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import App_Navigation from "./config/App_Navigation/App_Navigation";

function App() {
  return (
    <NavigationContainer>
      <App_Navigation />
    </NavigationContainer>
  );
}

export default App;