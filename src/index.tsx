import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import "./styles/tailwind.css";
import "./styles/titlebar.css";

import { Router } from "./router";
import { Titlebar } from "./components/Titlebar";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<React.StrictMode>
		<ToastContainer position="top-right" autoClose={2500} />
		<Titlebar/>
		<Router />
	</React.StrictMode>,
);
