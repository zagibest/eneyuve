import { Box, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import { ScheduleItem } from "../room_search";
import SingleRoom from "../single_room";

interface SearchResultsProps {
	list: ScheduleItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ list }) => {
	return (
		<Box>
			<Title order={5} mb="md">
				Илэрц: {list?.length || 0}
			</Title>
			<SimpleGrid
				cols={5}
				breakpoints={[
					{ maxWidth: 980, cols: 3, spacing: "md" },
					{ maxWidth: 755, cols: 2, spacing: "sm" },
					{ maxWidth: 600, cols: 1, spacing: "sm" },
				]}
			>
				{list?.map((item, index) => {
					return <SingleRoom key={index} data={item} />;
				})}
			</SimpleGrid>
		</Box>
	);
};

export default SearchResults;
