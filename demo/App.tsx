import React, { useState } from 'react';
import { BotonGoogleWallet } from '../src/react/BotonGoogleWallet';

type TipoPase = 'evento' | 'credencial' | 'fidelidad';
type FrameworkCode = 'nextjs' | 'express' | 'nestjs' | 'fastify' | 'typescript' | 'json';

interface Preset {
  id: string;
  nombre: string;
  subtitulo: string;
  tipo: TipoPase;
  emisor: string;
  evento: string;
  titular: string;
  color: string;
  qr: string;
  tipoCodigo: string;
  lugar?: string;
  fecha?: string;
  sector?: string;
  fila?: string;
  asiento?: string;
  tituloTarjeta?: string;
  subencabezado?: string;
  campo1?: { etiqueta: string; valor: string };
  campo2?: { etiqueta: string; valor: string };
  nombrePrograma?: string;
  categoriaSocio?: string;
  puntosTexto?: string;
}

const PRESETS: Preset[] = [
  {
    id: 'recital',
    nombre: 'Recital / Festival',
    subtitulo: 'Entrada con sector, puerta y butaca',
    tipo: 'evento',
    emisor: 'Productora Live Sound',
    evento: 'Rock Fest 2026',
    titular: 'Martina Rodríguez',
    color: '#1E1B4B',
    qr: 'ROCK-FEST-8821',
    tipoCodigo: 'QR_CODE',
    lugar: 'Estadio Obras, Buenos Aires',
    fecha: '20 Nov 2026 - 21:00 hs',
    sector: 'Campo VIP',
    fila: 'Fila 4',
    asiento: 'Butaca 12'
  },
  {
    id: 'colacion',
    nombre: 'Colación / Acto Académico',
    subtitulo: 'Pase institucional para graduados',
    tipo: 'evento',
    emisor: 'Instituto Superior Beltrán',
    evento: 'Colación de Grados 2026',
    titular: 'Julián Cancelo',
    color: '#0F172A',
    qr: 'SIGIC:EGRESADO-9842',
    tipoCodigo: 'QR_CODE',
    lugar: 'Anfiteatro Central',
    fecha: '18 Dic 2026 - 18:30 hs',
    sector: 'Platea Baja Central',
    fila: 'Fila A',
    asiento: 'Butaca 08'
  },
  {
    id: 'club',
    nombre: 'Carnet de Socio / Gimnasio',
    subtitulo: 'Credencial digital con estado de cuota',
    tipo: 'credencial',
    emisor: 'Club Deportivo Central',
    evento: '',
    titular: 'Santiago Méndez',
    color: '#047857',
    qr: 'SOCIO:481209',
    tipoCodigo: 'BARCODE_128',
    tituloTarjeta: 'Carnet de Socio',
    subencabezado: 'Socio Activo · Fútbol & Gimnasio',
    campo1: { etiqueta: 'N° de Socio', valor: '4812' },
    campo2: { etiqueta: 'Vigencia', valor: 'Diciembre 2026' }
  },
  {
    id: 'cafe',
    nombre: 'Cafetería / Puntos',
    subtitulo: 'Tarjeta de fidelización y saldo',
    tipo: 'fidelidad',
    emisor: 'Café Roma & Bakery',
    evento: '',
    titular: 'Camila Torres',
    color: '#78350F',
    qr: 'PUNTOS:CR-9912',
    tipoCodigo: 'QR_CODE',
    nombrePrograma: 'Club Café Roma',
    categoriaSocio: 'Miembro Gold ★',
    puntosTexto: '350 Puntos',
    campo1: { etiqueta: 'Beneficio', valor: '15% de descuento en barra' }
  },
  {
    id: 'cine',
    nombre: 'Cine / Teatro',
    subtitulo: 'Ticket de función numerada',
    tipo: 'evento',
    emisor: 'Cinema Grand Plaza',
    evento: 'Estreno: El Retorno',
    titular: 'Lucas Benítez',
    color: '#7F1D1D',
    qr: 'CINE-SALA3-F8',
    tipoCodigo: 'QR_CODE',
    lugar: 'Sala 3 (3D Dolby Atmos)',
    fecha: '14 Nov 2026 - 22:15 hs',
    sector: 'Platea Preferencial',
    fila: 'Fila F',
    asiento: 'Butaca 08'
  }
];

export function App() {
  const [pasoActual, setPasoActual] = useState<number>(1);
  const [tipo, setTipo] = useState<TipoPase>('evento');
  const [framework, setFramework] = useState<FrameworkCode>('nextjs');
  const [copiado, setCopiado] = useState(false);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  // Estados principales
  const [nombreEmisor, setNombreEmisor] = useState('Productora Live Sound');
  const [nombreEvento, setNombreEvento] = useState('Rock Fest 2026');
  const [titular, setTitular] = useState('Martina Rodríguez');
  const [colorFondo, setColorFondo] = useState('#1E1B4B');
  const [codigoQR, setCodigoQR] = useState('ROCK-FEST-8821');
  const [tipoCodigo, setTipoCodigo] = useState('QR_CODE');

  // Estados de Evento
  const [lugar, setLugar] = useState('Estadio Obras, Buenos Aires');
  const [fecha, setFecha] = useState('20 Nov 2026 - 21:00 hs');
  const [sector, setSector] = useState('Campo VIP');
  const [fila, setFila] = useState('Fila 4');
  const [asiento, setAsiento] = useState('Butaca 12');

  // Estados de Credencial
  const [tituloTarjeta, setTituloTarjeta] = useState('Carnet de Socio');
  const [subencabezado, setSubencabezado] = useState('Socio Activo · Categoría Pleno');
  const [campo1, setCampo1] = useState({ etiqueta: 'N° de Socio', valor: '4812' });
  const [campo2, setCampo2] = useState({ etiqueta: 'Vigencia', valor: 'Diciembre 2026' });

  // Estados de Fidelidad
  const [nombrePrograma, setNombrePrograma] = useState('Club de Beneficios');
  const [categoriaSocio, setCategoriaSocio] = useState('Miembro Gold');
  const [puntosTexto, setPuntosTexto] = useState('350 Puntos');

  const aplicarPreset = (preset: Preset) => {
    setTipo(preset.tipo);
    setNombreEmisor(preset.emisor);
    if (preset.evento) setNombreEvento(preset.evento);
    setTitular(preset.titular);
    setColorFondo(preset.color);
    setCodigoQR(preset.qr);
    setTipoCodigo(preset.tipoCodigo);
    if (preset.lugar) setLugar(preset.lugar);
    if (preset.fecha) setFecha(preset.fecha);
    if (preset.sector) setSector(preset.sector);
    if (preset.fila) setFila(preset.fila);
    if (preset.asiento) setAsiento(preset.asiento);
    if (preset.tituloTarjeta) setTituloTarjeta(preset.tituloTarjeta);
    if (preset.subencabezado) setSubencabezado(preset.subencabezado);
    if (preset.campo1) setCampo1(preset.campo1);
    if (preset.campo2) setCampo2(preset.campo2);
    if (preset.nombrePrograma) setNombrePrograma(preset.nombrePrograma);
    if (preset.categoriaSocio) setCategoriaSocio(preset.categoriaSocio);
    if (preset.puntosTexto) setPuntosTexto(preset.puntosTexto);
  };

  const dispararNotificacionPush = () => {
    setMostrarNotificacion(true);
    setTimeout(() => setMostrarNotificacion(false), 5000);
  };

  const generarJsonOficial = () => {
    const idClase = `${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${tipo}`;
    const idObjeto = `obj_${codigoQR.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    if (tipo === 'evento') {
      return {
        eventTicketClasses: [
          {
            id: `3388000000022289454.${idClase}`,
            issuerName: nombreEmisor,
            eventName: { defaultValue: { language: 'es-419', value: nombreEvento } },
            hexBackgroundColor: colorFondo,
            venue: { name: { defaultValue: { language: 'es-419', value: lugar } } }
          }
        ],
        eventTicketObjects: [
          {
            id: `3388000000022289454.${idObjeto}`,
            classId: `3388000000022289454.${idClase}`,
            state: 'ACTIVE',
            ticketHolderName: titular,
            barcode: { type: tipoCodigo, value: codigoQR, alternateText: codigoQR },
            seatInfo: {
              section: { defaultValue: { language: 'es-419', value: sector } },
              row: { defaultValue: { language: 'es-419', value: fila } },
              seat: { defaultValue: { language: 'es-419', value: asiento } }
            }
          }
        ]
      };
    }

    if (tipo === 'credencial') {
      return {
        genericClasses: [
          {
            id: `3388000000022289454.${idClase}`,
            issuerName: nombreEmisor,
            hexBackgroundColor: colorFondo
          }
        ],
        genericObjects: [
          {
            id: `3388000000022289454.${idObjeto}`,
            classId: `3388000000022289454.${idClase}`,
            state: 'ACTIVE',
            cardTitle: { defaultValue: { language: 'es-419', value: tituloTarjeta } },
            header: { defaultValue: { language: 'es-419', value: titular } },
            subheader: { defaultValue: { language: 'es-419', value: subencabezado } },
            barcode: { type: tipoCodigo, value: codigoQR, alternateText: codigoQR }
          }
        ]
      };
    }

    return {
      loyaltyClasses: [
        {
          id: `3388000000022289454.${idClase}`,
          programName: { defaultValue: { language: 'es-419', value: nombrePrograma } },
          issuerName: nombreEmisor,
          hexBackgroundColor: colorFondo
        }
      ],
      loyaltyObjects: [
        {
          id: `3388000000022289454.${idObjeto}`,
          classId: `3388000000022289454.${idClase}`,
          state: 'ACTIVE',
          accountHolderName: titular,
          tier: { defaultValue: { language: 'es-419', value: categoriaSocio } },
          loyaltyPoints: { label: { defaultValue: { language: 'es-419', value: 'Puntos' } }, balance: { string: puntosTexto } },
          barcode: { type: tipoCodigo, value: codigoQR, alternateText: codigoQR }
        }
      ]
    };
  };

  const generarSnippetCodigo = () => {
    if (framework === 'json') {
      return JSON.stringify(generarJsonOficial(), null, 2);
    }

    if (framework === 'nextjs') {
      return `// app/api/wallet/route.ts (Next.js App Router)
import { NextResponse } from 'next/server';
import { BilleteraGoogle } from '@jcancelo/google-wallet';

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const resultado = wallet.${tipo === 'evento' ? 'crearPaseEvento' : tipo === 'credencial' ? 'crearPaseGenerico' : 'crearPaseFidelidad'}({
      clase: {
        id: '${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${tipo}',
        ${tipo === 'evento' ? `nombreEvento: '${nombreEvento}',\n        nombreOrganizador: '${nombreEmisor}',\n        nombreLugar: '${lugar}',` : tipo === 'credencial' ? `nombreEmisor: '${nombreEmisor}',` : `nombrePrograma: '${nombrePrograma}',\n        nombreEmisor: '${nombreEmisor}',`}
        colorFondoHex: '${colorFondo}'
      },
      pase: {
        idObjeto: 'ticket_' + body.usuarioId,
        ${tipo === 'evento' ? `nombreTitular: body.nombre || '${titular}',\n        codigoBarras: '${codigoQR}',\n        ubicacion: {\n          sector: '${sector}',\n          fila: '${fila}',\n          asiento: '${asiento}'\n        },` : tipo === 'credencial' ? `tituloTarjeta: '${tituloTarjeta}',\n        encabezado: body.nombre || '${titular}',\n        subencabezado: '${subencabezado}',\n        codigoBarras: '${codigoQR}',` : `nombreTitular: body.nombre || '${titular}',\n        categoriaSocio: '${categoriaSocio}',\n        puntosTexto: '${puntosTexto}',\n        codigoBarras: '${codigoQR}',`}
        campos: [
          { etiqueta: 'Fecha de Emisión', valor: new Date().toLocaleDateString() }
        ]
      }
    });

    return NextResponse.json({ ok: true, urlGuardar: resultado.urlGuardar });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}`;
    }

    if (framework === 'express') {
      return `// server.js (Express)
import express from 'express';
import { BilleteraGoogle } from '@jcancelo/google-wallet';

const app = express();
app.use(express.json());

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY
});

app.post('/api/emitir-pase', (req, res) => {
  try {
    const pase = wallet.${tipo === 'evento' ? 'crearPaseEvento' : tipo === 'credencial' ? 'crearPaseGenerico' : 'crearPaseFidelidad'}({
      clase: {
        id: '${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${tipo}',
        ${tipo === 'evento' ? `nombreEvento: '${nombreEvento}',\n        nombreOrganizador: '${nombreEmisor}',` : tipo === 'credencial' ? `nombreEmisor: '${nombreEmisor}',` : `nombrePrograma: '${nombrePrograma}',\n        nombreEmisor: '${nombreEmisor}',`}
        colorFondoHex: '${colorFondo}'
      },
      pase: {
        idObjeto: 'usr_' + req.body.id,
        ${tipo === 'evento' ? `nombreTitular: req.body.nombre || '${titular}',\n        codigoBarras: '${codigoQR}',` : tipo === 'credencial' ? `tituloTarjeta: '${tituloTarjeta}',\n        encabezado: req.body.nombre || '${titular}',\n        codigoBarras: '${codigoQR}',` : `nombreTitular: req.body.nombre || '${titular}',\n        codigoBarras: '${codigoQR}',`}
      }
    });

    res.json({ url: pase.urlGuardar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Servidor listo en puerto 3000'));`;
    }

    if (framework === 'nestjs') {
      return `// wallet.controller.ts (NestJS)
import { Controller, Post, Body } from '@nestjs/common';
import { BilleteraGoogle } from '@jcancelo/google-wallet';

@Controller('wallet')
export class WalletController {
  private wallet = new BilleteraGoogle({
    emisorId: process.env.GOOGLE_WALLET_ISSUER_ID,
    correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL,
    clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY,
  });

  @Post('generar')
  generarPase(@Body() body: any) {
    return this.wallet.${tipo === 'evento' ? 'crearPaseEvento' : tipo === 'credencial' ? 'crearPaseGenerico' : 'crearPaseFidelidad'}({
      clase: {
        id: '${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}',
        ${tipo === 'evento' ? `nombreEvento: '${nombreEvento}',` : `nombreEmisor: '${nombreEmisor}',`}
        colorFondoHex: '${colorFondo}'
      },
      pase: {
        idObjeto: 'ticket_' + body.id,
        ${tipo === 'evento' ? `nombreTitular: body.nombre,\n        codigoBarras: '${codigoQR}',` : `tituloTarjeta: '${tituloTarjeta}',\n        encabezado: body.nombre,\n        codigoBarras: '${codigoQR}',`}
      }
    });
  }
}`;
    }

    if (framework === 'fastify') {
      return `// server.ts (Fastify)
import Fastify from 'fastify';
import { BilleteraGoogle } from '@jcancelo/google-wallet';

const fastify = Fastify({ logger: true });

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

fastify.post('/wallet/pase', async (request, reply) => {
  const resultado = wallet.${tipo === 'evento' ? 'crearPaseEvento' : tipo === 'credencial' ? 'crearPaseGenerico' : 'crearPaseFidelidad'}({
    clase: {
      id: '${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}',
      colorFondoHex: '${colorFondo}'
    },
    pase: {
      idObjeto: 'ticket_001',
      ${tipo === 'evento' ? `nombreTitular: '${titular}',\n      codigoBarras: '${codigoQR}'` : `tituloTarjeta: '${tituloTarjeta}',\n      encabezado: '${titular}',\n      codigoBarras: '${codigoQR}'`}
    }
  });

  return { url: resultado.urlGuardar };
});

fastify.listen({ port: 3000 });`;
    }

    return `// script.ts (TypeScript / Node.js puro)
import { BilleteraGoogle } from '@jcancelo/google-wallet';

const wallet = new BilleteraGoogle({
  emisorId: process.env.GOOGLE_WALLET_ISSUER_ID!,
  correoCliente: process.env.GOOGLE_WALLET_CLIENT_EMAIL!,
  clavePrivada: process.env.GOOGLE_WALLET_PRIVATE_KEY!
});

const pase = wallet.${tipo === 'evento' ? 'crearPaseEvento' : tipo === 'credencial' ? 'crearPaseGenerico' : 'crearPaseFidelidad'}({
  clase: {
    id: '${nombreEmisor.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${tipo}',
    ${tipo === 'evento' ? `nombreEvento: '${nombreEvento}',\n    nombreOrganizador: '${nombreEmisor}',\n    nombreLugar: '${lugar}',` : tipo === 'credencial' ? `nombreEmisor: '${nombreEmisor}',` : `nombrePrograma: '${nombrePrograma}',\n    nombreEmisor: '${nombreEmisor}',`}
    colorFondoHex: '${colorFondo}'
  },
  pase: {
    idObjeto: 'ticket_usr_882',
    ${tipo === 'evento' ? `nombreTitular: '${titular}',\n    codigoBarras: '${codigoQR}',\n    ubicacion: {\n      sector: '${sector}',\n      fila: '${fila}',\n      asiento: '${asiento}'\n    }` : tipo === 'credencial' ? `tituloTarjeta: '${tituloTarjeta}',\n    encabezado: '${titular}',\n    subencabezado: '${subencabezado}',\n    codigoBarras: '${codigoQR}'` : `nombreTitular: '${titular}',\n    categoriaSocio: '${categoriaSocio}',\n    puntosTexto: '${puntosTexto}',\n    codigoBarras: '${codigoQR}'`}
  }
});

console.log('Enlace directo para guardar en Google Wallet:');
console.log(pase.urlGuardar);`;
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(generarSnippetCodigo());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header con navegación de proyecto */}
      <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30">
              GW
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
                Google Wallet — Asistente de Integración
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  v1.0.0 Oficial
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Diseñá, probá y generá el código backend para emitir pases digitales con <span className="text-blue-400 font-mono font-semibold">@jcancelo/google-wallet</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.npmjs.com/package/@jcancelo/google-wallet"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            Ver en npm
          </a>
          <a
            href="https://github.com/julianmcancelo/google-wallet"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors shadow-sm"
          >
            GitHub (@julianmcancelo)
          </a>
        </div>
      </header>

      {/* BANNER DE PRESETS RÁPIDOS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wider text-slate-300">
            Plantillas de la Vida Cotidiana (Cargar en 1 Clic)
          </p>
          <span className="text-[11px] text-slate-400">Seleccioná un caso real para autocompletar</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => aplicarPreset(p)}
              className="text-left p-3 rounded-2xl bg-slate-950/80 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group space-y-1 active:scale-98"
            >
              <p className="text-xs font-black text-white group-hover:text-blue-400 transition-colors truncate">
                {p.nombre}
              </p>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-tight">
                {p.subtitulo}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* WIZARD EN 4 PASOS */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 overflow-x-auto gap-4">
        {[
          { num: 1, titulo: '1. Tipo de Pase' },
          { num: 2, titulo: '2. Identidad & Colores' },
          { num: 3, titulo: '3. Datos & Código QR' },
          { num: 4, titulo: '4. Exportar Código' }
        ].map(step => (
          <button
            key={step.num}
            onClick={() => setPasoActual(step.num)}
            className={`flex items-center gap-2 text-xs font-black tracking-wide pb-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              pasoActual === step.num
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              pasoActual === step.num ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {step.num}
            </span>
            <span>{step.titulo}</span>
          </button>
        ))}
      </div>

      {/* GRID DE TRABAJO: FORMULARIO WIZARD A LA IZQUIERDA, MOCKUP A LA DERECHA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PANEL DEL WIZARD */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          {/* PASO 1: TIPO DE PASE */}
          {pasoActual === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-black text-white">Paso 1: ¿Qué tipo de tarjeta querés emitir?</h2>
                <p className="text-xs text-slate-400 mt-0.5">Google Wallet clasifica los pases según su caso de uso.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'evento', titulo: 'Entrada a Evento (EventTicket)', desc: 'Para recitales, colaciones, cines, congresos o funciones con fecha, lugar y butaca.' },
                  { id: 'credencial', titulo: 'Credencial / Carnet (GenericPass)', desc: 'Para universidades, gimnasios, clubes de socios, carnet de conducir o empleados.' },
                  { id: 'fidelidad', titulo: 'Tarjeta de Fidelidad (LoyaltyCard)', desc: 'Para cafeterías, supermercados, acumulación de puntos y beneficios.' }
                ].map(op => (
                  <button
                    key={op.id}
                    onClick={() => setTipo(op.id as TipoPase)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      tipo === op.id
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm ring-1 ring-blue-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-xs font-black text-white">{op.titulo}</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">{op.desc}</p>
                  </button>
                ))}
              </div>

              {/* Caja de Asesoramiento */}
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300 space-y-1">
                <p className="font-bold text-blue-200">Consejo de Google:</p>
                <p className="text-[11px] leading-relaxed opacity-90">
                  Si elegís <strong>Entrada a Evento</strong>, Google Wallet activa notificaciones automáticas geolocalizadas y recordatorios de horario en el teléfono del usuario el día de la ceremonia o recital.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setPasoActual(2)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow-md cursor-pointer"
                >
                  Siguiente: Identidad y Colores →
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: BRANDING Y COLORES */}
          {pasoActual === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-black text-white">Paso 2: Identidad Visual y Estilo</h2>
                <p className="text-xs text-slate-400 mt-0.5">Configurá el nombre del emisor, título y paleta de color.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Organización o Empresa Emisora</label>
                  <input
                    type="text"
                    value={nombreEmisor}
                    onChange={(e) => setNombreEmisor(e.target.value)}
                    placeholder="Ej: Instituto Beltrán / Live Sound"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                {tipo === 'evento' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre del Evento</label>
                    <input
                      type="text"
                      value={nombreEvento}
                      onChange={(e) => setNombreEvento(e.target.value)}
                      placeholder="Ej: Colación 2026 / Rock Fest"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                )}

                {tipo === 'credencial' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Título de la Tarjeta</label>
                    <input
                      type="text"
                      value={tituloTarjeta}
                      onChange={(e) => setTituloTarjeta(e.target.value)}
                      placeholder="Ej: Carnet de Alumno / Socio Pleno"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                )}

                {tipo === 'fidelidad' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre del Programa</label>
                    <input
                      type="text"
                      value={nombrePrograma}
                      onChange={(e) => setNombrePrograma(e.target.value)}
                      placeholder="Ej: Club Café Roma / Puntos Viajeros"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Color de Fondo de la Tarjeta</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={colorFondo}
                      onChange={(e) => setColorFondo(e.target.value)}
                      className="h-10 w-12 bg-transparent border-0 cursor-pointer rounded-lg"
                    />
                    <input
                      type="text"
                      value={colorFondo}
                      onChange={(e) => setColorFondo(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Paleta rápida de colores recomendados */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Sugeridos:</span>
                    {['#0F172A', '#1E1B4B', '#047857', '#78350F', '#7F1D1D', '#0369A1'].map(c => (
                      <button
                        key={c}
                        onClick={() => setColorFondo(c)}
                        style={{ backgroundColor: c }}
                        className={`w-6 h-6 rounded-full border border-white/20 transition-transform active:scale-90 cursor-pointer ${
                          colorFondo === c ? 'ring-2 ring-blue-500 scale-110' : ''
                        }`}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Caja de Asesoramiento */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-slate-200">Recomendación de Diseño:</p>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Google Wallet ajusta automáticamente el color del texto a blanco o negro según el fondo. Los tonos oscuros como <code>#0F172A</code> o <code>#1E1B4B</code> ofrecen el contraste más limpio en pantallas OLED.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setPasoActual(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  ← Volver al Paso 1
                </button>
                <button
                  onClick={() => setPasoActual(3)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow-md cursor-pointer"
                >
                  Siguiente: Datos y QR →
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: DATOS DEL ASISTENTE Y QR */}
          {pasoActual === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-black text-white">Paso 3: Datos del Titular y Código de Barras</h2>
                <p className="text-xs text-slate-400 mt-0.5">Información dinámica que cambia por cada persona o entrada.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre Completo del Titular</label>
                  <input
                    type="text"
                    value={titular}
                    onChange={(e) => setTitular(e.target.value)}
                    placeholder="Ej: Julián Cancelo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Valor del Código QR / Barras</label>
                  <input
                    type="text"
                    value={codigoQR}
                    onChange={(e) => setCodigoQR(e.target.value)}
                    placeholder="Ej: TICKET-1044"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {tipo === 'evento' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Lugar / Recinto</label>
                      <input
                        type="text"
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Fecha y Hora</label>
                      <input
                        type="text"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
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
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Subtítulo / Categoría</label>
                    <input
                      type="text"
                      value={subencabezado}
                      onChange={(e) => setSubencabezado(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Dato 1 ({campo1?.etiqueta})</label>
                    <input
                      type="text"
                      value={campo1?.valor}
                      onChange={(e) => setCampo1({ etiqueta: campo1?.etiqueta || 'ID', valor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {tipo === 'fidelidad' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Categoría de Miembro</label>
                    <input
                      type="text"
                      value={categoriaSocio}
                      onChange={(e) => setCategoriaSocio(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Saldo o Puntos</label>
                    <input
                      type="text"
                      value={puntosTexto}
                      onChange={(e) => setPuntosTexto(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Caja de Asesoramiento */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300 space-y-1">
                <p className="font-bold text-emerald-200">Tip de Seguridad en Portería:</p>
                <p className="text-[11px] leading-relaxed opacity-90">
                  La librería incluye <code>decodificarCodigoGoogleWallet()</code> para que tu app móvil o lector físico pueda leer indistintamente el código crudo, prefijos como <code>SIGIC:</code> o URLs completas de guardado.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setPasoActual(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  ← Volver al Paso 2
                </button>
                <button
                  onClick={() => setPasoActual(4)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow-md cursor-pointer"
                >
                  Siguiente: Ver Código Listo →
                </button>
              </div>
            </div>
          )}

          {/* PASO 4: EXPORTACIÓN Y GENERADOR DE CÓDIGO */}
          {pasoActual === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black text-white">Paso 4: Código Listo para Producción</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Copiá este bloque en tu servidor para emitir el pase.</p>
                </div>
              </div>

              {/* Selector de Framework */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {[
                  { id: 'nextjs', label: 'Next.js (App Router)' },
                  { id: 'express', label: 'Express (Node.js)' },
                  { id: 'nestjs', label: 'NestJS' },
                  { id: 'fastify', label: 'Fastify' },
                  { id: 'typescript', label: 'TypeScript Script' },
                  { id: 'json', label: 'Payload JSON Google' }
                ].map(fw => (
                  <button
                    key={fw.id}
                    onClick={() => setFramework(fw.id as FrameworkCode)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      framework === fw.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fw.label}
                  </button>
                ))}
              </div>

              {/* Bloque de Código */}
              <div className="relative">
                <button
                  onClick={copiarCodigo}
                  className="absolute right-3 top-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer z-10"
                >
                  {copiado ? '¡Copiado!' : 'Copiar Código'}
                </button>
                <pre className="bg-slate-950 p-4 rounded-2xl text-xs text-blue-300 overflow-x-auto border border-slate-800 max-h-80 leading-relaxed font-mono">
                  <code>{generarSnippetCodigo()}</code>
                </pre>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setPasoActual(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  ← Volver a Datos y QR
                </button>
                <a
                  href="https://github.com/julianmcancelo/google-wallet#readme"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition border border-slate-700"
                >
                  Ver Manual Completo en GitHub
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MOCKUP DEL TELÉFONO MÓVIL EN TIEMPO REAL */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-sm rounded-[2.8rem] bg-slate-900 border-4 border-slate-800 p-4 shadow-2xl space-y-4 relative overflow-hidden">
            {/* Cabecera del teléfono */}
            <div className="flex justify-between items-center px-4 pt-2 text-[10px] font-bold text-slate-500">
              <span>9:41</span>
              <span className="font-semibold text-slate-400">Google Wallet</span>
              <span>100%</span>
            </div>

            {/* Simulación de Notificación Push de Android */}
            {mostrarNotificacion && (
              <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-3.5 text-xs text-white shadow-2xl animate-in slide-in-from-top-4 duration-300 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold flex items-center gap-1.5 text-blue-400">
                    ● Google Wallet
                  </span>
                  <span>Ahora</span>
                </div>
                <p className="font-bold text-white leading-tight">
                  Tu evento comienza en 3 horas
                </p>
                <p className="text-[11px] text-slate-300">
                  {tipo === 'evento' ? nombreEvento : tituloTarjeta} — {sector} ({asiento})
                </p>
              </div>
            )}

            {/* Tarjeta Digital */}
            <div
              style={{ backgroundColor: colorFondo }}
              className="rounded-3xl p-6 text-white shadow-2xl transition-all duration-300 space-y-5"
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
                {tipo === 'evento' ? `${lugar} · ${fecha}` : 'Documento Digital Válido'}
              </div>
            </div>

            {/* Botón de Google Wallet */}
            <div className="pt-2 flex justify-center">
              <BotonGoogleWallet
                url="#"
                texto="Guardar en Google Wallet"
                tema="claro"
                className="w-full"
                alHacerClick={() => alert('¡En una app real, este botón abre la URL generada por la librería!')}
              />
            </div>
          </div>

          {/* Botón para Simular Notificación Push */}
          <button
            onClick={dispararNotificacionPush}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Simular Notificación Push de Google Wallet
          </button>
        </div>
      </div>

      {/* FOOTER: ACERCA DEL DESARROLLADOR */}
      <footer className="border-t border-slate-800/80 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg ring-2 ring-blue-500/20">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h3 className="text-sm font-black text-white">Julián Cancelo</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                Autor & Desarrollador
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Desarrollador de software especializado en aplicaciones web, móviles y herramientas open source.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/julianmcancelo"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            GitHub (@julianmcancelo)
          </a>
          <a
            href="mailto:jcancelo.dev@gmail.com"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors shadow-sm"
          >
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
}
