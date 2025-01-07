import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import Agents from "./pages/Agents";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/agents" component={Agents} />
    </Switch>
  );
}

export default App;