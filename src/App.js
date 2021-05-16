import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Menus from './Components/Menus';
import { Container, Row, Col } from 'reactstrap';
import Home from './Components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//It is main component which responsible for decide route of other component and rendering
function App() {
  return (
    <div className="App">
      <Router>
      <Container>
      <Header/>
      <Row>
        <Col md={4}>
        <Menus/>
        </Col>
        <Col md={7}>        
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Home" component={Home}></Route>                    
        </Col>
      </Row>
      <Footer/>
      </Container>           
      </Router>
    </div>
  );
}

export default App;
