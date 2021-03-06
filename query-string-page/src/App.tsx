import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { OtherPage } from "./OtherPage";
import { TopPage } from "./TopPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TopPage></TopPage>
        </Route>
        <Route exact path="/other">
          <OtherPage></OtherPage>
        </Route>
        {/* 不正なパスに対してはトップページに遷移させる */}
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
