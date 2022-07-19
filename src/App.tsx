import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import "./scss/app.scss";

const Cart = React.lazy(() =>
  import("./pages/Cart").then(({ Cart }) => ({ default: Cart }))
);

const FullPizza = React.lazy(() =>
  import("./pages/FullPizza").then(({ FullPizza }) => ({ default: FullPizza }))
);
const NotFound = React.lazy(() =>
  import("./pages/404").then(({ NotFound }) => ({ default: NotFound }))
);
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='*'
          element={
            <React.Suspense fallback={<div>"Loading..."</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <React.Suspense fallback={<div>"Loading..."</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path='cart'
          element={
            <React.Suspense fallback={<div>"Loading..."</div>}>
              <Cart />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
