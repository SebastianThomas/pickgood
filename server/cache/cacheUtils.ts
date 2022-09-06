import { AxiosResponse, AxiosResponseHeaders } from 'axios'

import * as fs from 'fs-extra'
import { HTTP_Method } from '../connector/billbee/BillBeeRequest'

type CachedBillbeeResponse = {
  cacheTime: Date
  request: { data: any }
  response: {
    data: any
    headers: AxiosResponseHeaders
    status: number
  }
}

type BillbeeResponseCache = {
  [key: string]: CachedBillbeeResponse
}

/**
 * Caches a response for a request
 * @param response The whole response (`express.Response`)-object (to be cached)
 * @param method The HTTP Method used for the request
 * @param url The request endpoint (after the Base-URL)
 * @param requestData The data that was sent to configure the request (only applies to HTTP Methods that support a request body)
 * @throws An Error if the `response.status`-code is 400 or higher
 */
export const cacheBillbeeResponse = async (
  response: AxiosResponse,
  method: HTTP_Method,
  url: string,
  requestData?: any
) => {
  await fs.ensureDir(__dirname + `tmp/cache`)
  await fs.ensureFile(`tmp/cache/billbeeCache.json`)
  const { data, headers, status } = response
  if (!(response.status < 400))
    throw new Error(`Should not log 400+ status code.`)

  let currentCache: BillbeeResponseCache
  try {
    currentCache = await fs.readJSON(`tmp/cache/billbeeCache.json`)
  } catch (err) {
    currentCache = {}
  }
  const payload = currentCache
  payload[`${method}-${url}`] = {
    cacheTime: new Date(),
    request: { data: requestData },
    response: {
      data,
      headers,
      status,
    },
  }
  await fs.outputJSON(`tmp/cache/billbeeCache.json`, payload)
}

export const getCachedBillbeeResponse = async (
  method: HTTP_Method,
  url: string
): Promise<CachedBillbeeResponse> => {
  const cache: BillbeeResponseCache = await fs.readJSON(
    `tmp/cache/billbeeCache.json`
  )
  return cache[`${method}-${url}`]
}

export const getMatchingCaches = async (
  urlContains: RegExp
): Promise<BillbeeResponseCache> => {
  const cache: BillbeeResponseCache = await fs.readJSON(
    `tmp/cache/billbeeCache.json`
  )
  const result: BillbeeResponseCache = {}
  for (const key in cache) {
    if (urlContains.test(key)) {
      result[key] = cache[key]
    }
  }

  return result
}
