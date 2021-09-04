import React, { FC } from 'react'
import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: FC<Props> = (props: Props) => (
  <div {...props} className={[Styles.spinner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
  </div>
)

export default Spinner
