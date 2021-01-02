import {AES, enc} from 'crypto-js'

export function useSharedSecret() {
    // const padPassword = pwd => Array(8).fill(pwd).join``

    return {
        get: () => localStorage.getItem('sharedSecret'),
        reset: () => localStorage.removeItem('sharedSecret'),
        store: (encryptedSharedSecretKey) => localStorage.setItem('sharedSecret', encryptedSharedSecretKey),
        encrypt: (sharedSecret, password) => AES.encrypt(sharedSecret, password),
        decrypt: (encryptedSharedSecretKey, password) => enc.Utf8.stringify(AES.decrypt(encryptedSharedSecretKey, password))
    }
}
