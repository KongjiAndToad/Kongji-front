import React from "react";
import DrawMain from "./Screens/DrawMain";
import CreateBook from "./Screens/CreateBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={DrawMain} />
        <Route exact path="/createbook" component={CreateBook} />
        <Route path="/createbook/:id" component={CreateBook} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
