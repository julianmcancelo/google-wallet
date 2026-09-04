/**
 * @file decodificador.ts
 * @description Decodificador universal de códigos y URLs escaneadas desde Google Wallet.
 */

export interface CodigoDecodificado {
  /** El código limpio / token extraído */
  codigoLimpio: string;
  /** Tipo de formato detectado */
  formato: 'jwt_wallet' | 'objeto_wallet' | 'prefijo_sigic' | 'url' | 'directo';
  /** Token original si se pudo extraer */
  tokenOriginal?: string;
  /** ID de objeto Google Wallet si estaba presente */
  objetoId?: string;
}

function decodificarBase64Seguro(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const relleno = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(relleno, 'base64').toString('utf-8');
    }
    if (typeof atob !== 'undefined') {
      return decodeURIComponent(
        atob(relleno)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    }
  } catch {
    // Retorno seguro en caso de formato inválido
  }
  return '';
}

/**
 * Decodifica cualquier código o URL proveniente de Google Wallet, cámaras o escáneres.
 */
export function decodificarCodigoGoogleWallet(entrada: string): CodigoDecodificado {
  const texto = String(entrada || '').trim();

  // 1. URL de guardado de Google Wallet: pay.google.com/gp/v/save/<jwt>
  if (texto.includes('pay.google.com/gp/v/save/')) {
    const jwtParte = texto.split('pay.google.com/gp/v/save/')[1]?.split(/[?#&]/)[0] || '';
    if (jwtParte.includes('.')) {
      try {
        const payloadBase64 = jwtParte.split('.')[1];
        const payloadJson = decodificarBase64Seguro(payloadBase64);
        if (payloadJson) {
          const payload = JSON.parse(payloadJson);
          
          // Buscar barcode value en tickets de eventos, credenciales o fidelidad
          const objetos = payload?.payload?.eventTicketObjects 
            || payload?.payload?.genericObjects 
            || payload?.payload?.loyaltyObjects 
            || [];
            
          if (objetos.length > 0) {
            const primer = objetos[0];
            const valorBarcode = primer?.barcode?.value;
            const codigoReserva = primer?.reservationInfo?.confirmationCode;
            const objetoId = primer?.id;
            const valorFinal = valorBarcode || codigoReserva;
            if (valorFinal) {
              const limpio = valorFinal.replace(/^SIGIC:/i, '').trim();
              return { codigoLimpio: limpio, formato: 'jwt_wallet', tokenOriginal: limpio, objetoId };
            }
          }
        }
      } catch {
        // Fallback si falla decodificar base64 o JSON
      }
    }
  }

  // 2. Prefijo común institucional: SIGIC:<token>
  if (texto.toUpperCase().startsWith('SIGIC:')) {
    const limpio = texto.slice(6).trim();
    return { codigoLimpio: limpio, formato: 'prefijo_sigic', tokenOriginal: limpio };
  }

  // 3. Identificador de objeto Google Wallet: 3388...sigic-ceremonia-token o 3388...sigic_cer_1_token
  if (/sigic[_-]/i.test(texto)) {
    const partes = texto.split(/[_-]/);
    const ultimo = partes[partes.length - 1];
    return { codigoLimpio: ultimo, formato: 'objeto_wallet', objetoId: texto, tokenOriginal: ultimo };
  }

  // 4. Parámetro token en URL: ?token=XYZ
  if (texto.includes('token=')) {
    const match = texto.match(/[?&]token=([^&]+)/i);
    if (match && match[1]) {
      const limpio = decodeURIComponent(match[1]).trim();
      return { codigoLimpio: limpio, formato: 'url', tokenOriginal: limpio };
    }
  }

  return { codigoLimpio: texto, formato: 'directo', tokenOriginal: texto };
}
