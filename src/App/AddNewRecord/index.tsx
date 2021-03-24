import * as React from 'react'

import CustomDropdown from '../shared/CustomDropdown'
import IAuth from '../shared/interfaces/auth'

interface IProps {
    auth: IAuth,
    month: number;
    monthNames: string[];
    year: number;
}

const AddNewRecord: React.FC<IProps> = (props: IProps) => {
    const [date, setDate] = React.useState(new Date().getDate())
    const [payedBy, setPayedBy] = React.useState((props.auth.name || '')[0])
    const [willBePayedBy, setWillBePayedBy] = React.useState('HG')

    return (
        <div className="w3-container">
            <p className="w3-large">
                Въведи нов запис за:
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ minWidth: 120, width: 120 }}>
                    {props.year}
                    &nbsp;
                    {props.monthNames[props.month]}
                </p>
                <CustomDropdown
                    value={date}
                    displayValue={date < 10 ? `0${date}` : String(date)}
                    items={Array(31).fill(null).map((_, idx) => ({ value: idx + 1, displayValue: idx + 1 < 10 ? String(`0${idx + 1}`) : String(idx + 1) }))}
                    style={{ display: 'block' }}
                    onSetValue={setDate}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ minWidth: 120, width: 120 }}>
                    Платено от:
                </p>
                <CustomDropdown
                    value={payedBy ?? ''}
                    displayValue={{
                        H: 'Hans',
                        G: 'Giuseppina',
                    }[payedBy]}
                    items={[
                        {
                            value: 'H',
                            displayValue: 'Hans',
                        },
                        {
                            value: 'G',
                            displayValue: 'Giuseppina',
                        },
                    ]}
                    style={{ display: 'block' }}
                    onSetValue={setPayedBy}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ minWidth: 120, width: 120 }}>
                    Ще се плати от:
                </p>
                <CustomDropdown
                    value={willBePayedBy ?? ''}
                    displayValue={{
                        H: 'Hans',
                        G: 'Giuseppina',
                        HG: 'H&G',
                    }[willBePayedBy]}
                    items={[
                        {
                            value: 'H',
                            displayValue: 'Hans',
                        },
                        {
                            value: 'G',
                            displayValue: 'Giuseppina',
                        },
                        {
                            value: 'HG',
                            displayValue: 'H&G',
                        },
                    ]}
                    style={{ display: 'block' }}
                    onSetValue={setWillBePayedBy}
                />
            </div>
        </div>
    )
}

export default AddNewRecord
