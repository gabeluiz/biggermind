import React from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from "react-table";
import regeneratorRuntime from "regenerator-runtime";

export default function CardTable({ color, data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "Telefone",
        accessor: "telefone",
      },
      {
        Header: "Mensagem",
        accessor: "mensagem",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (

    <>
      <div className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-gray-800 text-white")}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                Clientes
              </h3>
            </div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-gray-100 text-gray-600 border-gray-200"
                        : "bg-gray-700 text-gray-300 border-gray-600")
                    } {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-gray-100 text-gray-600 border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                Página <strong> {pageIndex + 1} de {pageOptions.length}</strong>
                <span className="font-medium"></span>
                {' | '}
                Escolha a página:{'  '}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                  }}
                  className="px-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-16 ease-linear transition-all duration-150"
                />
                {'  '}
                <select
                  className="px-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-20 ease-linear transition-all duration-150"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Mostrar {pageSize}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                <ul className="flex pl-0 rounded list-none flex-wrap">
                  <li>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                      <i className="fas fa-chevron-left -ml-px"></i>
                      <i className="fas fa-chevron-left -ml-px"></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                      <i className="fas fa-chevron-left -ml-px"></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                      <i className="fas fa-chevron-right -mr-px"></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                      <i className="fas fa-chevron-right -mr-px"></i>
                      <i className="fas fa-chevron-right -mr-px"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Procurar:{' '}
      <input
        className="px-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-20 ease-linear transition-all duration-150"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} registros...`}
      />
    </span>
  )
}