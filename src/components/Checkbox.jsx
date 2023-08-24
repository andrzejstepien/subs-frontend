export default ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={()=>{onChange(label)}} />
      {label}
    </label>
  )
}