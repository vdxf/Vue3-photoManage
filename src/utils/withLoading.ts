import { isBoolean } from '@daysnap/utils'
import { showLoadingToast, type ToastOptions } from 'vant'

export type WithLoadingOptions = boolean | string | ToastOptions

// 让一个异步函数具有 loading 的效果
export function withLoading<T extends (params?: any) => Promise<any>>(
  fn: T,
  opt: WithLoadingOptions = true
) {
  return async (
    params?: Parameters<T>[0],
    options: WithLoadingOptions = opt
  ): Promise<Awaited<ReturnType<T>>> => {
    if (isBoolean(options) && options) {
      options = { duration: 0 }
    }
    const toast = options ? showLoadingToast(options) : null
    try {
      const result = await fn(params)
      toast?.close()
      return result
    } catch (error) {
      toast?.close()
      throw error
    }
  }
}
