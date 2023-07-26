import { Link } from "react-router-dom";
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { sidebarClosed } from "../../utilities/reactiveVariables";
import TotalAccountValue from "../data/totalAccountValue";

export default function SideBar() {
	const collapsed = useReactiveVar(sidebarClosed);

	return (
		<div className="relative h-full">
			<div
				className={twMerge(
					"h-full bg-gray-800 text-white flex flex-col justify-between",
					collapsed ? "w-6" : "w-screen sm:w-64"
				)}
			>
				{!collapsed && <TotalAccountValue />}
				<button
					onClick={() => sidebarClosed(!collapsed)}
					className="absolute right-0 bg-gray-200 text-black w-fit py-4 rounded-l-md top-[50%] -translate-y-[50%]"
				>
					{collapsed ? (
						<AiOutlineArrowRight size={20} />
					) : (
						<AiOutlineArrowLeft size={20} />
					)}
				</button>
				<div className="flex flex-col items-center gap-2 p-1 text-xs">
					{!collapsed && (
						<div className="flex flex-col justify-between items-center w-full">
							<div className="flex flex-row justify-between w-full">
								<Link to="/about" className="hover:underline">
									About Fortuna
								</Link>
								<Link to="/privacy" className="hover:underline">
									Privacy Policy
								</Link>
								<Link to="/contact" className="hover:underline">
									Contact Us
								</Link>
							</div>
							<div className={collapsed ? "absolute bottom-1" : ""}>
								<p className="flex flex-row items-center gap-1">
									<AiOutlineCopyrightCircle size={collapsed ? 14 : 18} />
									{!collapsed && 2023} Fortuna
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
