import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaLoader = (props) => (
  <ContentLoader className = "pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="429" rx="10" ry="10" width="90" height="27" /> 
    <rect x="131" y="420" rx="24" ry="24" width="150" height="40" /> 
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="263" rx="10" ry="10" width="280" height="28" /> 
    <circle cx="139" cy="130" r="125" />
  </ContentLoader>
)

