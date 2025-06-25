import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Navbar from "./components/Navbar";
import MagazineList from "./components/MagazineList";
import MagazineForm from "./components/MagazineForm";
import DvdList from "./components/DvdList";
import DvdForm from "./components/DvdForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookForm />} />

        <Route path="/magazines" element={<MagazineList />} />
        <Route path="/magazines/new" element={<MagazineForm />} />
        <Route path="/magazines/:id" element={<MagazineForm />} />

        <Route path="/dvds" element={<DvdList />} />
        <Route path="/dvds/new" element={<DvdForm />} />
        <Route path="/dvds/:id" element={<DvdForm />} />
      </Routes>
    </Router>
  );
}

export default App;
