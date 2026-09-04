import { describe, it } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { 
  BilleteraGoogle, 
  GoogleWallet, 
  decodificarCodigoGoogleWallet,
  normalizarClavePrivada,
  formatearIdCompleto,
  normalizarCodigoBarras,
  normalizarFechaIso
} from '../dist/index.js';

// Función auxiliar para leer el payload interno de un JWT
function decodificarJwtPayload(jwt: string) {
  const parte = jwt.split('.')[1];
  const str = Buffer.from(parte, 'base64').toString('utf-8');
  return JSON.parse(str);
}

// Generar par de claves RSA para los tests locales
const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

describe('SDK @jcancelo/google-wallet', () => {
  const emisorId = '3388000000022289454';
  const correoCliente = 'wallet-service@project.iam.gserviceaccount.com';
  const clavePrivada = privateKey;

  const wallet = new BilleteraGoogle({
    emisorId,
    correoCliente,
    clavePrivada
  });

  describe('Instanciación y Validación', () => {
    it('debe instanciar BilleteraGoogle correctamente', () => {
      assert.ok(wallet instanceof BilleteraGoogle);
      assert.strictEqual(GoogleWallet, BilleteraGoogle);
    });

    it('debe arrojar error si faltan credenciales requeridas', () => {
      assert.throws(() => new BilleteraGoogle({ emisorId: '', correoCliente: 'a', clavePrivada: 'b' }), /emisorId/);
      assert.throws(() => new BilleteraGoogle({ emisorId: '1', correoCliente: '', clavePrivada: 'b' }), /correoCliente/);
      assert.throws(() => new BilleteraGoogle({ emisorId: '1', correoCliente: 'a', clavePrivada: '' }), /clavePrivada/);
    });
  });

  describe('Creación de Pases de Eventos (EventTicket)', () => {
    it('debe generar URL y JWT válidos para un evento', () => {
      const resultado = wallet.crearPaseEvento({
        clase: {
          id: 'concierto_2026',
          nombreEvento: 'Rock Fest 2026',
          nombreOrganizador: 'Productora Test',
          fechaInicio: '2026-11-20T21:00:00Z',
          mensajes: [
            { encabezado: 'Aviso importante', cuerpo: 'Llegar 1 hora antes' }
          ]
        },
        pase: {
          idObjeto: 'ticket_100',
          nombreTitular: 'Juan Perez',
          tipoEntrada: 'Graduado',
          codigoReserva: 'RES-9988',
          codigoBarras: 'TICKET-100',
          ubicacion: {
            sector: 'Platea A',
            fila: '4',
            asiento: '12'
          },
          mensajes: [
            { encabezado: 'Ingreso por Puerta 2', cuerpo: 'Presentar credencial' }
          ]
        }
      });

      assert.ok(resultado.urlGuardar.startsWith('https://pay.google.com/gp/v/save/'));
      assert.ok(resultado.tokenJwt.length > 50);
      assert.strictEqual(resultado.idObjetoCompleto, `${emisorId}.ticket_100`);

      // Validar estructura interna de datos en el JWT
      const jwtData = decodificarJwtPayload(resultado.tokenJwt);
      const clase = jwtData.payload.eventTicketClasses[0];
      const objeto = jwtData.payload.eventTicketObjects[0];

      assert.strictEqual(clase.messages[0].header, 'Aviso importante');
      assert.strictEqual(objeto.ticketType.defaultValue.value, 'Graduado');
      assert.strictEqual(objeto.reservationInfo.confirmationCode, 'RES-9988');
      assert.strictEqual(objeto.messages[0].header, 'Ingreso por Puerta 2');
    });
  });

  describe('Creación de Credenciales Genéricas (GenericPass)', () => {
    it('debe generar URL y JWT para una credencial de socio con foto y mensajes', () => {
      const resultado = wallet.crearPaseGenerico({
        clase: {
          id: 'credencial_socio',
          nombreEmisor: 'Club Deportivo'
        },
        pase: {
          idObjeto: 'socio_45',
          tituloTarjeta: 'Carnet Oficial',
          encabezado: 'Maria Gomez',
          subencabezado: 'Socia Activa',
          fotoTitularUrl: 'https://cdn.example.com/fotos/socio_45.jpg',
          codigoBarras: 'SOCIO-45',
          mensajes: [
            { encabezado: 'Cuota al día', cuerpo: 'Acceso a todas las sedes' }
          ]
        }
      });

      assert.ok(resultado.urlGuardar.startsWith('https://pay.google.com/gp/v/save/'));
      assert.ok(resultado.tokenJwt.length > 50);
      assert.strictEqual(resultado.idObjetoCompleto, `${emisorId}.socio_45`);

      const jwtData = decodificarJwtPayload(resultado.tokenJwt);
      const objeto = jwtData.payload.genericObjects[0];
      assert.strictEqual(objeto.imageModulesData[0].mainImage.sourceUri.uri, 'https://cdn.example.com/fotos/socio_45.jpg');
      assert.strictEqual(objeto.messages[0].header, 'Cuota al día');
    });
  });

  describe('Creación de Tarjetas de Puntos y Fidelidad (LoyaltyCard)', () => {
    it('debe generar URL y JWT para un programa de fidelidad con mensajes', () => {
      const resultado = wallet.crearPaseFidelidad({
        clase: {
          id: 'puntos_cafe',
          nombrePrograma: 'Coffee Club',
          nombreEmisor: 'Cafetería Central'
        },
        pase: {
          idObjeto: 'cliente_88',
          nombreTitular: 'Carlos Ruiz',
          puntosTexto: '350 pts',
          codigoBarras: 'LOYALTY-88',
          mensajes: [
            { encabezado: 'Promo 2x1', cuerpo: 'Válida en capuchinos hoy' }
          ]
        }
      });

      assert.ok(resultado.urlGuardar.startsWith('https://pay.google.com/gp/v/save/'));
      assert.ok(resultado.tokenJwt.length > 50);
      assert.strictEqual(resultado.idObjetoCompleto, `${emisorId}.cliente_88`);

      const jwtData = decodificarJwtPayload(resultado.tokenJwt);
      const objeto = jwtData.payload.loyaltyObjects[0];
      assert.strictEqual(objeto.messages[0].header, 'Promo 2x1');
    });
  });

  describe('Utilidades y Normalizadores', () => {
    it('normalizarClavePrivada debe convertir \\n escapadas', () => {
      const claveConEscapes = '-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBg\\n-----END PRIVATE KEY-----';
      const normalizada = normalizarClavePrivada(claveConEscapes);
      assert.ok(!normalizada.includes('\\n'));
      assert.ok(normalizada.includes('\n'));
    });

    it('formatearIdCompleto debe sanitizar caracteres no permitidos', () => {
      assert.strictEqual(formatearIdCompleto('123', 'mi id!@#$'), '123.mi_id____');
      assert.strictEqual(formatearIdCompleto('123', 'ticket-2026_01'), '123.ticket-2026_01');
    });

    it('normalizarCodigoBarras debe generar estructura correcta', () => {
      const simple = normalizarCodigoBarras('ABC-123');
      assert.deepStrictEqual(simple, {
        type: 'QR_CODE',
        value: 'ABC-123',
        alternateText: 'ABC-123'
      });

      const detallado = normalizarCodigoBarras({
        valor: '123456789012',
        tipo: 'EAN_13',
        textoAlternativo: '123-456'
      });
      assert.deepStrictEqual(detallado, {
        type: 'EAN_13',
        value: '123456789012',
        alternateText: '123-456'
      });
    });

    it('normalizarFechaIso debe respetar offsets de zona horaria explícitos', () => {
      // 1. Con offset explícito (-03:00)
      const conOffset = '2026-09-03T18:00:00-03:00';
      assert.strictEqual(normalizarFechaIso(conOffset), '2026-09-03T18:00:00-03:00');

      // 2. Con offset UTC (Z)
      const conZ = '2026-09-03T21:00:00Z';
      assert.strictEqual(normalizarFechaIso(conZ), '2026-09-03T21:00:00Z');

      // 3. Fecha ISO básica
      const basica = '2026-09-03T00:00:00';
      const norm = normalizarFechaIso(basica);
      assert.ok(norm && norm.endsWith('Z'));
    });

    it('decodificarCodigoGoogleWallet debe decodificar URLs y códigos (incluyendo guiones bajos)', () => {
      // 1. Directo
      const dir = decodificarCodigoGoogleWallet('TICKET-99');
      assert.strictEqual(dir.codigoLimpio, 'TICKET-99');
      assert.strictEqual(dir.formato, 'directo');

      // 2. Prefijo
      const sig = decodificarCodigoGoogleWallet('SIGIC:TOKEN-ABC');
      assert.strictEqual(sig.codigoLimpio, 'TOKEN-ABC');
      assert.strictEqual(sig.formato, 'prefijo_sigic');

      // 3. Objeto con guión medio
      const obj1 = decodificarCodigoGoogleWallet('338800.sigic-ceremonia-TOKEN123');
      assert.strictEqual(obj1.codigoLimpio, 'TOKEN123');
      assert.strictEqual(obj1.formato, 'objeto_wallet');

      // 4. Objeto con guiones bajos (formato institucional SiGIC)
      const obj2 = decodificarCodigoGoogleWallet('3388000000022839955.sigic_cer_1_25ec5117ee5a8a4789508bc5b172aeb4');
      assert.strictEqual(obj2.codigoLimpio, '25ec5117ee5a8a4789508bc5b172aeb4');
      assert.strictEqual(obj2.formato, 'objeto_wallet');

      // 5. Parámetro URL
      const url = decodificarCodigoGoogleWallet('https://example.com/scan?token=MY_TOKEN');
      assert.strictEqual(url.codigoLimpio, 'MY_TOKEN');
      assert.strictEqual(url.formato, 'url');

      // 6. URL oficial de Google Wallet con JWT
      const paseGenerado = wallet.crearPaseEvento({
        clase: { id: 'c1', nombreEvento: 'E1' },
        pase: { idObjeto: 't1', nombreTitular: 'H', codigoBarras: 'QR_VAL_123' }
      });
      const dec = decodificarCodigoGoogleWallet(paseGenerado.urlGuardar);
      assert.strictEqual(dec.codigoLimpio, 'QR_VAL_123');
      assert.strictEqual(dec.formato, 'jwt_wallet');
    });
  });
});
