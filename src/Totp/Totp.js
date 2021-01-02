import styles from './Totp.module.css'
import {useState, useEffect} from 'react'

export function Totp({onUnlock, isLocked, generateCode}) {
    let [passCode, setPassCode] = useState('')
    let [code, setCode] = useState('')

    useEffect(() => {
        let generateInterval = null

        if (!isLocked) {
            setCode(generateCode())

            generateInterval = setInterval(() => {
                setCode(generateCode())
            }, 1000)
        }

        return () => generateInterval ? clearInterval(generateInterval) : null
    }, [isLocked, generateCode])

    return (
        isLocked ?
            <div className={styles.locker}>
                <input type="password"
                       maxLength={4}
                       placeholder="Type a passcode"
                       value={passCode}
                       onChange={e => setPassCode(e.target.value)}
                />
                <button disabled={passCode.length < 4} onClick={_ => onUnlock(passCode)}>Unlock</button>
            </div>
            :
            <div className={styles.code}>
                <span>{code}</span>
            </div>
    )
}
