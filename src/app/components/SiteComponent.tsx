"use client";
import { SiteData } from "@/app/models/SiteData";
import Image from "next/image";
import Link from "next/link";

function SiteComponent({ siteData }: { siteData: SiteData }) {
	return (
		<Link className="flex flex-col items-center hover:cursor-pointer" href={siteData.RedirectUrl} target="_blank">
			<div className="rounded-xl border w-28 md:w-40 h-28 md:h-40 p-5 hover:p-1 bg-black bg-opacity-50 transition-all duration-300 overflow-hidden flex">
				<Image className="my-auto rounded-xl" src={siteData.ImageUrl} alt={siteData.Title} width={siteData.Width ?? 224} height={siteData.Height ?? 224} objectFit="cover" />
			</div>
			<div className="font-bold md:text-lg my-4">{siteData.Title}</div>
		</Link>
	);
}

export default SiteComponent;
