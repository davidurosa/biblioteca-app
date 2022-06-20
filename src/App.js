import { Navigate, Route, Routes } from "react-router-dom";
import { Book } from "./components/book/Book";
import { Home } from "./components/home/Home";
import './App.css'
import Navbar1 from "./components/Navbar1";
import { Author } from "./components/author/Author";
import { Publishing } from "./components/publishing/Publishing";
import { Career } from "./components/career/Career";
import { Matter } from "./components/matter/Matter";
import { Student } from "./components/student/Student";


function App() {

  return (
    <div className="App">
      
          <Routes>
            <Route path="/" element={<Navbar1 />} >
            <Route index element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="author" element={<Author />} />
            <Route path="publishing" element={<Publishing />} />
            <Route path="career" element={<Career />} />
            <Route path="matter" element={<Matter/>} />
            <Route path="student" element={<Student/>} />
            <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
     
    </div>
  );
}

export default App;
