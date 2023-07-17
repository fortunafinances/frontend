import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
import Overview from "./pages/application views/overview";
import Holdings from "./pages/application views/holdings";
import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
import NoMatch from "./components/utility/noMatch";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import Activity from "./pages/application views/activity";
import EditUser from "./pages/editUser";
import Buy from "./pages/Buy";
import Callback from "./pages/callback";
import Sell from "./pages/sell";
import StockInfo from "./components/input/buySellStockInfo";
import cache from "./utilities/cache";
import TransferIn from "./pages/transferIn";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route index element={<UnauthenticatedHomepage />} />
          <Route path="/app" element={<ApplicationLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="activity" element={<Activity />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/editProfile" element={<EditUser />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/buySellStockInfo" element={<StockInfo />} />
          <Route path="/transferIn" element={<TransferIn />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
