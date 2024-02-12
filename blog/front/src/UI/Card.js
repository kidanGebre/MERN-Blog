import React from 'react'
import css from "./Card.module.css"
function Card ({ children }) {
    return (
        <div className={css.Card}>
            {children}
        </div>
    )
}

export default Card