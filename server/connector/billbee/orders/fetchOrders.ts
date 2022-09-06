import { AxiosError } from 'axios'
import { BillbeeOrderType } from 'pickgood-types'
import BillBeeRequest from '../BillBeeRequest'

/**
 * https://app.billbee.io//swagger/ui/index#!/Orders/OrderApi_GetList
 */
export type FetchOrdersResponseType = {
  //  ok: true
  Paging: {
    Page: number
    TotalPages: number
    TotalRows: number
    PageSize: number
  }
  ErrorMessage: string
  ErrorCode: number
  ErrorDescription: number
  Data: BillbeeOrderType[]
}

export const fetchOrders = async (payload: {
  page?: string | number
}): Promise<
  | (FetchOrdersResponseType & { ok: true })
  | { ok: false; error: string; status?: number; data?: any }
> => {
  try {
    return {
      ok: true,
      ...(await new BillBeeRequest(
        'GET',
        `/orders?${payload.page ? `page=${payload.page}` : ''}`
      ).send<FetchOrdersResponseType>()),
    }
  } catch (err) {
    console.log(err)
    if (err instanceof AxiosError) {
      return {
        ok: false,
        error: err.message,
        status: err.response?.status,
        data: err.response?.data,
      }
    }

    return { ok: false, error: 'Unknown error' }
  }
}
