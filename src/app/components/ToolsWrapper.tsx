import Image from "next/image";
import React, { useState } from "react";
import { tools } from "../constants/ToolDataConstants";
import { Dialog } from "primereact/dialog";
import GetToolByTitle from "./tools/GetToolByTitle";

export default function ToolsWrapper() {
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedToolName, setSelectedToolName] = useState<string>("");

	function selectTool(tool: string) {
		setSelectedToolName(tool);
		setVisible(true);
	}

	return (
		<div>
			{tools.map((toolData) => {
				return (
					<button onClick={() => selectTool(toolData.Title)} key={`tool-${toolData.Title}`} className="flex flex-col items-center hover:cursor-pointer">
						<div className="rounded-xl border w-28 md:w-56 h-28 md:h-56 p-5 hover:p-1 bg-black bg-opacity-50 transition-all duration-300 overflow-hidden flex">
							<Image className="my-auto rounded-xl" src={toolData.ImageUrl} alt={toolData.Title} width={toolData.Width ?? 224} height={toolData.Height ?? 224} objectFit="cover" />
						</div>
						<div className="font-bold md:text-xl my-4">{toolData.Title}</div>
					</button>
				);
			})}
			<Dialog visible={visible} onHide={() => setVisible(false)} resizable={true} style={{ minWidth: "50vw" }}>
				<div className="flex w-full justify-center items-center mb-8">{<GetToolByTitle title={selectedToolName} />}</div>
			</Dialog>
		</div>
	);
}
