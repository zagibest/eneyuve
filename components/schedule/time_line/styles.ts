import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  td: {
    padding: 8,
    border: "1px solid #eaeaea",
    textAlign: "center",
    fontSize: 14,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,

    width: 100,
    height: 40,
  },
  th: {
    width: 100,
    height: 40,
    padding: 8,
    border: "1px solid #eaeaea",
    textAlign: "center",
    fontSize: 14,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
  tr: {
    height: 40,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #eaeaea",
    minWidth: 600,
    fontSize: "10px",
  },
}));
