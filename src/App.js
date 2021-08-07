import './styles/styles.css'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import AddFunds from './pages/AddFunds';
import CashOut from './pages/CashOut';
import CheckBalance from './pages/CheckBalance';
import NumberGenerator from './pages/NumberGenerator';
import IssueGiftCard from './pages/IssueGiftCard';
import Confirmation from './pages/Confirmation';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/"><Redirect to="/issue-gift-card"/></Route>
        <Route exact path="/issue-gift-card" component={IssueGiftCard}/>
        <Route exact path="/check-balance" component={CheckBalance} />
        <Route exact path="/add-funds" component={AddFunds}/>
        <Route exact path="/cash-out" component={CashOut} />
        <Route exact path="/number-generator" component={NumberGenerator} />
        <Route exact path="/confirmation" component={Confirmation} />
      </Switch>
    </Router>
  );
}

export default App;
