import * as React from 'react'

interface IProps {
    appStatus: string;
    isAuth: boolean;
}

const Header: React.FC<IProps> = (props: IProps) => (
    <header
        className="w3-container w3-blue"
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        <h3 className="w3-bar">
            Месечен отчет
        </h3>
        {props.isAuth ? (
            <div>
                {{
                    ':READY:': <i className="fas fa-check fa-2x w3-text-green" />,
                    ':PENDING:': <i className="fas fa-cog fa-spin fa-2x" />,
                    ':ERROR:': <i className="fas fa-bomb fa-2x w3-text-red" />,
                }[props.appStatus]}
            </div>
        ) : null}
    </header>
)

export default Header
