import { FC, ReactNode, useEffect } from "react";
import { Titlebar } from "../../components/Titlebar";
import "./index.scss"

const { ipcRenderer } = window.require("electron");



export interface ILayout {
	children: ReactNode;
}

export const AuthLayout: FC<ILayout> = ({ children }) => {
    return (
		<div className="layout-wrapper">
			<Titlebar />
			<div className="auth-layout">{children}</div>
		</div>
	);
}