import styles from './Chevron.module.css'

export default function Chevron({
  direction = 'left',
  onClick = () => {},
  disabled = false,
  classNames = ''
}){
  const directionStyle = direction === 'right'? styles.right: styles.left

  return (
    <span 
      onClick={disabled? null: onClick} 
      className={`${classNames} ${styles.chevron} ${directionStyle} ${disabled? styles.disabled: null} bg-gray-800 hover:bg-gray-700`}
    ></span>
  )
}