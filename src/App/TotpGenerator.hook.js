import SteamTotp from 'steam-totp'

export function useGenerateTotp() {
    return function generateTotp(sharedSecret) {
        return SteamTotp.generateAuthCode(sharedSecret)
    }
}
