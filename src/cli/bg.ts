import { unsupportedEntrypoint } from '../utils/unsupportedEntrypoint.js'

export async function psHandler(): Promise<never> {
  return unsupportedEntrypoint('better-clawd ps')
}

export async function logsHandler(): Promise<never> {
  return unsupportedEntrypoint('better-clawd logs')
}

export async function attachHandler(): Promise<never> {
  return unsupportedEntrypoint('better-clawd attach')
}

export async function killHandler(): Promise<never> {
  return unsupportedEntrypoint('better-clawd kill')
}

export async function handleBgFlag(): Promise<never> {
  return unsupportedEntrypoint('better-clawd --bg')
}
