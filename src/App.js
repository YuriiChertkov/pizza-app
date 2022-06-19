import React from "react";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/404";
import { FullPizza } from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/pizza/:id' element={<FullPizza />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
