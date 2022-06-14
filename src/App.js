import { Navigate, Route, Routes } from "react-router-dom";
import { Book } from "./components/book/Book";
import { Home } from "./components/home/Home";
import './App.css'
import Navbar1 from "./components/Navbar1";
import { Author } from "./components/author/Author";

function App() {

  return (
    <div className="App">
      
          <Routes>
            <Route path="/" element={<Navbar1 />} >
            <Route index element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="author" element={<Author />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
     
    </div>
  );
}

export default App;
