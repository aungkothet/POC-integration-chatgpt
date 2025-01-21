import styles from './Home.module.css'

export default function Loading() {
  return (
    <div className={styles.lds}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
