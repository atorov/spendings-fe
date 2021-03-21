import * as React from 'react'

import AddNewRecord from './AddNewRecord'
import CustomDropdown from './shared/CustomDropdown'

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
        <div className="w3-container">
            <hr />
            <div className="w3-container">
                <CustomDropdown
                    value={year}
                    items={Array(10).fill(null).map((_, idx) => ({ value: idx + 2020 }))}
                    onSetValue={setYear}
                />
                &nbsp;
                <CustomDropdown
                    value={month}
                    displayValue={MONTH_NAMES[month]}
                    items={MONTH_NAMES.map((monthName, idx) => ({ value: idx, displayValue: monthName }))}
                    onSetValue={setMonth}
                />
            </div>
            <hr />

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

            <hr />
            <AddNewRecord
                month={month}
                monthNames={MONTH_NAMES}
                year={year}
            />
            <hr />
        </div>
    )
}

export default App
