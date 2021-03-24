import * as React from 'react'

interface IProps {
    appStatus: string;
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
            Месечени разходи
        </h3>
        <div>
            {props.appStatus.endsWith(':READY:') ? <i className="fas fa-check fa-2x w3-text-green" /> : null}
            {props.appStatus.endsWith(':PENDING:') ? <i className="fas fa-cog fa-spin fa-2x" /> : null}
            {props.appStatus.endsWith(':ERROR:') ? <i className="fas fa-bomb fa-2x w3-text-red" /> : null}
        </div>
    </header>
)

export default Header
