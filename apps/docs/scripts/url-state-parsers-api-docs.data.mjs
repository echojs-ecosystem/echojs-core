/** Doc content for @echojs-ecosystem/url-state parser API pages. */

const sig = (s) => s.trim()

const parserMethods = [
  ['`.withDefault(value)`', '`ParserWithDefault<Value>`', 'Fallback when URL missing/invalid; powers `reset()`'],
  ['`.withOptions(opts)`', '`Parser<Value>`', 'Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, …'],
]

const scalarRelated = ['create-query-params', 'parsers-guide']

export const urlStateParsersApiDocs = [
  {
    slug: 'parse-as-string',
    name: 'parseAsString',
    description: 'Pass-through string parser for free-text query params.',
    usage: sig(`
import { parseAsString } from '@echojs-ecosystem/url-state'

const q = parseAsString.withDefault('')
// ?q=bike  →  'bike'
`),
    types: sig(`
import type { Parser } from '@echojs-ecosystem/url-state'

export const parseAsString: Parser<string>
`),
    behavior: [
      ['**Parse**', 'First query value as string'],
      ['**Serialize**', 'Same string'],
      ['**Example**', "`?q=echo` → `'echo'`"],
    ],
    returns: parserMethods,
    related: ['parse-as-integer', 'create-query-params', 'parsers-guide'],
    relatedLabels: { 'parsers-guide': 'Parsers guide' },
  },
  {
    slug: 'parse-as-integer',
    name: 'parseAsInteger',
    description: 'Integer parser — rejects floats and non-numeric strings.',
    usage: sig(`
import { parseAsInteger } from '@echojs-ecosystem/url-state'

const page = parseAsInteger.withDefault(1)
// ?page=2  →  2
// ?page=abc  →  null  →  default 1
`),
    types: sig(`
export const parseAsInteger: Parser<number>
`),
    behavior: [
      ['**Parse**', 'Matches `/^[+-]?\\d+$/`; `parseInt` base 10'],
      ['**Serialize**', '`String(Math.trunc(n))`'],
      ['**Rejects**', '`1.5`, `abc`, empty'],
    ],
    returns: parserMethods,
    related: ['parse-as-float', 'parse-as-string', 'create-query-params'],
  },
  {
    slug: 'parse-as-float',
    name: 'parseAsFloat',
    description: 'Finite number parser via `Number(value)`.',
    usage: sig(`
import { parseAsFloat } from '@echojs-ecosystem/url-state'

const price = parseAsFloat.withDefault(0)
// ?price=9.99  →  9.99
`),
    types: sig(`
export const parseAsFloat: Parser<number>
`),
    behavior: [
      ['**Parse**', '`Number(value)`; must be finite'],
      ['**Serialize**', '`String(n)`'],
      ['**Example**', '`?p=9.99` → `9.99`'],
    ],
    returns: parserMethods,
    related: ['parse-as-integer', 'create-query-params'],
  },
  {
    slug: 'parse-as-boolean',
    name: 'parseAsBoolean',
    description: 'Boolean parser for toggle filters.',
    usage: sig(`
import { parseAsBoolean } from '@echojs-ecosystem/url-state'

const inStock = parseAsBoolean.withDefault(false)
// ?inStock=true  →  true
// ?inStock=1     →  true
`),
    types: sig(`
export const parseAsBoolean: Parser<boolean>
`),
    behavior: [
      ['**Parse**', '`true` / `false` / `1` / `0` (case-insensitive)'],
      ['**Serialize**', "`'true'` or `'false'`"],
    ],
    returns: parserMethods,
    related: ['create-query-params', 'parsers-guide'],
    relatedLabels: { 'parsers-guide': 'Parsers guide' },
  },
  {
    slug: 'parse-as-iso-date',
    name: 'parseAsIsoDate',
    description: 'ISO date string ↔ `Date` parser.',
    usage: sig(`
import { parseAsIsoDate } from '@echojs-ecosystem/url-state'

const from = parseAsIsoDate.withDefault(new Date('2026-01-01'))
// ?from=2026-01-15T00:00:00.000Z
`),
    types: sig(`
export const parseAsIsoDate: Parser<Date>
`),
    behavior: [
      ['**Parse**', '`new Date(v)`; rejects invalid dates'],
      ['**Serialize**', '`date.toISOString()`'],
    ],
    returns: parserMethods,
    related: ['parse-as-timestamp', 'create-query-params'],
  },
  {
    slug: 'parse-as-timestamp',
    name: 'parseAsTimestamp',
    description: 'Unix timestamp (ms) as numeric string.',
    usage: sig(`
import { parseAsTimestamp } from '@echojs-ecosystem/url-state'

const t = parseAsTimestamp.withDefault(Date.now())
// ?t=1700000000000
`),
    types: sig(`
export const parseAsTimestamp: Parser<number>
`),
    behavior: [
      ['**Parse**', 'Numeric string → Unix timestamp (ms)'],
      ['**Serialize**', '`String(timestamp)`'],
    ],
    returns: parserMethods,
    related: ['parse-as-iso-date', 'create-query-params'],
  },
  {
    slug: 'parse-as-literal',
    name: 'parseAsLiteral',
    description: 'Enum parser — value must be in an allowed set.',
    usage: sig(`
import { parseAsLiteral, parseAsNumberLiteral, parseAsStringLiteral } from '@echojs-ecosystem/url-state'

const sort = parseAsLiteral(['relevance', 'price_asc', 'price_desc'] as const).withDefault('relevance')
const view = parseAsStringLiteral(['grid', 'list'] as const).withDefault('grid')
const size = parseAsNumberLiteral([1, 2, 3] as const).withDefault(1)
`),
    types: sig(`
export function parseAsLiteral<const Values extends readonly (string | number)[]>(
  values: Values,
): Parser<Values[number]>

export const parseAsStringLiteral: typeof parseAsLiteral
export const parseAsNumberLiteral: typeof parseAsLiteral
`),
    params: [
      ['`values`', '`readonly (string \\| number)[]`', '—', 'Allowed values; use `as const` for union typing'],
    ],
    behavior: [
      ['**Parse**', 'Value must be in the allowed set'],
      ['**Serialize**', '`String(value)`'],
      ['**Typing**', '`as const` array preserves union'],
    ],
    returns: parserMethods,
    related: ['parse-as-string', 'create-query-params', 'parsers-guide'],
    relatedLabels: { 'parsers-guide': 'Parsers guide' },
  },
  {
    slug: 'parse-as-array-of',
    name: 'parseAsArrayOf',
    description: 'Array parser — repeated keys or a single joined value.',
    usage: sig(`
import { parseAsArrayOf, parseAsString } from '@echojs-ecosystem/url-state'

// ?tag=a&tag=b  OR  ?tag=a,b,c
const tags = parseAsArrayOf(parseAsString, ',').withDefault([])
`),
    types: sig(`
export function parseAsArrayOf<Item>(
  item: Parser<Item>,
  separator?: string,
): MultiParser<Item[]>
`),
    params: [
      ['`item`', '`Parser<Item>`', '—', 'Parser for each array element'],
      ['`separator`', '`string`', '—', 'When set, one key split by separator; otherwise repeated keys'],
    ],
    behavior: [
      ['**No separator**', '`?tag=a&tag=b` (repeated keys)'],
      ['**With separator**', '`?tag=a,b,c` (single key, split)'],
      ['**On failure**', 'Returns `null` if any item fails `item.parse`'],
      ['**Equality**', 'Built-in `eq` compares lengths and `Object.is` per index'],
    ],
    returns: parserMethods,
    related: ['parse-as-native-array-of', 'is-multi-parser', 'create-query-params'],
  },
  {
    slug: 'parse-as-native-array-of',
    name: 'parseAsNativeArrayOf',
    description: 'Array parser for repeated keys only (`?id=1&id=2`).',
    usage: sig(`
import { parseAsInteger, parseAsNativeArrayOf } from '@echojs-ecosystem/url-state'

const ids = parseAsNativeArrayOf(parseAsInteger).withDefault([])
`),
    types: sig(`
export function parseAsNativeArrayOf<Item>(item: Parser<Item>): MultiParser<Item[]>
`),
    params: [['`item`', '`Parser<Item>`', '—', 'Parser for each repeated value']],
    behavior: [
      ['**Parse**', 'One string per repeated key only'],
      ['**Serialize**', 'One string per array item'],
      ['**Typical use**', 'Chained with `.withDefault([])`'],
    ],
    returns: parserMethods,
    related: ['parse-as-array-of', 'is-multi-parser', 'create-query-params'],
  },
  {
    slug: 'parse-as-json',
    name: 'parseAsJson',
    description: 'JSON object in a single query key with optional Standard Schema validation.',
    usage: sig(`
import { parseAsJson } from '@echojs-ecosystem/url-state'
import { z } from 'zod'

const layout = parseAsJson(
  z.object({ cols: z.number().int().min(1).max(4), collapsed: z.boolean() }),
).withDefault({ cols: 3, collapsed: false })
`),
    types: sig(`
export function parseAsJson<T = unknown>(schema?: JsonSchema<T>): Parser<T>
`),
    params: [['`schema`', '`JsonSchema<T>`', '—', 'Optional Zod / Valibot / Standard Schema validator']],
    behavior: [
      ['**Parse**', '`JSON.parse` + optional schema validation'],
      ['**Serialize**', '`JSON.stringify`'],
      ['**On error**', '`null` (invalid JSON or schema)'],
    ],
    returns: parserMethods,
    related: ['create-query-params', 'parsers-guide'],
    relatedLabels: { 'parsers-guide': 'Parsers guide' },
  },
  {
    slug: 'create-custom-parser',
    name: 'createCustomParser',
    description: 'Build a single-value parser with custom parse/serialize logic.',
    usage: sig(`
import { createCustomParser } from '@echojs-ecosystem/url-state'

const parseAsStars = createCustomParser<number>({
  parse: (raw) => {
    const v = Array.isArray(raw) ? raw[0] : raw
    if (v == null || v === '') return null
    const n = [...v].filter((c) => c === '★').length
    return n >= 1 && n <= 5 ? n : null
  },
  serialize: (n) => '★'.repeat(n),
  eq: (a, b) => a === b,
}).withDefault(3)
`),
    types: sig(`
import type { SearchParamValue } from '@echojs-ecosystem/url-state'

export type CustomParserConfig<Value> = {
  parse: (value: SearchParamValue) => Value | null
  serialize: (value: Value) => SearchParamValue
  eq?: (a: Value, b: Value) => boolean
}

export function createCustomParser<Value>(
  config: CustomParserConfig<Value>,
): Parser<Value>
`),
    params: [
      ['`config.parse`', '`(value) => Value \\| null`', '—', 'Raw query value → typed value'],
      ['`config.serialize`', '`(value) => SearchParamValue`', '—', 'Typed value → URL'],
      ['`config.eq`', '`(a, b) => boolean`', '—', "Optional; used with `defaultVisibility: 'hide'`"],
    ],
    behavior: [['**Mode**', "Sets `parserMode: 'single'`"]],
    returns: parserMethods,
    related: ['create-custom-multi-parser', 'is-multi-parser', 'parsers-guide'],
    relatedLabels: { 'parsers-guide': 'Parsers guide' },
  },
  {
    slug: 'create-custom-multi-parser',
    name: 'createCustomMultiParser',
    description: 'Build a multi-value parser for repeated query keys.',
    usage: sig(`
import { createCustomMultiParser } from '@echojs-ecosystem/url-state'

const parseAsSortedIds = createCustomMultiParser<number[]>({
  parse: (values) => {
    const nums = values.map((v) => Number(v))
    if (nums.some((n) => !Number.isFinite(n))) return null
    return nums
  },
  serialize: (ids) => ids.map(String),
  eq: (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
}).withDefault([])
`),
    types: sig(`
export type CustomMultiParserConfig<Value> = {
  parse: (values: string[]) => Value | null
  serialize: (value: Value) => string[]
  eq?: (a: Value, b: Value) => boolean
}

export function createCustomMultiParser<Value>(
  config: CustomMultiParserConfig<Value>,
): MultiParser<Value>
`),
    params: [
      ['`config.parse`', '`(values: string[]) => Value \\| null`', '—', 'All repeated values'],
      ['`config.serialize`', '`(value) => string[]`', '—', 'Back to repeated keys'],
      ['`config.eq`', '`(a, b) => boolean`', '—', 'Optional array/object equality'],
    ],
    behavior: [['**Mode**', "Sets `parserMode: 'multi'`"]],
    returns: parserMethods,
    related: ['create-custom-parser', 'is-multi-parser', 'parse-as-array-of'],
  },
  {
    slug: 'is-multi-parser',
    name: 'isMultiParser',
    description: "Type guard — `true` when `parser.parserMode === 'multi'`.",
    usage: sig(`
import { isMultiParser, parseAsArrayOf, parseAsString } from '@echojs-ecosystem/url-state'

const tags = parseAsArrayOf(parseAsString).withDefault([])

if (isMultiParser(tags)) {
  // tags.parserMode === 'multi'
}
`),
    types: sig(`
export function isMultiParser<Value>(
  parser: { parserMode?: string },
): parser is MultiParser<Value>
`),
    behavior: [['**Returns**', '`true` for multi parsers (`parseAsArrayOf`, `parseAsNativeArrayOf`, `createCustomMultiParser`, …)']],
    related: ['parse-as-array-of', 'parse-as-native-array-of', 'create-custom-multi-parser'],
  },
]
