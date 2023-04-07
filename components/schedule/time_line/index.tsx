import { CourseDetail } from "$/services/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Badge, Box, Flex, LoadingOverlay, Stack, Text } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import TableBg from "./bg";

// export interface CourseForTable {
//   name: string;
//   dayOfWeek: number;
//   startTime: string;
//   endTime: string;
// }

interface RoomSearchProps {
  courses: CourseDetail[];
  loading: boolean;
}

const TimeLine: React.FC<RoomSearchProps> = ({ courses, loading }) => {
  const [parent] = useAutoAnimate({
    duration: 200,
  });
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableWidth, setTableWidth] = React.useState(0);
  const [hovered, setHovered] = React.useState<number>();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const parentWidth = entries[0].contentRect.width;
      setTableWidth(parentWidth);
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const singleNodeWidth = tableWidth / 8;

  const getColor = (type: string) => {
    switch (type) {
      case "Лекц":
        return "green";
      case "Сем":
        return "blue";
      case "Лаб":
        return "orange";
      default:
        return "gray";
    }
  };
  return (
    <Box>
      <Box
        w="100%"
        style={{
          position: "relative",
          width: "100%",
          height: 700,
          minWidth: 800,

          // div[data-group="1"]:hover {
          //   background-color: yellow;
          // }

          // div[data-group="2"]:hover {
          //   background-color: lightblue;
          // }
        }}
        ref={parent}
      >
        {courses.map((course) => {
          return (
            <Box
              // key={`${course.subjectName} - ${course.compName}`}
              key={course.hvid}
              // key={index}
              // id={`${course.courseid}`}
              onMouseEnter={() => setHovered(course.groupid)}
              onMouseLeave={() => setHovered(undefined)}
              style={{
                position: "absolute",
                top: course.timeid * 40,
                left: course.weekday * singleNodeWidth,
                height: 40 * course.durtime,
                width: singleNodeWidth,
                zIndex: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                color: "black",
                borderRadius: 10,
                fontSize: 10,
                backgroundColor: "#f5f5f5",
                border:
                  hovered === course.groupid
                    ? "1px solid black"
                    : "1px solid #ccc",
                padding: "0.5rem",

                // boxShadow:
                //   hovered === course.groupid ? "0 0 0 2px #f5f5f5" : "none",
              }}
            >
              <Stack spacing={8}>
                <Flex>
                  <Badge color={getColor(course.compName)} size="xs">
                    {course.compName}
                  </Badge>
                </Flex>
                <Text>{course.subjectName}</Text>
                <Text>{course.empName}</Text>
              </Stack>
            </Box>
          );
        })}
        <TableBg tableRef={tableRef} />
        <LoadingOverlay visible={loading} />
      </Box>
    </Box>
  );
};

export default TimeLine;
