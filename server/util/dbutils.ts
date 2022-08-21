// ---------------------------------- IDs ----------------------------------
// Documentation to ids: https://www.npmjs.com/package/hashids

import Hashids from 'hashids'
import { NumberLike } from 'hashids/cjs/util'

/**
 * The HashIDs-instance to en- and decode the id hashes.
 */
const hashids = new Hashids(process.env.ID_HASH_SALT || 'enoN', 8)

/**
 * Converts number ID to string.
 * @param intID The integer number to encode
 * @returns The string hash
 */
export const getHashFromIntID = (intID: number | NumberLike) => {
  const result = hashids.encode(intID)
  if (result === '') throw new Error('Invalid input')
  return result
}
/**
 * Parse a string hash from an ID (to a string)
 * @param hash The string hash to decode
 * @returns The decoded number
 */
export const getIntIDFromHash = (hash: string) => {
  const result = hashids.decode(hash)
  if (typeof result[0] === undefined || result[0] < 0)
    throw new Error('Invalid input')
  return result[0]
}
