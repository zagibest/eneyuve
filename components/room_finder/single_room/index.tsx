import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Button, SimpleGrid, Select, Card, Title, Group, Badge, Text } from "@mantine/core";

interface SingleRoomProps {
	data: any;
}

const SingleRoom: React.FC<SingleRoomProps> = ({ data }) => {
	return (
		<Card
			shadow="none"
			p="sm"
			radius="md"
			withBorder
			style={{
				maxWidth: "350px",
			}}
		>
			<Group position="apart">
				<Title order={2}>{data.label}</Title>
				<Badge>{data["part_of"][0].label}</Badge>
			</Group>
			<Text>{data.Room_type}</Text>
		</Card>
	);
};

export default SingleRoom;
