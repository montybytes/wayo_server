"use client";

import React, { MouseEventHandler, useMemo, useRef } from "react";
import { Column, useTable } from "react-table";
import { Edit, Eye, Trash2 } from "react-feather";

import Button from "@/src/components/Button";
import ButtonLink from "@/src/components/ButtonLink";
import PageHeader from "@/src/components/PageHeader";
import { malls } from "@/src/helpers/_mock";

import DeleteModal from "./_components/DeleteModal";

export default function View() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => modalRef.current?.showModal();

  const deleteMall: MouseEventHandler = (event) => {
    event.preventDefault();

    // logic to delete mall from db
    //

    modalRef.current?.close();
  };

  const columns: Column[] = useMemo(
    () => [
      {
        header: "",
        accessor: "id",
        Cell: (props) => (
          <input
            id={props.row.values["id"]}
            type="checkbox"
            value={props.row.values["id"]}
            className="m-1"
          />
        ),
      },
      {
        header: "Logo",
        accessor: "logo",
        Cell: (props) => (
          <div className="flex items-center justify-center aspect-square h-12 m-1 bg-white rounded-md overflow-clip">
            <img src={props.row.values["logo"]} className="object-cover" />
          </div>
        ),
      },
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Email",
        accessor: "emails",
        Cell: (props) =>
          props.row.values["emails"] ? (
            <ul>
              {props.row.values["emails"].map((email: string) => (
                <li key={email}>{email}</li>
              ))}
            </ul>
          ) : (
            <span className="italic text-neutral-400">no email provided</span>
          ),
      },
      {
        header: "Phone Numbers",
        accessor: "phone_numbers",
        Cell: (props) => (
          <ul>
            {props.row.values["phone_numbers"].map((phone: string) => (
              <li key={phone}>{phone}</li>
            ))}
          </ul>
        ),
      },
      {
        header: "Actions",
        accessor: "null",
        Cell: (props) => (
          <div className="flex">
            <ButtonLink
              className="aspect-square"
              href={`malls/${props.row.values["id"]}`}
            >
              <Eye size={16} strokeWidth={2} />
            </ButtonLink>
            <div className="w-1" />
            <ButtonLink
              className="aspect-square"
              href={`malls/${props.row.values["id"]}/edit`}
            >
              <Edit size={16} strokeWidth={2} />
            </ButtonLink>
            <div className="w-1" />
            <Button onClick={showModal} className="bg-red-500">
              <Trash2 size={16} strokeWidth={2} />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => malls, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <PageHeader>
        <h1 className="text-2xl font-bold uppercase">Malls</h1>
        <div className="grow" />
        <ButtonLink href="malls/create">Create Mall</ButtonLink>
      </PageHeader>
      <div className="w-full h-full max-w-5xl mx-auto overflow-auto">
        <table {...getTableProps()} className="w-full overflow-auto">
          <thead className="text-left uppercase text-sm bg-neutral-300 whitespace-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.getHeaderGroupProps().key}>
                {headerGroup.headers.map((column) => (
                  <th key={column.getHeaderProps().key} className="p-2">
                    {column.render("header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="whitespace-nowrap">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  key={row.getRowProps().key}
                  className="transition hover:bg-neutral-200"
                >
                  {row.cells.map((cell) => (
                    <td key={cell.getCellProps().key} className="py-1 px-2">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <DeleteModal innerRef={modalRef} onDelete={deleteMall} />
    </div>
  );
}
