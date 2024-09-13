import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthPage, RegisterPage, FeedPage } from "./pages";
import { PrivateRoute } from "./components";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route index path="/" element={<AuthPage />} />
				<Route index path="/register" element={<RegisterPage />} />
				<Route
					index
					path="/feed"
					element={
						<PrivateRoute>
							<FeedPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</HashRouter>
	);
};

