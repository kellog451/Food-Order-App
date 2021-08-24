import React from "react";

const ModelContext = React.createContext({
  showCart: false,
  showCartHandler: () => {},
  hideCartHandler: () => {},
});


export default ModelContext;