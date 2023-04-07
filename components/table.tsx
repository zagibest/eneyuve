import {
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Space,
  Stack,
  Table as MantineTable,
} from "@mantine/core";
import { m } from "framer-motion";
import React from "react";
import { Column, usePagination, useTable } from "react-table";

interface Props<T extends object = {}> {
  loading: boolean;
  dataSource: T[];
  columns: Column<T>[];
}

const Table = <T extends object = {}>({
  loading,
  columns,
  dataSource,
}: Props<T>) => {
  const {
    prepareRow,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: dataSource, initialState: { pageSize: 20 } },
    usePagination
  );

  return (
    <Stack spacing="xs" sx={{ position: "relative" }}>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <MantineTable
        highlightOnHover
        fontSize="sm"
        horizontalSpacing="sm"
        verticalSpacing="xs"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup, headerInd) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerInd}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <m.tr
                {...row.getRowProps()}
                key={row.id}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -16 },
                }}
              >
                {row.cells.map((cell, cellInd) => (
                  <td {...cell.getCellProps()} key={cellInd}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </m.tr>
            );
          })}
        </tbody>
      </MantineTable>
      <Group position="right">
        <Select
          searchable
          style={{ width: 84 }}
          value={pageSize.toString()}
          onChange={(value) => setPageSize(parseInt(value || "20", 10))}
          data={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
            { value: "100", label: "100" },
            { value: "200", label: "200" },
          ]}
        />
        <Space />
        <Pagination
          withEdges
          siblings={1}
          page={pageIndex + 1}
          total={pageOptions.length}
          onChange={(page) => gotoPage(page - 1)}
          getItemAriaLabel={(page) => {
            switch (page) {
              case "dots":
                return "dots element aria-label";
              case "prev":
                return "previous page button aria-label";
              case "next":
                return "next page button aria-label";
              case "first":
                return "first page button aria-label";
              case "last":
                return "last page button aria-label";
              default:
                return `${page} item aria-label`;
            }
          }}
        />
      </Group>
    </Stack>
  );
};

export default Table;
