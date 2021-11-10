import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/header/header";
import Table from "./component/table/table";
import Text from "./component/text/text";
function App() {
  return (
    <div className="App">
      <div className="appimage">
        <Header />
        {/* <Text /> */}
        <Table />
      </div>
    </div>
  );
}

export default App;
