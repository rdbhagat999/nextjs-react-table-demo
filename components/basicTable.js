import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'

import styles from '../styles/basicTable.module.css'

import { COLUMNS, GROUPED_COLUMNS } from './columns'
import MOCK_DATA from '../utils/MOCK_DATA.json'
import GlobalFilter from './globalFilter';
import ColumnFilter from './columnFilter';

function BasicTable() {

    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
    )

    const {
        getTableProps, getTableBodyProps,
        headerGroups, footerGroups, rows,
        prepareRow, state, setGlobalFilter } = tableInstance;
    
    const { globalFilter } = state;

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
                    {rows.map((row, i) => {
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
        </>
    );
}

export default BasicTable;