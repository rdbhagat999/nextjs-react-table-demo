import 'regenerator-runtime/runtime'

import { useState } from "react";
import { useAsyncDebounce } from "react-table";


function GlobalFilter({ filter, setFilter }) {

    const [value, setValue] = useState(filter)

    const onChangeFn = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 500)

    return (
        <p>
            <span>Global Client-side Search {' '}</span>
            <input value={value || ''} onChange={e => {
                setValue(e.target.value)
                onChangeFn(e.target.value)
            }} />
        </p>
    );
}

export default GlobalFilter;