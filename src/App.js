import { Outlet} from "react-router-dom";
import NavBar from "./components/NavBar";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { lightGreen } from "@mui/material/colors";



const theme = createTheme({
  palette: {
    primary: {
      main:lightGreen[500],
    },
    secondary: {
      main: "#64dd17",
    },
  },
});
const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <div>
     <NavBar/>
      <main>
        <Outlet />
        </main>
    </div>
    </ThemeProvider>
  )
}

export default App;