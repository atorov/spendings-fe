import * as React from 'react'

interface IProps {
    month: number;
    monthNames: string[];
    year: number;
}

const AddNewRecord: React.FC<IProps> = (props: IProps) => {
    const [date, setDate] = React.useState(new Date().getDate())
    const [isDateMenuOpened, setDateMenuOpened] = React.useState(false)

    return (
        <div className="w3-border">
            <div>
                {props.year}
                &nbsp;
                {props.monthNames[props.month]}
                &nbsp;

                <button
                    type="button"
                    className="w3-button w3-round w3-pale-blue w3-hover-blue"
                    onClick={() => setDateMenuOpened((prevState) => !prevState)}
                >
                    {date < 10 ? `0${date}` : date}
                </button>
                {isDateMenuOpened ? (
                    <div
                        className="w3-bar-block w3-border w3-round"
                        style={{ maxHeight: 120, overflow: 'auto' }}
                    >
                        {Array(31).fill(null).map((_, idx) => (
                            <button
                                key={idx}
                                value={idx + 1}
                                type="button"
                                className="w3-button w3-bar w3-pale-blue w3-hover-blue"
                                onClick={() => {
                                    setDate(idx + 1)
                                    setDateMenuOpened(false)
                                }}
                            >
                                {String(idx + 1).length < 2 ? `0${idx + 1}` : idx + 1}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default AddNewRecord
