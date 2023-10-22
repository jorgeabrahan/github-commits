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
    <div className="grid bg-rich-black/75 backdrop-blur-sm backdrop-saturate-150 px-4 py-4 rounded-lg gap-1 border border-solid border-slate-700">
      <label className="text-sm text-slate-200" htmlFor={id}>{label}</label>
      <input
        className="bg-transparent cursor-pointer px-2 py-1 border border-solid border-slate-700 rounded-md focus:outline-none"
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
