import { INTERVALS } from "$/utils/constants";
import React from "react";
import { useStyles } from "./styles";
import { Box } from "@mantine/core";

const TableBg: React.FC<any> = ({ tableRef }) => {
  const { classes } = useStyles();

  return (
    <Box
      ref={tableRef}
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        minWidth: 600,
      }}
    >
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.td}></th>
            <th className={classes.td}>Дав</th>
            <th className={classes.td}>Мяг</th>
            <th className={classes.td}>Лха</th>
            <th className={classes.td}>Пүр</th>
            <th className={classes.td}>Баа</th>
            <th className={classes.td}>Бям</th>
            <th className={classes.td}>Ням</th>
          </tr>
        </thead>
        <tbody>
          {INTERVALS.map((interval, intervalIndex) => (
            <tr className={classes.tr} key={intervalIndex}>
              <td className={classes.td}>{interval.label}</td>
              {[1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => {
                return <td key={dayOfWeek} className={classes.td}></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableBg;
