import { React } from 'react'

const Input = (props) => {
    let { value, type, name, placeholder, className, handleInput } = props

    return (
        <div>
            <input
                name={name}
                type={type}
                onBlur={handleInput}
                className={className}
                placeholder={placeholder}
                defaultValue={value}   
            />
        </div>
    )
}

export default Input