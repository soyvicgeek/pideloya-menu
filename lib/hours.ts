/**
 * Horarios del negocio a partir de `dchplm_menus.hours_json`.
 *
 * Formato canónico (el que escribe el panel):
 *   {
 *     "lunes":   { "open": "13:00", "close": "22:00" },
 *     "viernes": { "open": "13:00", "close": "00:30" },   // cruza medianoche
 *     "domingo": { "closed": true }
 *   }
 *
 * También se aceptan, por tolerancia:
 *   "lunes": "13:00 - 22:00"      (cadena)
 *   "lunes": null                 (cerrado)
 *   claves en inglés o abreviadas ("mon", "monday", "lun")
 */

const TIMEZONE = "America/Mexico_City";

/** Índice 0 = Domingo, para casar con Date.getDay(). */
const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

/** Orden de despliegue: la semana arranca en lunes. */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Todas las formas de escribir cada día → índice 0-6. */
const DAY_ALIASES: Record<string, number> = {
  domingo: 0, dom: 0, sunday: 0, sun: 0,
  lunes: 1, lun: 1, monday: 1, mon: 1,
  martes: 2, mar: 2, tuesday: 2, tue: 2, tues: 2,
  miercoles: 3, mie: 3, wednesday: 3, wed: 3,
  jueves: 4, jue: 4, thursday: 4, thu: 4, thur: 4, thurs: 4,
  viernes: 5, vie: 5, friday: 5, fri: 5,
  sabado: 6, sab: 6, saturday: 6, sat: 6,
};

export type DayHours = { day: string; hours: string };

type Interval = { open: number; close: number };

function normalizeKey(key: string): string {
  return key
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .trim()
    .toLowerCase();
}

/** "13:00" | "1300" | "13" → minutos desde medianoche. null si no se entiende. */
function parseTime(raw: string): number | null {
  const value = raw.trim();
  const match = /^(\d{1,2})\s*[:.]?\s*(\d{2})?$/.exec(value);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  if (!Number.isFinite(hours) || hours > 24 || minutes > 59) return null;

  return hours * 60 + minutes;
}

/** Acepta las tres formas de escribir un día y devuelve su intervalo. */
function parseDayValue(value: unknown): Interval | null {
  if (value == null) return null;

  if (typeof value === "string") {
    const parts = value.split(/\s*(?:-|–|—|a|to)\s*/i).filter(Boolean);
    if (parts.length < 2) return null;
    const open = parseTime(parts[0]);
    const close = parseTime(parts[1]);
    return open === null || close === null ? null : { open, close };
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj.closed === true) return null;

    const openRaw = obj.open ?? obj.from ?? obj.apertura;
    const closeRaw = obj.close ?? obj.to ?? obj.cierre;
    if (typeof openRaw !== "string" || typeof closeRaw !== "string") return null;

    const open = parseTime(openRaw);
    const close = parseTime(closeRaw);
    return open === null || close === null ? null : { open, close };
  }

  return null;
}

function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60) % 24;
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** hours_json → intervalos por índice de día (0 = domingo). */
function parseSchedule(hoursJson: unknown): Map<number, Interval> {
  const schedule = new Map<number, Interval>();
  if (!hoursJson || typeof hoursJson !== "object" || Array.isArray(hoursJson)) {
    return schedule;
  }

  for (const [rawKey, rawValue] of Object.entries(hoursJson as Record<string, unknown>)) {
    const dayIndex = DAY_ALIASES[normalizeKey(rawKey)];
    if (dayIndex === undefined) continue;

    const interval = parseDayValue(rawValue);
    if (interval) schedule.set(dayIndex, interval);
  }

  return schedule;
}

/** Lista lista para pintar, de lunes a domingo. Vacía si no hay horarios cargados. */
export function buildHoursList(hoursJson: unknown): DayHours[] {
  const schedule = parseSchedule(hoursJson);
  if (schedule.size === 0) return [];

  return DISPLAY_ORDER.map((dayIndex) => {
    const interval = schedule.get(dayIndex);
    return {
      day: DAY_NAMES[dayIndex],
      hours: interval
        ? `${formatMinutes(interval.open)} - ${formatMinutes(interval.close)}`
        : "Cerrado",
    };
  });
}

/** Día y minutos actuales en horario de México, sin depender de la zona del servidor. */
function nowInMexico(): { day: number; minutes: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));

  return {
    day: weekdayIndex === -1 ? new Date().getDay() : weekdayIndex,
    minutes: hour * 60 + minute,
  };
}

/**
 * ¿El negocio está abierto ahora mismo?
 * Si no hay horarios cargados asumimos abierto, para no marcar como cerrados
 * a los negocios que todavía no llenan esa información.
 */
export function isOpenNow(hoursJson: unknown): boolean {
  const schedule = parseSchedule(hoursJson);
  if (schedule.size === 0) return true;

  const { day, minutes } = nowInMexico();

  const today = schedule.get(day);
  if (today) {
    // Horario normal dentro del mismo día.
    if (today.close > today.open && minutes >= today.open && minutes < today.close) return true;
    // Cruza medianoche: abre hoy y cierra mañana.
    if (today.close <= today.open && minutes >= today.open) return true;
  }

  // Puede seguir abierto por el turno que arrancó ayer.
  const yesterday = schedule.get((day + 6) % 7);
  if (yesterday && yesterday.close <= yesterday.open && minutes < yesterday.close) return true;

  return false;
}
