function ColumnFilter({ column }) {

    const { filterValue, setFilter } = column
    
    return (
        <p>
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
        </p>
    );
}

export default ColumnFilter;