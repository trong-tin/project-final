import "./App.css";
import AllRoute from "./Components/AllRoute";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Việc làm IT</title>
      </Helmet>
      <AllRoute />
    </>
  );
}

export default App;
