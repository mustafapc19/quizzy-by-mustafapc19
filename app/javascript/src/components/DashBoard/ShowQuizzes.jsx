import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTable } from "react-table";

import ConfirmDelete from "./ConfirmDelete";
import EditQuiz from "./EditQuestion";

const ShowQuizzes = ({ quizzes }) => {
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [onFocusQuiz, setOnFocusQuiz] = useState({});

  const data = React.useMemo(() => quizzes, [quizzes]);

  const columns = React.useMemo(
    () => [
      {
        accessor: "name",
        Cell: ({ row }) => <div className="pt-1">{row.original.name}</div>,
      },
      {
        accessor: "edit",
        Cell: ({ row }) => (
          <Button
            label="edit"
            style="secondary"
            onClick={() => {
              setOnFocusQuiz(row.original);
              setShowEditQuizModal(true);
            }}
          />
        ),
      },
      {
        accessor: "delete",
        Cell: ({ row }) => (
          <Button
            label="delete"
            style="danger"
            onClick={() => {
              setOnFocusQuiz(row.original);
              setShowConfirmDeleteModal(true);
            }}
          />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  return (
    <>
      <EditQuiz
        showEditQuizModal={showEditQuizModal}
        setShowEditQuizModal={setShowEditQuizModal}
        quiz={onFocusQuiz}
      />
      <ConfirmDelete
        quiz={onFocusQuiz}
        showConfirmDeleteModal={showConfirmDeleteModal}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />
      <table className="w-full" {...getTableProps()}>
        <thead className="py-4 border-b-2">
          <Typography style="body2" weight="semibold">
            Quiz Name
          </Typography>
        </thead>
        <tbody className="flex flex-col" {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                key={index}
                className="flex border-b-2"
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      className={`flex py-2 px-2
                    ${index == 0 ? "flex-grow" : "flex-none"}`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ShowQuizzes;