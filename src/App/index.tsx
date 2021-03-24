import * as React from 'react'

import AddNewRecord from './AddNewRecord'
import Header from './Header'
import Login from './Login'
import CustomDropdown from './shared/CustomDropdown'

import './style.css'

interface IAuth {
    accessToken?: string;
    name?: string;
    role?: string;
    userId?: string;
}
interface IRecord {
    id: string;
    year: number;
    month: number;
    date: number;
    type: string;
    description?: string;
    amount: number;
    payedBy: string;
    willBePayedBy: string;
}

const MONTH_NAMES = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

function checkAuth(auth: IAuth) {
    return !!auth.accessToken && !!auth.name && ([':ADMIN:', ':SP_USER:'].includes(auth.role || ''))
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
        payedBy: Math.random() < 0.5 ? 'H' : 'G',
        // eslint-disable-next-line no-nested-ternary
        willBePayedBy: Math.random() < 0.33 ? 'H' : Math.random() < 0.5 ? 'G' : 'HG',
    }))
}

const App: React.FC = () => {
    const [status] = React.useState(':READY:' as ':READY:')
    const [auth, setAuth] = React.useState({} as IAuth)
    const isAuth = checkAuth(auth)
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
            <Header appStatus={status} isAuth={isAuth} />
            {(() => (!isAuth ? <Login setAuth={setAuth} /> : (
                <>
                    <ul className="w3-ul w3-card">
                        {filteredRecords.map((record) => (
                            <li key={record.id} className="w3-bar">
                                <img
                                    src={record.payedBy === 'H' ? 'img/hans.png' : 'img/giuseppina.png'}
                                    alt="TODO:"
                                    className="w3-bar-item w3-circle"
                                    style={{ width: 85 }}
                                />
                                <div className="w3-bar-item">
                                    <span className="w3-large">
                                        TODO:
                                    </span>
                                    <span className="w3-large">
                                        TODO:
                                    </span>
                                    <br />
                                    <span>
                                        TODO: Lorem ipsum.
                                    </span>
                                </div>
                                <span
                                    className="w3-bar-item w3-button w3-xlarge w3-right"
                                // onClick="this.parentElement.style.display='none'"
                                >
                                    &times;
                                </span>
                            </li>
                        ))}
                    </ul>
                    {
                        filteredRecords.map((record) => (
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
                        ))
                    }
                </>
            )))()}

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

            <hr />
            <AddNewRecord
                month={month}
                monthNames={MONTH_NAMES}
                year={year}
            />
            <hr />
        </>
    )
}

export default App
