import { React } from 'react'

const Input = (props) => {
    let { name, placeholder, className, handleInput } = props

    return (
        <div>
            <input
                name={name}
                onBlur={handleInput}
                className={className}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input