import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, } from 'react-table'

import styles from '../styles/basicTable.module.css'

import { COLUMNS, GROUPED_COLUMNS } from './columns'
// import MOCK_DATA from '../utils/MOCK_DATA.json'
import GlobalFilter from './globalFilter';
import ColumnFilter from './columnFilter';
import Checkbox from './Checkbox';

function BasicTable({MOCK_DATA}) {

    const columns = useMemo(() => GROUPED_COLUMNS, [])
    // const data = useMemo(() => MOCK_DATA, [])
    const data = MOCK_DATA
    
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                pageIndex: 0
            }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push(cols => {
                return [
                    {
                        id: 'selection',
                        // eslint-disable-next-line react/display-name
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...cols,
                ]
            })
        }
    )

    const {
        getTableProps, getTableBodyProps,
        headerGroups, footerGroups, rows,
        page, pageOptions, pageCount, gotoPage,
        setPageSize, nextPage, previousPage,
        canNextPage, canPreviousPage,
        prepareRow, state, setGlobalFilter,
        selectedFlatRows,
    } = tableInstance;
    
    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {headerGroups.map((hg, i) => (<tr key={i} {...hg.getHeaderGroupProps()}>
                        {hg.headers.map((column, index) => <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}
                            </span>
                            <div>
                                {column.canFilter ? column.render('Filter') : null}
                            </div>
                        </th>) }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        
                        return (<tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>) }
                        </tr>)

                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((fg, i) => (<tr key={i} {...fg.getFooterGroupProps()}>
                        {fg.headers.map((column, index) => <th key={index} {...column.getFooterProps()}>
                            { column.render('Footer')}
                        </th>) }
                        </tr>
                    ))}
                </tfoot>
            </table>
            <div className={styles.pagination}>
                <span>
                    Page
                    {' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    {' '}
                </span>
                <div className={styles.buttons}>
                    <select value={pageSize} onChange={e => setPageSize(Number(event.target.value))}>
                        {
                            [10, 30, 50, 100].map(page => (<option key={page} value={page}>
                                Show {page}
                            </option>))
                        }
                    </select>
                    <button onClick={() => gotoPage(0)} disabled={ !canPreviousPage }> {'<<'} </button>
                    <button onClick={previousPage} disabled={ !canPreviousPage }>Previous</button>
                    <button onClick={nextPage} disabled={ !canNextPage }>Next</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={ !canNextPage }> {'>>'} </button>
                </div>
            </div>
            
        </>
    );
}

export default BasicTable;