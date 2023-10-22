import type { ChangeEventHandler } from 'react'

export const InputDateFilter = ({
  handleInputChange,
  value,
  id,
  label,
  min = '2023-10-01'
}: {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  value: string,
  id: string,
  label: string,
  min?: string
}) => {
  return (
    <div className="grid bg-rich-black/75 backdrop-blur-sm backdrop-saturate-150 px-4 py-2 rounded-lg gap-2 border border-solid border-slate-700">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="bg-transparent cursor-pointer"
        type="date"
        name={id}
        id={id}
        min={min}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}
