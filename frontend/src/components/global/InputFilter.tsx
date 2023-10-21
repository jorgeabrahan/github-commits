import type { ChangeEventHandler } from 'react'

export const InputFilter = ({
  handleInputChange,
  value
}: {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  value: string
}) => {
  return (
    <input
      className="px-4 py-2 rounded-lg border border-solid border-slate-700 my-3 ml-auto block bg-rich-black/75 backdrop-blur-sm backdrop-saturate-150"
      type="search"
      onChange={handleInputChange}
      value={value}
      autoComplete="off"
      spellCheck="false"
    />
  )
}
