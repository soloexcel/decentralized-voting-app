import Style from './Button.module.css'

const Button = ({ btnName, handleClick }) => {
  return (
    <div>
        <button className={Style.button} onClick={handleClick}>
            {btnName}
        </button>
    </div>
  )
}

export default Button