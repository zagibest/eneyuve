import { BUILDINGS, DAYS, ENDTIMES, TIMES } from "$/utils/constants";
import { gql, useLazyQuery } from "@apollo/client";
import { Box, Button, Loader, Paper, Select, SimpleGrid, Space, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import SingleRoom from "../single_room";

interface RoomSearchProps {}

interface RoomSearchForm {
	start_time?: string;
	end_time?: string;
	duration?: number;
	building?: string;
	day_of_week?: string;
}

export interface ScheduleItem {
	Хуваарийн_дугаар: string;
	Хичээлийн_дугаар: string;
	Хичээлийн_жил: string;
	Улирал: string;
	Заасан_багшийн_нэр: string;
	Багшийн_хувийн_дугаар: string;
	Хичээлийн_нэр: string;
	Багц_цаг: number;
	Хичээлийн_хэлбэр: string;
	Гараг: string;
	Эхлэх_цаг: string;
	Дуусах_цаг: string;
	Оролтын_тоо: number;
	Давтамж: string;
	Эхлэх_огноо: string;
	Хичээллэх_байр: string;
	Өрөөний_дугаар: string;
	Өрөөний_нэр: string;
	Боломжит_суудал: number;
	times: Times[];
}

interface Times {
	startTime: string;
	endTime: string;
	id: string;
	day: string;
}
const QUERY = gql`
	query finderEmpty($settings: [Course_scheduleWhere!], $buildingName: String, $today: String) {
		rooms(
			where: {
				part_of: { label_CONTAINS: $buildingName }
				course_schedules: { OR: $settings, Day_of_week: $today }
			}
		) {
			course_schedulesAggregate {
				count
			}
			label
			part_of {
				label
			}
			Room_type
		}
	}
`;
const QUERY1 = gql`
	query finderEmpty($buildingName: String, $today: String) {
		rooms(where: { part_of: { label_CONTAINS: $buildingName }, course_schedules: { Day_of_week: $today } }) {
			course_schedulesAggregate {
				count
			}
			label
			part_of {
				label
			}
			Room_type
		}
	}
`;
const RoomFinderWidget: React.FC<RoomSearchProps> = ({}) => {
	const [list, setList] = React.useState<any[]>([]);
	const [getRooms, { data, loading, error }] = useLazyQuery(QUERY);
	const [getAllRooms, { data: alldata, loading: allloading, error: allerror }] = useLazyQuery(QUERY1);

	const findValueOfTime = (time: string) => {
		return TIMES.find((item) => item.label === time)?.value;
	};

	const findEnd = (time: string) => {
		return ENDTIMES.find((item) => item.label === time)?.value;
	};

	const form = useForm<RoomSearchForm>({
		initialValues: {
			day_of_week: DAYS.find((day) => day.value === dayjs().format("dddd"))?.label,
		},
		validate: (values) => {
			const errors: Record<string, string> = {};
			if (!values.building) {
				errors.building = "Байршил сонгоно уу";
			}
			if (!values.start_time) {
				errors.start_time = "Эхлэх цаг сонгоно уу";
			}
			if (!values.end_time) {
				errors.end_time = "Дуусах цаг сонгоно уу";
			}
			return errors;
		},
	});

	const sumbitForm = (data: RoomSearchForm) => {
		let today = DAYS.find((day) => day.value === dayjs().format("dddd"))?.label;
		if (!data.start_time || !data.end_time || !data.building) return;
		const buildingName = data.building;
		const start_time = findValueOfTime(data.start_time);
		const end_time = findEnd(data.end_time);
		let settings: {}[] = [];
		settings.push({ Schedule_start: data.start_time });
		settings.push({ Schedule_end: data.end_time });
		for (let i = start_time!; i < end_time! - 1; i++) {
			settings.push({ Schedule_start: TIMES[i].label });
			settings.push({ Schedule_end: ENDTIMES[i].label });
		}
		today = data.day_of_week;

		getRooms({
			variables: {
				settings,
				buildingName,
				today,
			},
		});
		getAllRooms({
			variables: {
				buildingName,
				today,
			},
		});
		// setList([]);
	};

	const getNotDuplicated = (data: any, alldata: any) => {
		let notDuplicated: any = [];
		if (data && alldata) {
			const dataRooms = data.rooms;
			const alldataRooms = alldata.rooms;
			for (let i = 0; i < alldataRooms.length; i++) {
				let count = 0;
				for (let j = 0; j < dataRooms.length; j++) {
					if (alldataRooms[i].label === dataRooms[j].label) {
						count++;
					}
				}
				if (count === 0) {
					notDuplicated.push(alldataRooms[i]);
				}
			}
		}
		return notDuplicated;
	};

	let notDuplicated: any = [];

	useEffect(() => {
		if (data && alldata) {
			notDuplicated = getNotDuplicated(data, alldata);
			setList(notDuplicated);

			return () => {};
		}
	}, [data, alldata]);

	return (
		<Stack>
			<form onSubmit={form.onSubmit(sumbitForm)}>
				<Paper p="md">
					<SimpleGrid
						cols={5}
						breakpoints={[
							{ maxWidth: 1200, cols: 5, spacing: "md" },
							{ maxWidth: 980, cols: 4, spacing: "md" },
							{ maxWidth: 744, cols: 3, spacing: "sm" },
							{ maxWidth: 600, cols: 1, spacing: "sm" },
						]}
					>
						<Select
							required
							label="Эхлэх цаг"
							placeholder="Эхлэх цаг сонгох"
							data={TIMES.map((time) => ({
								label: time.label,
								value: time.label.toString(),
							}))}
							error={form.errors.start_time}
							{...form.getInputProps("start_time")}
						/>
						<Select
							required
							label="Дуусах цаг"
							placeholder="Дуусах цаг сонгох"
							error={form.errors.end_time}
							data={ENDTIMES.filter((time) => {
								const startValue = findValueOfTime(form.values.start_time ?? "07:40");
								const endValue = findEnd(time.label);
								if (startValue !== undefined && endValue !== undefined && startValue < endValue) {
									{
										return {
											label: time.label,
											value: time.label.toString(),
										};
									}
								}
							}).map((time) => ({
								label: time.label,
								value: time.label.toString(),
							}))}
							{...form.getInputProps("end_time")}
							disabled={!form.values.start_time}
						/>
						<Select
							required
							label="Гараг"
							placeholder="Гараг сонгох"
							error={form.errors.day_of_week}
							data={DAYS.map((time) => ({
								label: time.label,
								value: time.label.toString(),
							}))}
							{...form.getInputProps("day_of_week")}
						/>
						<Select
							required
							label="Хичээлийн байр"
							placeholder="Хичээлийн байр сонгох"
							data={BUILDINGS}
							error={form.errors.building}
							{...form.getInputProps("building")}
						/>
						<Stack
							style={{
								justifyContent: "space-between",
							}}
						>
							<Space />
							<Button type="submit" w="100%">
								Хайх
							</Button>
						</Stack>
					</SimpleGrid>
				</Paper>
			</form>
			<Space h={16} />
			<Paper p="md">
				<Box>
					<Title order={5} mb="md">
						Илэрц: {list?.length || 0}
					</Title>
					<SimpleGrid
						cols={3}
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

					{(loading || allloading) && (
						<Box
							style={{
								width: "100%",
								textAlign: "center",
								padding: "1rem",
							}}
						>
							<Loader />
						</Box>
					)}

					{(error || allerror) && !(loading || allloading) && (
						<Box
							style={{
								width: "100%",
								textAlign: "center",
								padding: "1rem",
								backgroundColor: "red",
								color: "white",
								borderRadius: "10px",
								opacity: "0.4",
							}}
						>
							<Text>Серверээс хариу ирсэнгүй :((((</Text>
						</Box>
					)}

					{!allloading && data && alldata && list?.length === 0 && (
						<Box
							style={{
								width: "100%",
								textAlign: "center",
								padding: "1rem",
								backgroundColor: "darkgreen",
								color: "white",
								borderRadius: "10px",
								opacity: "0.4",
							}}
						>
							<Text>Илэрцгүй :((((</Text>
						</Box>
					)}
				</Box>
			</Paper>
		</Stack>
	);
};

export default RoomFinderWidget;
