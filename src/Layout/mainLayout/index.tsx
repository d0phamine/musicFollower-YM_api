import { FC, ReactNode, useEffect } from "react";
import { Titlebar } from "../../components/Titlebar";

const { ipcRenderer } = window.require("electron");

export interface ILayout {
	children: ReactNode;
}

export const MainLayout: FC<ILayout> = ({ children }) => {
	return (
		<>
			<Titlebar />
			<div className="wrapper-">{children}</div>
		</>
	);
};

