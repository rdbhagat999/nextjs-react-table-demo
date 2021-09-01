import { format } from 'date-fns'
// import ColumnFilter from './columnFilter';

export const COLUMNS = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
/*         Filter: ColumnFilter, */
        disableFilters: true,
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
/*         Filter: ColumnFilter, */
        disableFilters: true,
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
/*         Filter: ColumnFilter, */
        disableFilters: true,
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
/*         Filter: ColumnFilter, */
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
/*         Filter: ColumnFilter, */
        Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy'),
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
/*         Filter: ColumnFilter, */
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
/*         Filter: ColumnFilter, */
    },
]

export const GROUPED_COLUMNS = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
/*         Filter: ColumnFilter, */
        disableFilters: true,
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name',
        /*         Filter: ColumnFilter, */
                disableFilters: true,
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name',
        /*         Filter: ColumnFilter, */
                disableFilters: true,
            },
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Email',
                Footer: 'Email',
                accessor: 'email',
        /*         Filter: ColumnFilter, */
            },
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'date_of_birth',
        /*         Filter: ColumnFilter, */
                Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy')
            },
            {
                Header: 'Country',
                Footer: 'Country',
                accessor: 'country',
        /*         Filter: ColumnFilter, */
            },
            {
                Header: 'Phone',
                Footer: 'Phone',
                accessor: 'phone',
        /*         Filter: ColumnFilter, */
            },
        ]
    },
]