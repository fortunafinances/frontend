import React from "react";
import { formatDate } from "../../../utilities/common";
import { formatDollars } from "../../../utilities/common";

interface ActivityProps {
	date: string;
	type: string;
	description: string;
	amount: number;
}

const ActivityCard: React.FC<ActivityProps> = ({
	date,
	type,
	description,
	amount,
}) => (
	<div className="card card-bordered bg-base-100 selection:shadow-xl">
		<div className="flex flex-row justify-between card-body">
			<div>
				{" "}
				<h2 className="card-title text-3xl">{type}</h2>
				<p className="text-gray-500 text-sm">{description}</p>
			</div>
			<div className="flex flex-col items-end">
				<h2 className="text-2xl">{formatDollars(amount)}</h2>
				<p className="text-xs py-3 whitespace-nowrap">
					{formatDate(date)}
				</p>
			</div>
		</div>
	</div>
);

export default ActivityCard;
