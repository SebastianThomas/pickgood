import axios from 'axios'
import { cacheBillbeeResponse } from '../../cache/cacheUtils'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
export type HTTP_Methods = typeof METHODS
export type HTTP_Method = HTTP_Methods[number]

export default class BillBeeRequest {
  private static readonly BILLBEE_API_KEY = process.env.BILLBEE_API_KEY || ''
  private static readonly BILLBEE_USER = process.env.BILLBEE_USER || ''
  private static readonly BILLBEE_PASSWORD = process.env.BILLBEE_PASSWORD || ''

  private static BILLBEE_BASE64_ENCODED_AUTH: string

  method: HTTP_Method
  URL: string
  data?: any

  /**
   * Create a BillBeeRequest object.
   * @param method HTTP method (one of {@link HTTP_Methods}) to use
   * @param URL REST Endpoint URL (base URL is `https://api.billbee.io/api/v1`)
   * @param options Options for the request
   * @see {@link send()}
   */
  constructor(method: HTTP_Method, URL: string, options: { data?: any } = {}) {
    this.method = method
    this.URL = URL
    this.data = options.data
  }

  async send<R>(): Promise<R> {
    const responseData = await axios({
      method: this.method,
      headers: {
        'X-Billbee-Api-Key': BillBeeRequest.BILLBEE_API_KEY,
        Authorization: `Basic ${BillBeeRequest.BILLBEE_BASE64_ENCODED_AUTH}`,
      },
      baseURL: 'https://api.billbee.io/api/v1',
      url: this.URL,
      data: this.data,
    })

    cacheBillbeeResponse(responseData, this.method, this.URL, this.data).then(
      () => console.log(`Successfully cached ${this.method} ${this.URL}`)
    )

    return responseData.data
  }

  static {
    if (
      BillBeeRequest.BILLBEE_API_KEY === '' ||
      BillBeeRequest.BILLBEE_USER === '' ||
      BillBeeRequest.BILLBEE_PASSWORD === ''
    ) {
      throw new Error('Billbee API KEY, User or password not correctly set up.')
    }

    // Compute Basic Auth Header
    this.BILLBEE_BASE64_ENCODED_AUTH = Buffer.from(
      `${BillBeeRequest.BILLBEE_USER}:${BillBeeRequest.BILLBEE_PASSWORD}`
    ).toString('base64')
  }
}
