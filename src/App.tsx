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
import { ApolloClient, ApolloProvider } from "@apollo/client";
import Activity from "./pages/application views/activity";
import EditUser from "./pages/editUser";
import Callback from "./pages/callback";
import Trade from "./components/layout/trade";
import cache from "./utilities/cache";
import Orders from "./pages/application views/orders";
import TransferSuccessful from "./components/popup/transferSuccessful";
import ErrorNotification from "./components/popup/errorNotif";

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
						<Route path="orders" element={<Orders />} />
						<Route path="trade" element={<Trade />} />
						<Route path="editProfile" element={<EditUser />} />
						<Route path="*" element={<Navigate to="overview" replace />} />
					</Route>
					<Route path="/callback" element={<Callback />} />
					<Route path="/successNotification" element={<TransferSuccessful />} />
					<Route path="/errorNotification" element={<ErrorNotification />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}
