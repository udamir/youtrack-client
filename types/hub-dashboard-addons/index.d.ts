declare module "hub-dashboard-addons" {
  export type WidgetApi = (props: WidgetApiProps) => void

  export type WidgetApiProps = {
    onRefresh?(): Promise<void>
    onConfigure?(): Promise<void>
  }

  export interface HubService {
    id: string
    applicationName: string
    homeUrl: string
    key: string
    name: string
    trusted: boolean
    type: string
    vendor: string
    version: string
  }

  type AlertType = "error" | "message" | "success" | "warning" | "loading"

  export type DashboardApi = {
    setTitle(label: string, labelUri?: string): Promise<void>
    setLoadingAnimationEnabled(enabled: boolean): Promise<void>

    alert(message: string, type?: AlertType, timeout?: number, options?: object): string | number
    setError(e: Error): Promise<void>
    clearError(): Promise<void>

    enterConfigMode(): Promise<void>
    exitConfigMode(): Promise<void>

    readCache<T extends object>(): Promise<T | null>
    storeCache(cache: object): Promise<void>

    readConfig<T extends object>(): Promise<T | null>
    storeConfig(config: object): Promise<void>

    fetch<T>(serviceID: string, url: string, fetchConfig?: object): Promise<T>
    fetchHub<T>(url: string, fetchConfig?: object): Promise<T>
    downloadFile(serviceID: string, relativeURL: string, requestParams: unknown, fileName?: string): Promise<void>

    loadServices(applicationName: string): Promise<HubService[]>
    removeWidget(): void
  }

  const addon: {
    locale: string
    editable: boolean
    registerWidget: (widget: (dashboardApi: DashboardApi, widgetApi: WidgetApi) => Promise<void>) => void
  }

  export default addon
}

declare module "hub-dashboard-addons/dist/localization" {
  interface Dictionary {
    [key: string]: string | Record<string, string>
  }

  interface Translations {
    [lang: string]: Dictionary
  }

  export const i18n: {
    (
      text: string,
      interpolationObject?: Record<string, string | number>,
      numberForPlurals?: number,
      context?: string,
    ): string
    plural(
      count: number,
      textForUnique: string,
      textForPlural: string,
      interpolationObject?: Record<string, string | number>,
      context?: string,
    ): string
  }

  export const i18nTimeIdentifiers: Record<string, unknown>

  export function setLocale(lang: string, translations: Translations): void
}
