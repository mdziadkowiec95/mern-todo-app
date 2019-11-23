import React from 'react'
import styles from './Dropdown.module.scss'

const Dropdown = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.button}>Dropdown</div>
            <div>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown