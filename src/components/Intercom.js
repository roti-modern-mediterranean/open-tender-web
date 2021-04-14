import React, { useEffect, useState } from 'react'

const Intercom = () => {
  const [intercom, setIntercom] = useState(null)

  useEffect(() => {
    if (window.Intercom) {
      window.Intercom('boot', {
        app_id: 'ks8q897k',
        alignment: 'left',
        custom_launcher_selector: '#intercom-launcher',
      })
    }
  }, [intercom])

  useEffect(() => {
    if (process.browser) {
      let w = window
      let ic = w.Intercom
      if (typeof ic === 'function') {
        ic('reattach_activator')
        ic('update', w.intercomSettings)
      } else {
        let d = document
        let i = function () {
          i.c(arguments)
        }
        i.q = []
        i.c = function (args) {
          i.q.push(args)
        }
        w.Intercom = i
        let l = function () {
          let s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://widget.intercom.io/widget/ks8q897k'
          var x = d.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
          setTimeout(() => {
            setIntercom(window.Intercom)
          }, 2000)
        }
        if (w.attachEvent) {
          w.attachEvent('onload', l)
        } else {
          w.addEventListener('load', l, false)
        }
      }
    }
  }, [])

  return <></>
}

export default Intercom
