import { Socket } from 'socket.io'
import { None, Optional, Some } from '../util/Optional'

// E.g., ProductId1: [socketClient1, socketClient2]
export class IndexValue<K, T> {
  /**
   * Just for information: the key the Sets are belonging to.
   */
  readonly key: K
  values: Set<T>

  constructor(key: K, value: T) {
    this.key = key
    this.values = new Set<T>([value])
  }

  /**
   * Add one value to `values`.
   * @param value The value to add
   */
  add(value: T) {
    this.values.add(value)
  }

  /**
   * Remove one value from `values`.
   * @param value The value to remove from `values`
   * @returns Whether a value was removed or not
   */
  remove(value: T): boolean {
    return this.values.delete(value)
  }
}

export class IndexCategory<T> {
  entries: { [key: string]: IndexValue<string, T> } = {}

  constructor(key: string, value: T) {
    this.entries[key] = new IndexValue<string, T>(key, value)
  }

  /**
   * Add a value of type `T` to the searchable category.
   * @param key Key to add
   * @param value Value to add
   */
  add(key: string, value: T) {
    if (typeof this.entries[key] === 'undefined')
      this.entries[key] = new IndexValue<string, T>(key, value)
    else this.entries[key].add(value)
  }

  delete(key: string, value: T): boolean {
    return this.entries[key].remove(value)
  }

  /**
   * Search for an entry in the category.
   * @param key Key to search for
   * @returns The entry at the specified key
   */
  get(key: string): IndexValue<string, T> {
    return this.entries[key]
  }
}

/**
 * A `PropertiesMap` facilitates searching for specific clients in a map.
 * This could be for example:
 *
 * ```
 * const p: PropertiesMap<T> = {
 *   "product": [
 *     "productId1": Set(
 *       p1  instanceof  T,
 *       p2  instanceof  T
 *     ),
 *     "productId2": Set(
 *       p1  instanceof  T,
 *       p3  instanceof  T,
 *     )
 *   ]
 * }
 * ```
 * where
 * - `p`          `instanceof PropertiesMap` and
 * - `product`    `instanceof IndexCategory`, while
 * - `productId1` `instanceof IndexValue<T>` and
 * - `productId2` `instanceof IndexValue<T>`.
 */
export class PropertiesMap<T> {
  // private categories: { [category: string]: IndexCategory<T> }
  private categories: Map<string, IndexCategory<T>>

  constructor() {
    this.categories = new Map<string, IndexCategory<T>>()
  }

  /**
   *
   * @param category The new category to create or the category to add entry to
   * @param entry The Entry to add to the category
   */
  add(category: string, key: string, entry: T): void {
    const cat = this.categories.get(category)
    // Create a new category if not exists
    if (typeof cat === 'undefined')
      this.categories.set(category, new IndexCategory(key, entry))
    // Add to an existing category otherwise
    else cat.add(key, entry)
  }

  deleteEntry(entry: T) {
    for (const c of this.categories) {
      for (const key in c[1].entries) {
        c[1].entries[key].remove(entry)
      }
    }
  }

  getCategory(category: string): Optional<IndexCategory<T>> {
    const cat = this.categories.get(category)

    if (typeof cat === 'undefined') return { type: 'none' }
    return { type: 'some', value: cat }
  }

  delete(category: string, key: string, entry: T): boolean {
    const cat = this.getCategory(category)
    if (cat.type === 'some') {
      return cat.value.delete(key, entry)
    }

    return false
  }
}

export class SocketIOClient {
  readonly client: Socket

  constructor(socket: Socket) {
    this.client = socket
  }
}

export class SocketIOClientMap {
  clients: SocketIOClient[] = []
  properties: PropertiesMap<SocketIOClient>

  constructor() {
    this.properties = new PropertiesMap()
  }

  add(client: Socket | SocketIOClient) {
    this.clients.push(
      client instanceof SocketIOClient ? client : new SocketIOClient(client)
    )
  }

  remove(c: SocketIOClient) {
    this.clients = this.clients.filter((client: SocketIOClient) => client === c)
    this.properties.deleteEntry(c)
  }

  clientSubscribe(category: string, key: string, client: SocketIOClient) {
    this.properties.add(category, key, client)
  }

  clientUnsubscribe(category: string, key: string, client: SocketIOClient) {
    this.properties.delete(category, key, client)
  }

  getSubscribers(category: string, key: string): Set<SocketIOClient> {
    const cat = this.properties.getCategory(category)
    if (cat.type === 'none') return new Set<SocketIOClient>()
    return cat.value.get(key).values
  }
}

const clientMap = new SocketIOClientMap()

export const notifyClientChange = (
  category: string,
  key: string,
  event: string,
  payload: any
) => {
  ;[...clientMap.getSubscribers(category, key)].map(({ client }) => {
    client.emit(event, payload)
  })
}

export default clientMap
