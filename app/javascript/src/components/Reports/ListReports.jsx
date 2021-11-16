import React from "react";

import { Typography } from "neetoui";
import { useTable } from "react-table";

const ListReports = ({ reports }) => {
  const data = React.useMemo(() => reports, []);

  const columns = React.useMemo(() => [
    {
      Header: "Quiz Name",
      accessor: "quizName",
      Cell: ({ row }) => (
        <Typography className="py-2">{row.original.quiz_name}</Typography>
      ),
    },
    {
      Header: "User Name",
      accessor: "userName",
      Cell: ({ row }) => (
        <Typography>
          {row.original.first_name + " " + row.original.last_name}
        </Typography>
      ),
    },
    {
      Header: "Email",
      accessor: "userEmail",
      Cell: ({ row }) => <Typography>{row.original.email}</Typography>,
    },
    {
      Header: "Correct Answers",
      accessor: "correctAnswersCount",
      Cell: ({ row }) => (
        <Typography>{row.original.correct_answers_count}</Typography>
      ),
    },
    {
      Header: "Incorrect Answers",
      accessor: "inCorrectAnswersCount",
      Cell: ({ row }) => (
        <Typography>{row.original.incorrect_answers_count}</Typography>
      ),
    },
  ]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance;

  return (
    <div className="px-20 py-4">
      <table className="w-full" {...getTableProps()}>
        <thead className="border-b-2">
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  className="py-6 text-left"
                  {...column.getHeaderProps({
                    style: {
                      width: column.width,
                    },
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                key={index}
                className="border-b-2 py-6"
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListReports;
