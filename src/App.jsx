import React from "react";
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import CompliancesListPage from "./pages/CompliancesListPage";
import ComplianceDetailPage from "./pages/ComplianceDetailPage";

function App() {
  return (
      <>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/compliances" component={CompliancesListPage} />
                  <Route exact path="/compliances/:id" component={ComplianceDetailPage} />
              </Switch>
          </BrowserRouter>
      </>
  );
}

export default App;
