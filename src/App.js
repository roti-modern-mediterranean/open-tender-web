import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import Routes from "./features/Routes";
import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* <BrandStyle />*/}
      {/* <Nav brand={brand} customer={customer} /> */}
      {/* <SystemNotifications /> */}
      <div className="container">
        {/* <AppBackground brand={brand} /> */}
        <Routes />
      </div>
      {/* <div className="CartButton__container fixed b0 r0 mr1 md:mr3 mb1 md:col-6 lg:col-5 z1">
          <CartButton
            className="right"
            onClick={() => get(actions, "setSideCurtain", (f) => f)(MINI_CART)}
            currentLineItems={lineItems}
          />
        </div> */}
      {/* <Modal />
        <Drawer />
        <SideCurtain />
        <Footer brand={brand} /> */}
    </div>
  );
}

export default App;
