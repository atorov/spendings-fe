import * as React from 'react'

import AddNewRecord from './AddNewRecord'
import Header from './Header'
import Login from './Login'
import CustomDropdown from './shared/CustomDropdown'
import IAuth from './shared/interfaces/auth'

import './style.css'

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
    return new Promise((resolve) => setTimeout(() => resolve(Array(10).fill(null).map((_, idx) => ({
        id: String(idx),
        year,
        month,
        date: Math.ceil(Math.random() * 31),
        type: 'string',
        description: 'string',
        amount: Math.random() * 100,
        payedBy: Math.random() < 0.5 ? 'H' : 'G',
        // eslint-disable-next-line no-nested-ternary
        willBePayedBy: Math.random() < 0.33 ? 'H' : Math.random() < 0.5 ? 'G' : 'HG',
    }))), 1000))
}

const App: React.FC = () => {
    const [status, setStatus] = React.useState(':GET_STARTED:')
    const [auth, setAuth] = React.useState({} as IAuth)
    const isAuth = checkAuth(auth)
    const [year, setYear] = React.useState(new Date().getFullYear())
    const [month, setMonth] = React.useState(new Date().getMonth())

    const [records, setRecords] = React.useState([] as IRecord[])

    // Init
    React.useEffect(() => {
        if (status === ':GET_STARTED:') {
            setStatus(':INIT:PENDING:')
            const _authStr = sessionStorage.getItem('spendings-fe')
            if (_authStr) {
                try {
                    const _auth: IAuth = JSON.parse(_authStr)
                    setAuth(_auth)
                }
                catch (reason) {
                    console.warn(reason)
                }
            }
            setStatus(':MAIN:')
        }
    }, [status])

    React.useEffect(() => {
        if (!isAuth && status.startsWith(':MAIN:')) {
            setStatus(':LOGIN:')
        }
        else if (isAuth && status === ':LOGIN:READY:') {
            setStatus(':MAIN:')
        }
    }, [isAuth, status])

    React.useEffect(() => {
        if (isAuth) {
            (async () => {
                setStatus(':MAIN:PENDING:')
                try {
                    const _records = await getRecords(year, month)
                    setRecords(_records)
                    setStatus(':MAIN:READY:')
                }
                catch (error) {
                    setStatus(':MAIN:ERROR:')
                }
            })()
        }
    }, [isAuth, month, year])

    let content = null
    if (status.startsWith(':LOGIN:')) {
        content = (
            <Login
                appStatus={status}
                setAppStatus={setStatus}
                setAuth={setAuth}
            />
        )
    }
    else if (status.startsWith(':MAIN:')) {
        const filteredRecords = records
            .filter((record) => record.year === year && record.month === month)
            .sort((a, b) => {
                if (a.date > b.date) return 1
                if (a.date === b.date) return 0
                return -1
            })

        content = (
            <>
                <div className="w3-container w3-padding w3-center">
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

                {/* {
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
                } */}

                <hr />
                <AddNewRecord
                    auth={auth}
                    month={month}
                    monthNames={MONTH_NAMES}
                    year={year}
                />
                <hr />

                <br />
            </>
        )
    }
    else {
        content = (
            <div className="w3-panel w3-orange w3-center w3-round w3-card w3-animate-zoom">
                <h3>Възникна грешка</h3>
                <p>
                    ... и как по-точно се озова тук?!
                </p>
            </div>
        )
    }

    console.log('TODO: status:', status)
    console.log('TODO: auth:', auth)
    console.log('TODO: isAuth:', isAuth)
    return (
        <>
            <Header appStatus={status} />
            {content}
        </>
    )
}

export default App
