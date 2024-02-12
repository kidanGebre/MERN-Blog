import { createContext, useState } from "react";

export const replyContext = createContext(null)

export const ReplyProvider = ({ children }) => {
    const [ replies, setReplies ] = useState(null)
    return (
        <replyContext.Provider value={{ replies,setReplies}}>
            {children}
        </replyContext.Provider>
    )
}