import * as React from 'react'

import CustomDropdown from '../shared/CustomDropdown'

interface IProps {
    month: number;
    monthNames: string[];
    year: number;
}

const AddNewRecord: React.FC<IProps> = (props: IProps) => {
    const [date, setDate] = React.useState(new Date().getDate())

    const displayDate = date < 10 ? `0${date}` : String(date)

    return (
        <div className="w3-container">
            <div>
                {props.year}
                &nbsp;
                {props.monthNames[props.month]}
                &nbsp;

                <CustomDropdown
                    value={date}
                    displayValue={displayDate}
                    items={Array(31).fill(null).map((_, idx) => ({ value: idx + 1, displayValue: idx + 1 < 10 ? String(`0${idx + 1}`) : String(idx + 1) }))}
                    onSetValue={setDate}
                />
            </div>

            <br />
            <br />
            <br />
            <hr />
            <br />
        </div>
    )
}

export default AddNewRecord
