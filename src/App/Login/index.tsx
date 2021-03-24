import * as React from 'react'

interface IProps {
    setAuth: Function;
}

const Login: React.FC<IProps> = (props: IProps) => {
    const [status, setStatus] = React.useState(':READY:' as ':READY:' | ':PENDING:' | ':ERROR:')
    const prevStatus = React.useRef(status)

    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    React.useEffect(() => {
        if (status === ':ERROR:' && prevStatus.current === ':ERROR:' && (name || password)) {
            setStatus(':READY:')
        }
        prevStatus.current = status
    }, [name, password, status])

    return (
        <div className="w3-container">
            <form
                onSubmit={async (event) => {
                    event.preventDefault()
                    event.stopPropagation()

                    setStatus(':PENDING:')
                    setName('')
                    setPassword('')

                    try {
                        const response = await fetch('https://uman-api-v1.herokuapp.com/api/auth', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name, password }),
                        })
                        if (!response.ok) {
                            throw new Error(String(response.status))
                        }
                        const content = await response.json()
                        setStatus(':READY:')
                        props.setAuth(content)
                    }
                    catch (error) {
                        setStatus(':ERROR:')
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
                            disabled={![':READY:', ':ERROR:'].includes(status)}
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
                            disabled={![':READY:', ':ERROR:'].includes(status)}
                            className="w3-input"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </p>
                {status === ':READY:' && name && password ? (
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

            {status === ':PENDING:' ? (
                <div className="w3-text-blue w3-center w3-animate-zoom fa-3x">
                    <i className="fas fa-cog fa-spin" />
                </div>
            ) : null}

            {status === ':ERROR:' ? (
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
