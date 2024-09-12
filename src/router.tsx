import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" index element={<AuthPage />} />
				<Route index path="/register" element={<RegisterPage />} />
			</Routes>
		</HashRouter>
	);
};

