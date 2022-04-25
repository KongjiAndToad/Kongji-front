import React from "react";
import DrawMain from "./Screens/DrawMain";
import CreateBook from "./Screens/CreateBook";
import BookReader from "./Screens/BookReader";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DrawMain} />
        <Route exact path="/createbook" component={CreateBook} />
        <Route path="/createbook/:id" component={CreateBook} />
        <Route exact path="/bookreader" component={BookReader} />
        <Route exact path="/bookreader/:id" component={BookReader} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
