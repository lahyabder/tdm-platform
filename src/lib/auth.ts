const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
    const keyData = encoder.encode(secret);
    return crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'tdm_platform_super_secure_secret_fallback_key_2026';

export async function signSession(username: string): Promise<string> {
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 week
    const payload = JSON.stringify({ username, expires });
    const key = await getCryptoKey(JWT_SECRET);
    const signatureBuffer = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(payload)
    );
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const payloadBase64 = Buffer.from(payload).toString('base64');
    return `${payloadBase64}.${signatureHex}`;
}

export async function verifySession(token: string): Promise<{ username: string; expires: number } | null> {
    try {
        const parts = token.split('.');
        if (parts.length !== 2) return null;
        
        const payloadBase64 = parts[0];
        const signatureHex = parts[1];
        
        const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const payload = JSON.parse(payloadStr);
        
        if (payload.expires < Date.now()) {
            return null; // Expired
        }
        
        const key = await getCryptoKey(JWT_SECRET);
        const signatureBytes = new Uint8Array(
            signatureHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
        );
        
        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            signatureBytes,
            encoder.encode(payloadStr)
        );
        
        return isValid ? payload : null;
    } catch (e) {
        return null;
    }
}
