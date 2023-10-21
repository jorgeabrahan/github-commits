import { useState, type ReactNode, useRef } from 'react'
import { monthNumberToString } from '../../helpers'

export const CommitAccordion = ({
  commitGroupDate,
  children
}: {
  commitGroupDate: Date
  children: ReactNode
}) => {
  const iconRef = useRef<HTMLSpanElement>(null)
  const accordionRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const handleAccordionToggle = () => {
    if (iconRef?.current === null || accordionRef?.current === null) return
    setIsOpen(accordionRef?.current?.open)
    if (!accordionRef?.current?.open) {
      iconRef.current.style.transform = ''
      return
    }
    iconRef.current.style.transform = 'rotate(180deg)'
  }
  return (
    <details className="relative my-5" open={isOpen} ref={accordionRef}>
      <summary className="mb-3 flex justify-between items-center [&>*]:pointer-events-none cursor-pointer" onClick={handleAccordionToggle}>
        <h2>
          Commits on {monthNumberToString(commitGroupDate.getMonth())} {commitGroupDate.getDate()},{' '}
          {commitGroupDate.getFullYear()}
        </h2>
        <span className="material-symbols-outlined" ref={iconRef}>expand_less</span>
      </summary>
      {children}
    </details>
  )
}
