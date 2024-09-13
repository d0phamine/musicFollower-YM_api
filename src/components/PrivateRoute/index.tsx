import { FC } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { useStores } from "../../store";

interface PrivateRouteProps {
	children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
	const { authStore } = useStores();
	const token = authStore.getToken();

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return children;
};
