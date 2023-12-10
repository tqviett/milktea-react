import  Navbar from "./components/layout/Navbar"
import  StickyFooter from "./components/layout/StickyFooter"
import  Main from "./components/layout/Main"




function App() {
  return (
    <div className="App">
      <Navbar /> 
        <Main/>
      <StickyFooter/>
    </div>
  );
}

export default App;
