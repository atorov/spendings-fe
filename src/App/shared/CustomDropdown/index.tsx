import * as React from 'react'

interface IItem {
    value: number | string;
    displayValue?: string;
}

interface IProps {
    value: number | string;
    displayValue?: string | null;
    items: IItem[];
    style?: any,
    onSetValue: Function;
}

const CustomDropdown: React.FC<IProps> = (props: IProps) => {
    const [isOpened, setOpened] = React.useState(false)

    const displayValue = props.displayValue === null ? String(props.value) : props.displayValue

    return (
        <div style={{ display: 'inline-block', ...props.style }}>
            <button
                type="button"
                className={`w3-button w3-round ${isOpened ? 'w3-blue' : 'w3-pale-blue'} w3-hover-blue`}
                onClick={() => setOpened((prevState) => !prevState)}
            >
                {displayValue}
                &nbsp;
                <i className={`fas fa-caret-${isOpened ? 'up' : 'down'}`} />
            </button>
            <div
                className="w3-dropdown-content w3-bar-block w3-border"
                style={{ display: isOpened ? 'block' : 'none', maxHeight: 200, overflow: 'auto' }}
            >
                {props.items.map((item) => {
                    const itemDisplayValue = !item.displayValue ? String(item.value) : item.displayValue
                    return (
                        <button
                            key={item.value}
                            type="button"
                            className="w3-bar-item w3-button"
                            onClick={() => {
                                props.onSetValue(item.value)
                                setOpened(false)
                            }}
                        >
                            {itemDisplayValue}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

CustomDropdown.defaultProps = {
    displayValue: null,
    style: {},
}

export default CustomDropdown
