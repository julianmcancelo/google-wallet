import React, { useState } from 'react';
import { BotonGoogleWallet } from '../src/react/BotonGoogleWallet';

type TipoPase = 'evento' | 'credencial' | 'fidelidad';

export function App() {
  const [tipo, setTipo] = useState<TipoPase>('evento');
  const [copiado, setCopiado] = useState(false);

  // Estados comunes
  const [nombreEmisor, setNombreEmisor] = useState('Productora Norte');
  const [nombreEvento, setNombreEvento] = useState('Festival de Música 2026');
  const [titular, setTitular] = useState('Martina Rodríguez');
  const [colorFondo, setColorFondo] = useState('#1E293B');
  const [codigoQR, setCodigoQR] = useState('TICKET-104492');

  // Estados de Evento
  const [lugar, setLugar] = useState('Estadio Obras, Buenos Aires');
  const [fecha, setFecha] = useState('20 Nov 2026 - 21:00 hs');
  const [sector, setSector] = useState('Platea Baja');
  const [fila, setFila] = useState('Fila 4');
  const [asiento, setAsiento] = useState('12');

  // Estados de Credencial
  const [tituloTarjeta, setTituloTarjeta] = useState('Carnet de Socio');
  const [subencabezado, setSubencabezado] = useState('Socio Activo · Categoría Pleno');
  const [campo1, setCampo1] = useState({ etiqueta: 'N° de Socio', valor: '4812' });
  const [campo2, setCampo2] = useState({ etiqueta: 'Vigencia', valor: 'Diciembre 2026' });

  // Estados de Fidelidad
  const [nombrePrograma, setNombrePrograma] = useState('Club de Beneficios');
  const [categoriaSocio, setCategoriaSocio] = useState('Miembro Gold');
  const [puntosTexto, setPuntosTexto] = useState('350 Puntos');

  // Generar código TypeScript dinámico
  const generarCodigo = () => {
    if (tipo === 'evento') {
      return `import { BilleteraGoogle } from '@jcancelo/google-wallet';

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

const pase = wallet.crearPaseEvento({
  clase: {
    id: '${nombreEvento.toLowerCase().replace(/[^a-z0-9]/g, '_')}',
    nombreEvento: '${nombreEvento}',
    nombreOrganizador: '${nombreEmisor}',
    colorFondoHex: '${colorFondo}',
    nombreLugar: '${lugar}'
  },
  pase: {
    idObjeto: 'ticket_${codigoQR}',
    nombreTitular: '${titular}',
    codigoBarras: '${codigoQR}',
    ubicacion: {
      sector: '${sector}',
      fila: '${fila}',
      asiento: '${asiento}'
    },
    campos: [
      { etiqueta: 'Fecha', valor: '${fecha}' }
    ]
  }
});

console.log('URL de guardado:', pase.urlGuardar);`;
    }

    if (tipo === 'credencial') {
      return `import { BilleteraGoogle } from '@jcancelo/google-wallet';

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

const credencial = wallet.crearPaseGenerico({
  clase: {
    id: 'credencial_${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}',
    nombreEmisor: '${nombreEmisor}',
    colorFondoHex: '${colorFondo}'
  },
  pase: {
    idObjeto: 'socio_${codigoQR}',
    tituloTarjeta: '${tituloTarjeta}',
    encabezado: '${titular}',
    subencabezado: '${subencabezado}',
    codigoBarras: '${codigoQR}',
    campos: [
      { etiqueta: '${campo1.etiqueta}', valor: '${campo1.valor}' },
      { etiqueta: '${campo2.etiqueta}', valor: '${campo2.valor}' }
    ]
  }
});`;
    }

    return `import { BilleteraGoogle } from '@jcancelo/google-wallet';

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

const tarjeta = wallet.crearPaseFidelidad({
  clase: {
    id: 'programa_puntos',
    nombrePrograma: '${nombrePrograma}',
    nombreEmisor: '${nombreEmisor}',
    colorFondoHex: '${colorFondo}'
  },
  pase: {
    idObjeto: 'cliente_${codigoQR}',
    nombreTitular: '${titular}',
    categoriaSocio: '${categoriaSocio}',
    puntosTexto: '${puntosTexto}',
    codigoBarras: '${codigoQR}'
  }
});`;
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(generarCodigo());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
              GW
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Google Wallet — Simulador Interactivo
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Diseñá y probá en tiempo real cómo se verá tu pase en la Billetera de Google con la librería <span className="text-blue-400 font-mono">@jcancelo/google-wallet</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/julianmcancelo/google-wallet"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            Ver en GitHub
          </a>
        </div>
      </header>

      {/* Selector de Tipo de Pase */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 max-w-xl">
        <button
          onClick={() => { setTipo('evento'); setColorFondo('#1E293B'); setNombreEmisor('Productora Norte'); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
            tipo === 'evento' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Entrada de Evento
        </button>
        <button
          onClick={() => { setTipo('credencial'); setColorFondo('#047857'); setNombreEmisor('Club Deportivo Central'); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
            tipo === 'credencial' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Credencial / Carnet
        </button>
        <button
          onClick={() => { setTipo('fidelidad'); setColorFondo('#78350F'); setNombreEmisor('Café Roma'); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
            tipo === 'fidelidad' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Tarjeta de Puntos
        </button>
      </div>

      {/* Grid Principal: Formulario a la izquierda, Mockup a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
            Datos del Pase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Organización / Emisor</label>
              <input
                type="text"
                value={nombreEmisor}
                onChange={(e) => setNombreEmisor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre del Titular</label>
              <input
                type="text"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {tipo === 'evento' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre del Evento</label>
                <input
                  type="text"
                  value={nombreEvento}
                  onChange={(e) => setNombreEvento(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Lugar / Sede</label>
                  <input
                    type="text"
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Fecha / Horario</label>
                  <input
                    type="text"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Sector</label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Fila</label>
                  <input
                    type="text"
                    value={fila}
                    onChange={(e) => setFila(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Asiento</label>
                  <input
                    type="text"
                    value={asiento}
                    onChange={(e) => setAsiento(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {tipo === 'credencial' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Título de Tarjeta</label>
                <input
                  type="text"
                  value={tituloTarjeta}
                  onChange={(e) => setTituloTarjeta(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Subencabezado</label>
                <input
                  type="text"
                  value={subencabezado}
                  onChange={(e) => setSubencabezado(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {tipo === 'fidelidad' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Categoría de Socio</label>
                <input
                  type="text"
                  value={categoriaSocio}
                  onChange={(e) => setCategoriaSocio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Puntos o Saldo</label>
                <input
                  type="text"
                  value={puntosTexto}
                  onChange={(e) => setPuntosTexto(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Código QR o Barras</label>
              <input
                type="text"
                value={codigoQR}
                onChange={(e) => setCodigoQR(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Color de Fondo (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                  className="h-9 w-10 bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mockup de Google Wallet */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-slate-900 border-4 border-slate-800 p-4 shadow-2xl space-y-4">
            {/* Cabecera del teléfono */}
            <div className="flex justify-between items-center px-4 pt-2 text-[10px] font-bold text-slate-500">
              <span>9:41</span>
              <span>Google Wallet</span>
              <span>100%</span>
            </div>

            {/* Tarjeta Digital */}
            <div
              style={{ backgroundColor: colorFondo }}
              className="rounded-3xl p-6 text-white shadow-xl transition-all duration-300 space-y-5"
            >
              {/* Encabezado */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">{nombreEmisor}</p>
                  <h3 className="text-lg font-black leading-tight mt-0.5">
                    {tipo === 'evento' ? nombreEvento : tipo === 'credencial' ? tituloTarjeta : nombrePrograma}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                  ★
                </div>
              </div>

              {/* Titular */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-75">Titular</p>
                <p className="text-base font-black">{titular}</p>
                {tipo === 'credencial' && <p className="text-xs opacity-90">{subencabezado}</p>}
                {tipo === 'fidelidad' && <p className="text-xs opacity-90 font-bold">{categoriaSocio} · {puntosTexto}</p>}
              </div>

              {/* Datos de Ubicación para Eventos */}
              {tipo === 'evento' && (
                <div className="grid grid-cols-3 gap-2 bg-black/25 p-3 rounded-2xl text-center">
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-75">Sector</p>
                    <p className="text-xs font-black">{sector}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-75">Fila</p>
                    <p className="text-xs font-black">{fila}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-75">Asiento</p>
                    <p className="text-xs font-black">{asiento}</p>
                  </div>
                </div>
              )}

              {/* Código QR */}
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(codigoQR)}`}
                  alt="QR"
                  className="w-32 h-32 object-contain"
                />
                <span className="text-[11px] font-mono font-bold text-slate-800">{codigoQR}</span>
              </div>

              {/* Footer de la tarjeta */}
              <div className="text-[10px] opacity-75 text-center font-medium">
                {tipo === 'evento' ? lugar : 'Documento Digital Válido'}
              </div>
            </div>

            {/* Botón de Google Wallet */}
            <div className="pt-2 flex justify-center">
              <BotonGoogleWallet
                url="#"
                texto="Guardar en Google Wallet"
                tema="claro"
                className="w-full"
                alHacerClick={() => alert('¡En una app real, este botón abre la URL de guardado generada por la librería!')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Código TypeScript generado */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-300">
            Código TypeScript para tu Backend
          </h2>
          <button
            onClick={copiarCodigo}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition"
          >
            {copiado ? '¡Copiado!' : 'Copiar Código'}
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-2xl text-xs text-blue-300 overflow-x-auto border border-slate-800">
          <code>{generarCodigo()}</code>
        </pre>
      </div>
    </div>
  );
}
