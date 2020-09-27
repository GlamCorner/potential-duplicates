import * as core from '@actions/core'
import * as github from '@actions/github'

export namespace Util {
  export function getOctokit() {
    const token = core.getInput('GITHUB_TOKEN', { required: true })
    return github.getOctokit(token)
  }

  export function isValidEvent(event: string, actions?: string | string[]) {
    const context = github.context
    const payload = context.payload
    if (event === context.eventName) {
      if (actions == null) {
        return true
      }
      if (Array.isArray(actions)) {
        return actions.some((action) => action === payload.action)
      }

      return actions === payload.action
    }
    return false
  }
}
