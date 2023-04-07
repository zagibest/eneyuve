import { getCourseList } from "$/services";
import { ChildMenu, ParentMenu } from "$/utils/constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, LoadingOverlay, Select, SimpleGrid, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";

interface RoomSearchProps {
  //   setList: Function;
  //   list: any[];
  setSelectedCourses: Function;
  selectedCourses: any[];
  firstTimeVisitor: boolean;
  setFirstTimeVisitor: Function;
}

interface Children {
  unitid: number;
  unitname: string;
}

const UnitSelector: React.FC<RoomSearchProps> = ({
  setSelectedCourses,
  selectedCourses,
  firstTimeVisitor,
  setFirstTimeVisitor,
}) => {
  const [parent] = useAutoAnimate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [salbar, setSalbar] = useLocalStorage<string | undefined>({
    key: "salbar",
    defaultValue: undefined,
  });
  const [tenhim, setTenhim] = useLocalStorage<string | undefined>({
    key: "tenhim",
    defaultValue: undefined,
  });

  const course = useRequest((id) => getCourseList(id), {
    manual: true,
  });

  useEffect(() => {
    if (tenhim) {
      course.run(tenhim);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenhim]);

  const [open, setOpen] = useState(true);

  return (
    <div>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={parent}
      >
        {firstTimeVisitor && (
          <Title order={3} mb="lg">
            Өөрийн үзэх хичээлүүдээ эндээс сонгоно уу
          </Title>
        )}
        {/* <ActionIcon size="xs" onClick={() => setOpen(!open)}>
          {open ? <ArrowsDiagonalMinimize2 /> : <ArrowsDiagonal />}
        </ActionIcon> */}
      </Box>
      {open && (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 3, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <Select
            required
            label="Салбар сургууль"
            placeholder="Cонгох"
            value={salbar}
            data={
              ParentMenu.map((branch: Children) => ({
                label: branch.unitname,
                value: branch.unitid as any,
              })) || []
            }
            onChange={(value: any) => {
              // branch.run(value);
              setSalbar(value);
              setTenhim(undefined);
            }}
          />

          <Select
            required
            label="Тэнхим"
            placeholder="Сонгох"
            disabled={tenhim?.length === 0}
            value={tenhim}
            data={
              ChildMenu.find(
                (menu) => menu.unitid === parseInt(salbar || "0")
              )?.children?.map((school: Children) => ({
                label: school.unitname,
                value: school.unitid as any,
              })) || []
            }
            onChange={(value: any) => {
              setTenhim(value);
            }}
          />
          <Box
            style={{
              position: "relative",
            }}
          >
            <Select
              label="Хичээл"
              placeholder="Сонгох"
              data={
                course.data?.map((school: any) => ({
                  label: school.coursename,
                  value: school.courseid,
                })) || []
              }
              disabled={course.data?.length === 0}
              searchable
              searchValue={searchValue}
              value={""}
              onSearchChange={(value: string) => setSearchValue(value)}
              onChange={(value: any) => {
                const courseData = course.data?.filter((course: any) => {
                  return value === course.courseid;
                });
                const isExits = selectedCourses?.find((course) => {
                  return course.courseid === value;
                });
                if (!isExits) {
                  setSelectedCourses([...selectedCourses, ...courseData]);
                } else {
                  setSelectedCourses(
                    selectedCourses.filter((course) => {
                      return course.courseid !== value;
                    })
                  );
                }
                setSearchValue("");
                setFirstTimeVisitor(false);
              }}
            />
            <LoadingOverlay visible={course.loading} />
          </Box>
        </SimpleGrid>
      )}
    </div>
  );
};

export default UnitSelector;
