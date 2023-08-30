export default ({ label, value, onChange }) => {
  return (
    <label>
      {label}
      <input type="checkbox" checked={value} onChange={()=>{onChange(label)}} />
    </label>
  )
}