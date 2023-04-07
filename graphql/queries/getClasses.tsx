import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query finderEmpty {
    rooms(
      where: {
        part_of: { label_CONTAINS: "3А" }
        course_schedules: {
          AND: [
            { Schedule_start_NOT: "11:00" }
            { Schedule_end_NOT: "12:40" }
            { Schedule_start_NOT: "11:45" }
            { Schedule_end_NOT: "11:45" }
            { Day_of_week: "Баасан" }
          ]
        }
      }
    ) {
      course_schedulesAggregate {
        count
      }
      label
      course_schedules(
        where: {
          AND: [
            { Schedule_start_NOT: "11:00" }
            { Schedule_end_NOT: "12:40" }
            { Schedule_start_NOT: "11:45" }
            { Schedule_end_NOT: "11:45" }
            { Day_of_week: "Баасан" }
          ]
        }
      ) {
        Schedule_start
        Schedule_end
        Day_of_week
      }
    }
  }
`;

export default function GetClasses() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return loading;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const returnVal = data.rooms;
  return returnVal;
}
