import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { isEnvTruthy } from '../envUtils.js'

export type APIProvider =
  | 'firstParty'
  | 'openrouter'
  | 'openai'
  | 'bedrock'
  | 'vertex'
  | 'foundry'

function getExplicitProviderOverride(): APIProvider | null {
  const rawProvider =
    process.env.BETTER_CLAWD_API_PROVIDER ??
    process.env.CLAUDE_CODE_API_PROVIDER
  switch (rawProvider?.toLowerCase()) {
    case 'anthropic':
    case 'firstparty':
    case 'first_party':
    case 'first-party':
      return 'firstParty'
    case 'openrouter':
      return 'openrouter'
    case 'openai':
      return 'openai'
    case 'bedrock':
      return 'bedrock'
    case 'vertex':
      return 'vertex'
    case 'foundry':
      return 'foundry'
    default:
      return null
  }
}

export function isOpenRouterBaseUrl(baseUrl?: string | null): boolean {
  if (!baseUrl) {
    return false
  }
  try {
    return new URL(baseUrl).host === 'openrouter.ai'
  } catch {
    return false
  }
}

export function isOpenRouterConfigured(): boolean {
  return (
    getExplicitProviderOverride() === 'openrouter' ||
    Boolean(process.env.OPENROUTER_API_KEY) ||
    isOpenRouterBaseUrl(process.env.OPENROUTER_BASE_URL) ||
    isOpenRouterBaseUrl(process.env.ANTHROPIC_BASE_URL)
  )
}

export function isOpenAIConfigured(): boolean {
  return (
    getExplicitProviderOverride() === 'openai' ||
    Boolean(process.env.OPENAI_API_KEY) ||
    Boolean(process.env.OPENAI_BASE_URL) ||
    Boolean(process.env.OPENAI_ACCESS_TOKEN) ||
    Boolean(process.env.CODEX_ACCESS_TOKEN)
  )
}

export function getOpenRouterBaseUrl(): string {
  return process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1'
}

export function getOpenAIBaseUrl(): string {
  return process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'
}

export function getAPIProvider(): APIProvider {
  const explicitProvider = getExplicitProviderOverride()
  if (explicitProvider) {
    return explicitProvider
  }

  return isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK)
    ? 'bedrock'
    : isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)
      ? 'vertex'
      : isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY)
        ? 'foundry'
        : isOpenAIConfigured()
          ? 'openai'
          : isOpenRouterConfigured()
            ? 'openrouter'
            : 'firstParty'
}

export function getAPIProviderForStatsig(): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return getAPIProvider() as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

export function isAnthropicCompatibleProvider(
  provider: APIProvider = getAPIProvider(),
): boolean {
  return provider !== 'openai'
}

/**
 * Check if ANTHROPIC_BASE_URL is a first-party Anthropic API URL.
 * Returns true if not set (default API) or points to api.anthropic.com
 * (or api-staging.anthropic.com for ant users).
 */
export function isFirstPartyAnthropicBaseUrl(): boolean {
  const baseUrl = process.env.ANTHROPIC_BASE_URL
  if (!baseUrl) {
    return true
  }
  try {
    const host = new URL(baseUrl).host
    const allowedHosts = ['api.anthropic.com']
    if (process.env.USER_TYPE === 'ant') {
      allowedHosts.push('api-staging.anthropic.com')
    }
    return allowedHosts.includes(host)
  } catch {
    return false
  }
}
