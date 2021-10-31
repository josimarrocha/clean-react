import React, { FC } from 'react'

type Props = {
  text: string
  disabled: boolean
}

const Input: FC<Props> = ({ text, disabled }: Props) => {
  return (
    <button data-testid="submit" disabled={disabled} type="submit">{text}</button>
  )
}

export default Input
