/**
 * @file constructor-generico.ts
 * @description Constructor agnóstico de clases y objetos Genéricos (GenericPass).
 */

import { ClaseGenerica, PaseGenerico } from '../tipos.js';
import { formatearIdCompleto, normalizarCodigoBarras } from '../utilidades/normalizadores.js';

export function construirClaseGenerica(emisorId: string, datos: ClaseGenerica, idioma = 'es-419') {
  const idCompleto = formatearIdCompleto(emisorId, datos.id);

  const clase: Record<string, any> = {
    id: idCompleto,
    reviewStatus: 'UNDER_REVIEW'
  };

  if (datos.nombreEmisor) {
    clase.issuerName = datos.nombreEmisor;
  }

  if (datos.logoUrl) {
    clase.logo = {
      sourceUri: { uri: datos.logoUrl },
      contentDescription: { defaultValue: { language: idioma, value: 'Logo' } }
    };
  }

  if (datos.bannerUrl) {
    clase.heroImage = {
      sourceUri: { uri: datos.bannerUrl },
      contentDescription: { defaultValue: { language: idioma, value: 'Banner' } }
    };
  }

  if (datos.colorFondoHex) {
    clase.hexBackgroundColor = datos.colorFondoHex;
  }

  if (datos.mensajes && datos.mensajes.length > 0) {
    clase.messages = datos.mensajes.map((m, idx) => ({
      id: m.id || `msg_clase_${idx}`,
      header: m.encabezado,
      body: m.cuerpo
    }));
  }

  return clase;
}

export function construirObjetoGenerico(emisorId: string, datos: PaseGenerico, idioma = 'es-419') {
  const idClaseCompleto = formatearIdCompleto(emisorId, datos.claseId);
  const idObjetoCompleto = formatearIdCompleto(emisorId, datos.idObjeto);

  const objeto: Record<string, any> = {
    id: idObjetoCompleto,
    classId: idClaseCompleto,
    state: datos.estado || 'ACTIVE',
    cardTitle: { defaultValue: { language: idioma, value: datos.tituloTarjeta } },
    header: { defaultValue: { language: idioma, value: datos.encabezado } },
    barcode: normalizarCodigoBarras(datos.codigoBarras)
  };

  if (datos.subencabezado) {
    objeto.subheader = { defaultValue: { language: idioma, value: datos.subencabezado } };
  }

  // Fotografía del titular
  if (datos.fotoTitularUrl) {
    objeto.imageModulesData = [
      {
        id: 'foto_titular',
        mainImage: {
          sourceUri: { uri: datos.fotoTitularUrl },
          contentDescription: { defaultValue: { language: idioma, value: 'Fotografía' } }
        }
      }
    ];
  }

  if (datos.campos && datos.campos.length > 0) {
    objeto.textModulesData = datos.campos.map((c, idx) => ({
      id: c.clave || `campo_${idx}`,
      header: c.etiqueta,
      body: c.valor
    }));
  }

  if (datos.mensajes && datos.mensajes.length > 0) {
    objeto.messages = datos.mensajes.map((m, idx) => ({
      id: m.id || `msg_obj_${idx}`,
      header: m.encabezado,
      body: m.cuerpo
    }));
  }

  if (datos.enlaces && datos.enlaces.length > 0) {
    objeto.linksModuleData = {
      uris: datos.enlaces.map(e => ({
        uri: e.url,
        description: e.texto
      }))
    };
  }

  return objeto;
}
