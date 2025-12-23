"use client";

import { useEffect, useState } from "react";
import SiteComponent from "./components/SiteComponent";
import Firefox from "./components/Firefox";
import { repoBasePath } from "./constants/Constants";
import { ViewType } from "./models/ViewType";
import ToolsWrapper from "./components/ToolsWrapper";
import Image from "next/image";
import { sites } from "./constants/SiteDataConstants";
import LocalhostPortLauncher from "./components/LocalhostPortLauncher";
import { splitInHalf } from "./Utils/common";

export default function Home() {
	const [leftSites, rightSites] = splitInHalf(sites);
	const [currentView, setCurrentView] = useState<ViewType>("shortcuts");
	const [isAnime, setIsAnime] = useState<boolean>(false);
	const [translateX, setTranslateX] = useState<string>("0px");
	const isGhDeployment: boolean = process.env.NODE_ENV === "production";
	const basePath: string = repoBasePath;
	const buttonImage = getSliderImage();
	const backgroundImage = getBackgroundImage();

	function changeTheme() {
		localStorage.setItem("isAnime", JSON.stringify(!isAnime));
		setTranslateX(!isAnime ? "2.5rem" : "0px");
		setIsAnime(!isAnime);
	}

	function getSliderImage(): string {
		if (isGhDeployment) return "bg-[url(/fire-home/images/ichigo.jpg)]";
		return "bg-[url(/images/ichigo.jpg)]";
	}

	function getBackgroundImage(): string {
		if (isGhDeployment) return "bg-[url(/fire-home/images/makima2.png)]";
		return "bg-[url(/images/makima2.png)]";
	}

	function changeCurrentView(view: ViewType) {
		setCurrentView(view);
	}

	useEffect(() => {
		const persistThemeStr = localStorage.getItem("isAnime");
		if (persistThemeStr) {
			const persistTheme = JSON.parse(persistThemeStr);
			if (persistTheme) {
				setIsAnime(true);
				setTranslateX("2.5rem");
			} else {
				setIsAnime(false);
				setTranslateX("0px");
			}
		}
	}, []);

	return (
		<div className={`w-full h-svh overflow-clip bg-cover bg-center ${isAnime ? backgroundImage : "bg-black"}`}>
			<div className={`w-full h-full overflow-y-scroll overflow-x-clip flex flex-col items-center p-8`}>
				<div className="gap-x-4 md:gap-0 m-2 mb-16 w-full flex items-center flex-wrap md:flex-nowrap justify-between px-6 md:px-0">
					<div className="flex justify-center">
						<Firefox></Firefox>
					</div>

					<div className="flex w-full md:w-max justify-between md:justify-normal">
						<div className="flex items-center">
							<div className="flex gap-x-0.5 rounded-3xl overflow-clip">
								<button onClick={() => changeCurrentView("tools")} className={`w-10 bg-indigo-200 p-2 border-black ${currentView == "tools" ? "opacity-100" : "opacity-70"}`}>
									<Image width={32} height={32} src={(isGhDeployment ? basePath : "") + "/images/tools.svg"} alt="Tools" />
								</button>
								<button onClick={() => changeCurrentView("shortcuts")} className={`w-10 bg-indigo-200 p-2 ${currentView == "shortcuts" ? "opacity-100" : "opacity-70"}`}>
									<Image width={32} height={32} src={(isGhDeployment ? basePath : "") + "/images/web.svg"} alt="Web" />
								</button>
							</div>
						</div>

						<div className="flex items-center justify-end md:px-12">
							<button className="rounded-full bg-zinc-50 text-black p-1 w-[5.5rem]" onClick={changeTheme}>
								<div className={`rounded-[5rem] w-10 h-10 transition-all duration-150 bg-cover bg-center ${isAnime ? buttonImage : "bg-black"}`} style={{ transform: `translateX(${translateX})` }}></div>
							</button>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col md:flex-row">
					<div id="left-content-div" className="flex max-w-screen-2xl flex-wrap justify-center">
						{currentView == "shortcuts" &&
							leftSites.map((site) => {
								return (
									<div key={site.Title} className="m-4">
										<SiteComponent siteData={site}></SiteComponent>
									</div>
								);
							})}
						{currentView == "tools" && <ToolsWrapper />}
					</div>

					<div className="hidden md:block w-[25%]"></div>

					<div id="right-content-div" className="flex max-w-screen-2xl flex-wrap justify-center">
						{currentView == "shortcuts" &&
							rightSites.map((site) => {
								return (
									<div key={site.Title} className="m-4">
										<SiteComponent siteData={site}></SiteComponent>
									</div>
								);
							})}
						{currentView == "tools" && <ToolsWrapper />}
					</div>
				</div>
			</div>
			<LocalhostPortLauncher />
		</div>
	);
}
