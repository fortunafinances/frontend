import React from "react";
import { formatDate } from "../../../utilities/common";
import { formatDollars } from "../../../utilities/currency";

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
	<div>

		<div className="card card-bordered bg-base-100 selection:shadow-xl">
			<div className="flex flex-row justify-between card-body">
				<div>
					{" "}
					<h2 className="card-title">{type}</h2>
					<p>{description}</p>
				</div>
				<div className="">
					<h2 className="text-2xl">{formatDollars(amount)}</h2>
					<p>{formatDate(date)}</p>
				</div>
			</div>
		</div>
	</div>
);

export default ActivityCard;