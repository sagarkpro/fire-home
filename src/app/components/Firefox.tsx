import Image from "next/image";
import { repoBasePath } from "../constants/Constants";

function Firefox() {
	const isGhDeployment: boolean = process.env.NODE_ENV === "production";
	const basePath: string = repoBasePath;

	return (
		<>
			<div className="flex">
				<div className="m-2">
					<Image src={(isGhDeployment ? basePath : "") + "/images/firefox.png"} alt="firefox" height={150} width={150}></Image>
				</div>
				<div className="m-2 flex items-center">
					<h1 className="text-5xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">Firefox</h1>
				</div>
			</div>
		</>
	);
}

export default Firefox;
