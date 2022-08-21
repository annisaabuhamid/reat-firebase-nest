import { BrowserRouter,Routes,Route,} from "react-router-dom";
import App from '../App';
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import HomeWithId from "../pages/HomeWithId";
import { routeNames } from "./routeNames";
  
  const AllRoutes = () => {
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routeNames.LANDINGPAGE} element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path={routeNames.HOME} element={<Home />} />
            <Route path={routeNames.HOME_WITH_ID} element={<HomeWithId />} />
            {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default AllRoutes;