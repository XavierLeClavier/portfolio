import React from "react";

interface PanelProps {
	content: React.ReactNode	;
	buttonText: string;
	onButtonClick: () => void;
}

const Panel: React.FC<PanelProps> = ({ content, buttonText, onButtonClick }) => (
	<div className="fixed inset-0 z-10">
		{/* Overlay */}
		<div className="absolute inset-0 bg-black bg-opacity-60" />
		{/* Centered modal */}
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 min-w-[300px] max-w-[90vw] border border-gray-200 text-gray-900">
			{content}
			<button
				className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded transition-colors"
				onClick={onButtonClick}
			>
				{buttonText}
			</button>
		</div>
	</div>
);

export default Panel;
