import type { ChangeEventHandler } from 'react'

export const LabeledInputFilter = ({
  handleInputChange,
  value,
  id,
  label
}: {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  value: string,
  id: string,
  label: string
}) => {
  return (
    <div className='grid bg-rich-black/75 backdrop-blur-sm backdrop-saturate-150 px-4 py-4 rounded-lg gap-1 border border-solid border-slate-700'>
      <label className='text-sm text-slate-200' htmlFor={id}>{label}</label>
      <input
        className="bg-transparent cursor-pointer focus:outline-none px-2 py-1 border border-solid border-slate-700 rounded-md"
        type="search"
        id={id}
        name={id}
        onChange={handleInputChange}
        value={value}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  )
}
