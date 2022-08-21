import {
  Outlet,
} from "react-router-dom";


const App = () => {

  return (
    <div>
      <h1>sharing components</h1>
      <main>
        <Outlet />
        </main>
    </div>
  )
}

export default App;