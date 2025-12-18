"use client";

import { useEffect, useState } from "react";
import SiteComponent from "./components/SiteComponent";
import Firefox from "./components/Firefox";
import { repoBasePath } from "./constants/Constants";
import { ViewType } from "./models/ViewType";
import ToolsWrapper from "./components/ToolsWrapper";
import Image from "next/image";
import { sites } from "./constants/SiteDataConstants";
import LeetCode50 from "./components/LeetCode50";
import LocalhostPortLauncher from "./components/LocalhostPortLauncher";

export default function Home() {
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
		if (isGhDeployment) return "bg-[url(/fire-home/images/gotei-4k.jpg)]";
		return "bg-[url(/images/gotei-4k.jpg)]";
	}

	function changeCurrentView(view: ViewType) {
		setCurrentView(view);
	}

	useEffect(() => {
		const persistThemeStr = localStorage.getItem("isAnime");
		if (persistThemeStr) {
			const persistTheme = JSON.parse(persistThemeStr);
			console.log(persistTheme);

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
				<LocalhostPortLauncher />
				
				
				<div className="m-2 mb-16 w-full flex flex-col items-center md:flex-row md:justify-evenly">
					<div className="w-1/3 flex items-center">
						<div className="flex gap-x-0.5 rounded-3xl overflow-clip">
							<button onClick={() => changeCurrentView("tools")} className={`w-10 bg-indigo-200 p-2 border-black ${currentView == "tools" ? "opacity-100" : "opacity-70"}`}>
								<Image width={32} height={32} src={(isGhDeployment ? basePath : "") + "/images/tools.svg"} alt="Tools" />
							</button>
							<button onClick={() => changeCurrentView("shortcuts")} className={`w-10 bg-indigo-200 p-2 ${currentView == "shortcuts" ? "opacity-100" : "opacity-70"}`}>
								<Image width={32} height={32} src={(isGhDeployment ? basePath : "") + "/images/web.svg"} alt="Web" />
							</button>
						</div>
					</div>

					<div className="md:w-1/3 flex justify-center">
						<Firefox></Firefox>
					</div>

					<div className="flex md:w-1/3 items-center justify-end px-12">
						<button className="rounded-full bg-zinc-50 text-black p-1 w-[5.5rem]" onClick={changeTheme}>
							<div className={`rounded-[5rem] w-10 h-10 transition-all duration-150 bg-cover bg-center ${isAnime ? buttonImage : "bg-black"}`} style={{ transform: `translateX(${translateX})` }}></div>
						</button>
					</div>
				</div>


				<div id="content-div" className="flex max-w-screen-2xl min-h-svh flex-wrap justify-center">
					{currentView == "shortcuts" &&
						sites.map((site) => {
							return (
								<div key={site.Title} className="m-4">
									<SiteComponent siteData={site}></SiteComponent>
								</div>
							);
						})}

					<div className="m-4">
						<LeetCode50 />
					</div>

					{currentView == "tools" && <ToolsWrapper />}
				</div>
			</div>
		</div>
	);
}
