"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";

export default function LocalhostPortLauncher() {
	const [visible, setVisible] = useState(false);
	const [port, setPort] = useState<string | null>(localStorage.getItem("port") ?? "");
	const inputRef = useRef<HTMLInputElement | null>(null);

	function updatePort(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (!value) {
			setPort(null);
      localStorage.removeItem("port")
			return;
		}
		if (/^(?:[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)) {
			setPort(value);
      localStorage.setItem("port", e.target.value);
		}
	}

	// ⌨️ CTRL + L shortcut
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === "l") {
				e.preventDefault(); // override browser address bar
				setVisible(true);
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				inputRef.current?.focus();
				inputRef.current?.select();
			}, 100);
		}
	}, [visible]);

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" && port) {
      localStorage.setItem("port", port);
			setVisible(false);
			window.open(`http://localhost:${port}/`, "_blank");
		}
	}

	return (
		<Dialog
			header="Open Localhost:Port"
			visible={visible}
			onHide={() => {
				setVisible(false);
			}}
			draggable={false}
			resizable={false}
			style={{ width: "25rem" }}
		>
			<div className="flex flex-col gap-1 text-white font-semibold justify-center">
				<input id="port" ref={inputRef} type="text" placeholder="Enter port number" value={port ?? ""} onChange={updatePort} onKeyDown={onKeyDown} className="w-full bg-background text-white font-semibold px-2 py-1 rounded-lg outline-none border-2" />
				<p className="text-xs px-1">
					Press <b>Enter</b> to open
				</p>
			</div>
		</Dialog>
	);
}
