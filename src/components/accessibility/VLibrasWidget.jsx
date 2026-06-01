import { useEffect, useRef } from 'react'

const VLIBRAS_APP_URL = 'https://vlibras.gov.br/app'
const VLIBRAS_SCRIPT_URL = `${VLIBRAS_APP_URL}/vlibras-plugin.js`
const VLIBRAS_SCRIPT_ID = 'vlibras-plugin-script'
const VLIBRAS_ROOT_ID = 'vlibras-widget-root'
const OPEN_ATTEMPTS = 20
const OPEN_INTERVAL_MS = 140

function ensureWidgetRoot() {
  let root = document.getElementById(VLIBRAS_ROOT_ID)

  if (!root) {
    root = document.createElement('div')
    root.id = VLIBRAS_ROOT_ID
    root.setAttribute('vw', '')
    root.className = 'enabled'

    const accessButton = document.createElement('div')
    accessButton.setAttribute('vw-access-button', '')
    accessButton.className = 'active'

    const pluginWrapper = document.createElement('div')
    pluginWrapper.setAttribute('vw-plugin-wrapper', '')

    const topWrapper = document.createElement('div')
    topWrapper.className = 'vw-plugin-top-wrapper'

    pluginWrapper.appendChild(topWrapper)
    root.appendChild(accessButton)
    root.appendChild(pluginWrapper)
    document.body.appendChild(root)
  }

  return root
}

function getAccessButton() {
  return document.querySelector(`#${VLIBRAS_ROOT_ID} [vw-access-button]`)
}

function getPluginWrapper() {
  return document.querySelector(`#${VLIBRAS_ROOT_ID} [vw-plugin-wrapper]`)
}

function isAccessUiReady() {
  return Boolean(
    document.querySelector(`#${VLIBRAS_ROOT_ID} [vw-access-button] .access-button`) &&
      document.querySelector(`#${VLIBRAS_ROOT_ID} [vw-access-button] .pop-up`),
  )
}

function hideResidualHints() {
  document.querySelectorAll('.vw-links').forEach((node) => node.remove())
}

function hideRoot() {
  const root = document.getElementById(VLIBRAS_ROOT_ID)
  if (root) {
    root.classList.add('is-hidden')
  }
}

function showRoot() {
  const root = ensureWidgetRoot()
  root.classList.remove('is-hidden')
}

function setDisabledClass(disabled) {
  document.documentElement.classList.toggle('vlibras-disabled', disabled)
}

function closePanel() {
  const accessButton = getAccessButton()
  const wrapper = getPluginWrapper()

  if (accessButton && wrapper?.classList.contains('active')) {
    accessButton.click()
  }

  if (window.plugin?.player && typeof window.plugin.player.stop === 'function') {
    window.plugin.player.stop()
  }

  hideResidualHints()
}

function ensureScriptLoaded() {
  if (window.VLibras?.Widget) {
    return Promise.resolve()
  }

  if (window.__riskcareVlibrasScriptPromise) {
    return window.__riskcareVlibrasScriptPromise
  }

  window.__riskcareVlibrasScriptPromise = new Promise((resolve, reject) => {
    let script = document.getElementById(VLIBRAS_SCRIPT_ID)

    const onScriptLoad = () => resolve()
    const onScriptError = () => {
      window.__riskcareVlibrasScriptPromise = null
      reject(new Error('Nao foi possivel carregar o script do VLibras.'))
    }

    if (!script) {
      script = document.createElement('script')
      script.id = VLIBRAS_SCRIPT_ID
      script.src = VLIBRAS_SCRIPT_URL
      script.async = true
      script.defer = true
      script.addEventListener('load', onScriptLoad, { once: true })
      script.addEventListener('error', onScriptError, { once: true })
      document.body.appendChild(script)
      return
    }

    if (window.VLibras?.Widget) {
      resolve()
      return
    }

    script.addEventListener('load', onScriptLoad, { once: true })
    script.addEventListener('error', onScriptError, { once: true })
  })

  return window.__riskcareVlibrasScriptPromise
}

function ensureWidgetInitialized() {
  if (window.__riskcareVlibrasReady) {
    return
  }

  if (!window.VLibras?.Widget) {
    throw new Error('VLibras.Widget nao encontrado apos carregar o script.')
  }

  window.__riskcareVlibrasInstance = new window.VLibras.Widget(VLIBRAS_APP_URL)
  window.__riskcareVlibrasReady = true

  if (document.readyState === 'complete' && typeof window.onload === 'function') {
    window.setTimeout(() => {
      if (window.__riskcareVlibrasBootstrapped || typeof window.onload !== 'function') {
        return
      }

      window.__riskcareVlibrasBootstrapped = true
      window.onload()
    }, 0)
  }
}

function openPanelWithRetry(isEnabledRef) {
  let attempts = 0

  const tryOpen = () => {
    if (!isEnabledRef.current) {
      return
    }

    const accessButton = getAccessButton()
    const wrapper = getPluginWrapper()

    if (!accessButton || !wrapper || !isAccessUiReady()) {
      if (attempts < OPEN_ATTEMPTS) {
        attempts += 1
        window.setTimeout(tryOpen, OPEN_INTERVAL_MS)
      }
      return
    }

    if (!wrapper.classList.contains('active')) {
      accessButton.click()

      if (attempts < OPEN_ATTEMPTS) {
        attempts += 1
        window.setTimeout(tryOpen, OPEN_INTERVAL_MS)
      }
    }
  }

  tryOpen()
}

function enableVlibras(isEnabledRef) {
  setDisabledClass(false)
  showRoot()

  ensureScriptLoaded()
    .then(() => {
      if (!isEnabledRef.current) {
        return
      }

      ensureWidgetInitialized()
      openPanelWithRetry(isEnabledRef)
    })
    .catch(() => {
      closePanel()
      hideRoot()
      setDisabledClass(true)
    })
}

function disableVlibras() {
  closePanel()
  hideRoot()
  setDisabledClass(true)
}

function VLibrasWidget({ enabled, onPanelOpenChange }) {
  const isEnabledRef = useRef(enabled)

  useEffect(() => {
    isEnabledRef.current = enabled
  }, [enabled])

  useEffect(() => {
    if (typeof onPanelOpenChange !== 'function') {
      return undefined
    }

    let isDisposed = false
    let previousState = null

    const syncPanelState = () => {
      if (isDisposed) {
        return
      }

      const isOpen = Boolean(getPluginWrapper()?.classList.contains('active'))

      if (previousState !== isOpen) {
        previousState = isOpen
        onPanelOpenChange(isOpen)
      }
    }

    syncPanelState()
    const timerId = window.setInterval(syncPanelState, 250)

    return () => {
      isDisposed = true
      window.clearInterval(timerId)
    }
  }, [onPanelOpenChange])

  useEffect(() => {
    window.__riskcareCloseVlibrasPanel = () => {
      closePanel()
    }

    return () => {
      delete window.__riskcareCloseVlibrasPanel
    }
  }, [])

  useEffect(() => {
    let timeoutId

    const warmUp = () => {
      ensureScriptLoaded().catch(() => {
        // Ignore warm-up failures; user can still retry on explicit toggle.
      })
    }

    if ('requestIdleCallback' in window) {
      timeoutId = window.requestIdleCallback(warmUp, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(warmUp, 1200)
    }

    return () => {
      if ('cancelIdleCallback' in window && typeof timeoutId === 'number') {
        window.cancelIdleCallback(timeoutId)
      } else {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      enableVlibras(isEnabledRef)
      return undefined
    }

    onPanelOpenChange?.(false)
    disableVlibras()
    return undefined
  }, [enabled, onPanelOpenChange])

  return null
}

export default VLibrasWidget
