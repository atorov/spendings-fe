import * as React from 'react'

import AddNewRecord from './AddNewRecord'

import './style.css'

interface IRecord {
    id: string;
    year: number;
    month: number;
    date: number;
    type: string;
    description?: string;
    amount: number;
    madeBy: string;
    willBePayedBy: string;
}

const MONTH_NAMES = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

async function getRecords(year: number, month: number): Promise<IRecord[]> {
    console.log('::: TODO:', year, month)
    return Array(10).fill(null).map((_, idx) => ({
        id: String(idx),
        year: 2021,
        month: 2,
        date: Math.ceil(Math.random() * 31),
        type: 'string',
        description: 'string',
        amount: Math.random() * 100,
        madeBy: 'string',
        willBePayedBy: 'string',
    }))
}

const App: React.FC = () => {
    const [year, setYear] = React.useState(new Date().getFullYear())
    const [month, setMonth] = React.useState(new Date().getMonth())

    const [records, setRecords] = React.useState([] as IRecord[])

    React.useEffect(() => {
        (async () => setRecords(await getRecords(year, month)))()
    }, [month, year])

    React.useEffect(() => {
        console.log('::: TODO: records', records)
    }, [records])

    const filteredRecords = records
        .filter((record) => record.year === year && record.month === month)
        .sort((a, b) => {
            if (a.date > b.date) return 1
            if (a.date === b.date) return 0
            return -1
        })

    return (
        <>
            <label htmlFor="year">
                Година:&nbsp;
                <select id="year" value={year} onChange={(event) => setYear(Number(event.target.value))}>
                    {Array(10).fill(null).map((_, idx) => (
                        <option key={idx} value={idx + 2020}>
                            {idx + 2020}
                        </option>
                    ))}
                </select>
            </label>
            &nbsp;
            <label htmlFor="month">
                Месец:&nbsp;
                <select id="month" value={month} onChange={(event) => setMonth(+event.target.value)}>
                    {MONTH_NAMES.map((monthName, idx) => (
                        <option key={idx} value={idx}>
                            {monthName}
                        </option>
                    ))}
                </select>
            </label>
            <br />

            {filteredRecords.map((record) => (
                <p key={record.id}>
                    {JSON.stringify(record, null, 2)}
                    &nbsp;
                    <button
                        type="button"
                        className="w3-button w3-round w3-pale-red w3-hover-red"
                        onClick={() => setRecords((prevRecords) => prevRecords.filter((prevRecord) => prevRecord.id !== record.id))}
                    >
                        <i className="fas fa-trash" />
                    </button>
                </p>
            ))}

            <AddNewRecord
                month={month}
                monthNames={MONTH_NAMES}
                year={year}
            />
        </>
    )
}

export default App
