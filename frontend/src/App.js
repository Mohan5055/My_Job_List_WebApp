import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './components/Signup';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import Add from './components/Add';
import Home from './components/Home';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/logout" element={<h1> Logout Component</h1>} />
          <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
