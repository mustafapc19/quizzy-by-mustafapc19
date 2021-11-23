import React, { useState } from "react";

import { Button, Toastr, Typography } from "neetoui";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import quizzesApi from "apis/quizzes";
import handleError from "common/error";
import { useQuizzes } from "contexts/quizzes";

import { fetchQuizzesList } from "../common";
import ConfirmDelete from "../ConfirmDelete";

const Table = () => {
  const [quizzes, setQuizzes] = useQuizzes();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [quiz, setQuiz] = useState({});

  const handleDelete = async () => {
    try {
      await quizzesApi.destroy(quiz.id);
      await fetchQuizzesList(setQuizzes);
      logger.info(quizzes);

      Toastr.success("Quiz deleted successfuly");
      setShowConfirmDeleteModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const data = React.useMemo(
    () =>
      Object.keys(quizzes).sort((a, b) => quizzes[b].time - quizzes[a].time),
    [quizzes]
  );

  const deleteOnClick = quiz => {
    setQuiz(quiz);
    setShowConfirmDeleteModal(true);
  };

  const columns = React.useMemo(
    () => [
      {
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/quiz/${quizzes[row.original].id}/show`,
            }}
          >
            <Typography className="hover:text-blue-600">
              {quizzes[row.original].name}
            </Typography>
          </Link>
        ),
      },
      {
        accessor: "edit",
        Cell: ({ row }) => (
          <Button
            label="edit"
            style="secondary"
            to={`/quiz/${quizzes[row.original].id}/edit`}
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
              deleteOnClick(quizzes[row.original]);
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
      <ConfirmDelete
        handleDelete={handleDelete}
        showConfirmDeleteModal={showConfirmDeleteModal}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />
      <table className="w-full" {...getTableProps()}>
        <thead className="py-4 border-b-2">
          <Typography
            className="pb-2 pl-2 text-gray-700"
            style="body2"
            weight="semibold"
          >
            Quiz Name
          </Typography>
        </thead>
        <tbody className="flex flex-col" {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                key={index}
                className="flex py-2 border-b-2"
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

export default Table;
