import Image from "next/image";
import Link from "next/link";
import React from "react";
import { repoBasePath } from "../constants/Constants";

export default function LeetCode50() {
	const isGhDeployment: boolean = process.env.NODE_ENV === "production";
	const basePath: string = repoBasePath;
	return (
		<Link className="flex flex-col items-center hover:cursor-pointer" href={(isGhDeployment ? basePath : "") + "/leetcode50.md"}>
			<div className="rounded-xl border w-56 h-56 p-5 hover:p-1 bg-black bg-opacity-50 transition-all duration-300 overflow-hidden flex">
				<Image className="my-auto rounded-xl" src={(isGhDeployment ? basePath : "") + "/images/leetcode.png"} alt={"leetcode50"} width={224} height={224} objectFit="cover" />
			</div>
			<div className="font-bold text-xl my-4">LeetCode50</div>
		</Link>
	);
}
