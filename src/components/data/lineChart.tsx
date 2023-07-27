import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
	dateRanges,
	lineChartDateRange,
} from "../../utilities/reactiveVariables";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
);

export function LineChart() {
	const chart = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Line Chart",
			},
		},
	};

	const range = useReactiveVar(lineChartDateRange);

	const chartData = {
		labels: range,
		datasets: [
			{
				label: "Brokerage Account",
				data: [12, 19, 3, 5, 2, 3, 9, 20, 100, 35, 25, 15],
				borderColor: "#7c1fff",
				backgroundColor: "#CBA6FF",
			},
			{
				label: "S&P 500",
				data: [5, 10, 15, 20, 25, 30, 35, 60, 28, 13, 55, 12],
				borderColor: "#00AEFF",
				backgroundColor: "#8CDBFF",
				color: "white",
			},
		],
	};

	return (
		<div className="w-full">
			<Line options={chart} data={chartData} />
			<div className="flex mt-5 justify-center ">
				<button
					onClick={() => lineChartDateRange(dateRanges.half)}
					className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block"
				>
					<span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
					<span className="relative group-hover:text-white">
						6 Months
					</span>
				</button>

				<button
					onClick={() => lineChartDateRange(dateRanges.full)}
					className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block rounded-r"
				>
					<span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
					<span className="relative group-hover:text-white">
						12 Months
					</span>
				</button>
				<button
					onClick={() => lineChartDateRange(dateRanges.two)}
					className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block rounded-l"
				>
					<span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
					<span className="relative group-hover:text-white">
						24 Months
					</span>
				</button>
			</div>
		</div>
	);
}
