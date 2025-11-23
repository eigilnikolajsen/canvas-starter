import { render } from "solid-js/web";
import { App } from "./components/app";
import "./styles/global.css"; // oxlint-disable-line no-unassigned-import

const rootElement = document.querySelector("#root");

if (rootElement instanceof HTMLElement) {
	render(() => <App />, rootElement);
}
