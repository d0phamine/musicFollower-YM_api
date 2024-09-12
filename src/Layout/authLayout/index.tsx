import { FC, ReactNode } from "react";
import { Titlebar } from "../../components/Titlebar";

import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

import "./index.scss";

export interface ILayout {
	children: ReactNode;
}

export const AuthLayout: FC<ILayout> = observer(({ children }) => {
	const { authStore } = useStores();

	return (
		<div className="layout-wrapper">
			<Titlebar />
			<div className="auth-layout">{children}</div>
		</div>
	);
});

