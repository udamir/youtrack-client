export type WidgetApi = (props: WidgetApiProps) => void

export type WidgetApiProps = {
  onRefresh?(): Promise<void>
  onConfigure?(): Promise<void>
}

export type DashboardApi = {
  setTitle(label: string, labelUri?: string): void
  setLoadingAnimationEnabled(enabled: boolean): void
  alert(message: string, type?: string, timeout?: number): string
  enterConfigMode(): void
  exitConfigMode(): void
  storeCache(cache: object): Promise<void>
  readCache(): Promise<object>
  storeConfig(config: object): Promise<void>
  readConfig(): Promise<object>
  fetch<T>(serviceID: string, url: string, fetchConfig?: object): Promise<T>
  fetchHub<T>(url: string, fetchConfig?: object): Promise<T>
  loadServices(applicationName: string): Promise<Service[]>
  removeWidget(): void
}

export type Service = {
  type: string
  id: string
  name: string
  key: string
  homeUrl: string
  applicationName: string
  vendor: string
  version: string
  trusted: boolean
}
