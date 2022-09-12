import React from "react";
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import TodoPage from "./pages/TodoPage";
import FetchPage from "./pages/FetchPage";

function App() {
  return (
      <>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/todo" component={TodoPage} />
                  <Route exact path="/fetch" component={FetchPage} />
                  <Redirect to={"/todo"} />
              </Switch>
          </BrowserRouter>
      </>
  );
}

export default App;
