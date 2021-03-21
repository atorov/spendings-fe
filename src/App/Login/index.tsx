import * as React from 'react'

interface IProps {

}

const Login: React.FC<IProps> = (props: IProps) => {
    console.log('::: TODO:', props)

    const [status] = React.useState(':READY:' as ':READY:' | ':PENDING:' | ':ERROR:')
    console.log('::: TODO:', status)

    return (
        <div className="w3-container">
            <form className="w3-animate-zoom">
                <p>
                    <label htmlFor="user">
                        Потребител
                        <input id="user" type="text" className="w3-input" />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Парола
                        <input id="password" type="password" className="w3-input" />
                    </label>
                </p>
                <p>
                    <button type="button" className="w3-button w3-blue w3-round w3-block">
                        Хайде, давай
                    </button>
                </p>
            </form>

            <div className="w3-text-blue w3-center w3-animate-zoom fa-3x">
                <i className="fas fa-cog fa-spin" />
            </div>

            <div className="w3-panel w3-blue w3-center w3-round w3-card w3-animate-zoom">
                <p>Бжът-бжъът-бжжт...</p>
            </div>

            <div className="w3-text-red w3-center w3-center w3-animate-zoom fa-3x">
                <i className="fas fa-bomb" />
            </div>

            <div className="w3-panel w3-red w3-center w3-round w3-card w3-animate-zoom">
                <h3>Тц! Не стана...</h3>
                <p>
                    И какво правим сега?
                </p>
            </div>

        </div>
    )
}

export default Login
