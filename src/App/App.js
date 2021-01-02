import {Setup} from '../Setup/Setup'
import {useCallback, useState} from 'react'
import {useSharedSecret} from "./SharedSecret.hook"
import {useGenerateTotp} from "./TotpGenerator.hook"
import {Totp} from '../Totp/Totp'

function App() {
    let sharedSecret = useSharedSecret()
    let generateTotp = useGenerateTotp()

    let [storedSharedSecretKey, setStoredSharedSecretKey] = useState(sharedSecret.get())
    let [decryptedSharedSecretKey, setDecryptedSharedSecretKey] = useState(null)

    const onUnlock = useCallback((password) => {
        setDecryptedSharedSecretKey(sharedSecret.decrypt(storedSharedSecretKey, password))
    }, [sharedSecret, storedSharedSecretKey])

    const generateCode = useCallback(() => {
        return generateTotp(decryptedSharedSecretKey)
    }, [generateTotp, decryptedSharedSecretKey])

    const onShareSecretSave = useCallback((sharedSecretData) => {
        let encryptedSharedSecretKey = sharedSecret.encrypt(sharedSecretData.sharedSecret, sharedSecretData.passCode)

        sharedSecret.store(encryptedSharedSecretKey)
        setStoredSharedSecretKey(encryptedSharedSecretKey)
        setDecryptedSharedSecretKey(sharedSecretData.sharedSecret)
    }, [sharedSecret])

    return !!storedSharedSecretKey ?
        <Totp onUnlock={onUnlock} isLocked={!decryptedSharedSecretKey} generateCode={generateCode}/> :
        <Setup onSave={onShareSecretSave}/>
}



export default App;
