import * as React from 'react'

interface IProps {
    appStatus: string;
    setAppStatus: Function;
    setAuth: Function;
}

const Login: React.FC<IProps> = (props: IProps) => {
    const prevStatus = React.useRef(props.appStatus)

    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    const setAppStatus = props.setAppStatus
    React.useEffect(() => {
        if (props.appStatus === ':LOGIN:ERROR:' && prevStatus.current === ':LOGIN:ERROR:' && (name || password)) {
            setAppStatus(':LOGIN:READY:')
        }
        prevStatus.current = props.appStatus
    }, [name, password, props.appStatus, setAppStatus])

    return (
        <div className="w3-container">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <button
                    type="button"
                    className={`w3-card w3-margin w3-round w3-animate-opacity ${name !== 'Hans' ? 'w3-grayscale-max w3-opacity' : ''}`}
                    style={{
                        display: 'block',
                        width: 150,
                        border: 'none',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setName('Hans')
                        setPassword('')
                    }}
                >
                    <img src="img/hans.png" alt="User Hans" style={{ width: '100%' }} />
                    <h4 className="w3-center">
                        Hans
                    </h4>
                </button>
                <button
                    type="button"
                    className={`w3-card w3-margin w3-round w3-animate-opacity ${name !== 'Giuseppina' ? 'w3-grayscale-max w3-opacity' : ''}`}
                    style={{
                        display: 'block',
                        width: 150,
                        border: 'none',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setName('Giuseppina')
                        setPassword('')
                    }}
                >
                    <img src="img/giuseppina.png" alt="User Hans" style={{ width: '100%' }} />
                    <h4 className="w3-center">
                        Giuseppina
                    </h4>
                </button>
            </div>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()
                    event.stopPropagation()

                    setAppStatus(':LOGIN:PENDING:')
                    setName('')
                    setPassword('')

                    try {
                        const response = await fetch('https://uman-api-v1.herokuapp.com/api/auth', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, password }),
                        })
                        if (!response.ok) {
                            throw new Error(String(response.status))
                        }
                        const content = await response.json()
                        props.setAuth(content)
                        sessionStorage.setItem('spendings-fe', JSON.stringify(content))
                        setAppStatus(':MAIN:READY:')
                    }
                    catch (error) {
                        console.error(error)
                        setAppStatus(':LOGIN:ERROR:')
                    }
                }}
            >
                <p>
                    <label htmlFor="name">
                        Потребител
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            disabled={props.appStatus.endsWith(':PENDING:')}
                            className="w3-input"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Парола
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            disabled={props.appStatus.endsWith(':PENDING:')}
                            className="w3-input"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </p>
                {props.appStatus === ':LOGIN:READY:' && name && password ? (
                    <p className="w3-animate-zoom">
                        <button
                            type="submit"
                            className="w3-button w3-blue w3-round w3-block"
                        >
                            OK
                        </button>
                    </p>
                ) : null}
            </form>

            {props.appStatus === ':LOGIN:PENDING:' ? (
                <div className="w3-text-blue w3-center w3-animate-zoom fa-3x">
                    <i className="fas fa-cog fa-spin" />
                </div>
            ) : null}

            {props.appStatus === ':LOGIN:ERROR:' ? (
                <>
                    <div className="w3-text-red w3-center w3-center w3-animate-zoom fa-3x">
                        <i className="fas fa-bomb" />
                    </div>

                    <div className="w3-panel w3-red w3-center w3-round w3-card w3-animate-zoom">
                        <h3>Възникна грешка</h3>
                        <p>
                            Невярно потребителско име или парола
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Login
