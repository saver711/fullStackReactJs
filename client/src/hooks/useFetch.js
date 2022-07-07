import { useEffect, useState } from "react"


export default function useFetch(url) {
  const [data, dataUpdater] = useState(null)
  const [error, errorUpdater] = useState(null)
  const [loading, loadingUpdater] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        loadingUpdater(true)
        const res = await fetch(url)
        const data = await res.json()
        dataUpdater(data)
        loadingUpdater(false)
      } catch (error) {
        errorUpdater(error)
      }
    })()
  }, [url])

  return { data, error, loading }
}
