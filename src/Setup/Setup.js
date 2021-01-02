import styles from './Setup.module.css'
import {useState, useCallback, useEffect} from 'react'

export function Setup({onSave}) {
    const [sharedSecret, setSharedSecret] = useState('')
    const [passCode, setPassCode] = useState('')
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)

    const onSaveClicked = useCallback(() => onSave({sharedSecret, passCode}), [onSave, sharedSecret, passCode])

    useEffect(() => {
        setSaveButtonDisabled(sharedSecret.length <= 0 || passCode.length < 4)
    }, [sharedSecret, passCode])

    return (
        <div className={styles.container}>
            <span>Shared secret</span>
            <input type="text"
               placeholder="Type a shared secret"
               value={sharedSecret}
               onChange={e => setSharedSecret(e.target.value)}
            />

            <span>Pass code (min 4 character)</span>
            <input type="password"
               maxLength={4}
               value={passCode}
               placeholder="Type a passcode"
               onChange={e => setPassCode(e.target.value)}
            />
            <button disabled={saveButtonDisabled} onClick={onSaveClicked}>Save</button>
        </div>
    )
}
