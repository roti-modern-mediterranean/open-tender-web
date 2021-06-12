import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  openModal,
  selectAPI,
  selectModalPrefs,
  setModalPref,
} from '../../../slices'

const MenuModal = () => {
  const dispatch = useDispatch()
  const [post, setPost] = useState(null)
  const [hasPost, setHasPost] = useState(false)
  const api = useSelector(selectAPI)
  const { outOfStock } = useSelector(selectModalPrefs) || {}

  useEffect(() => {
    if (post && !hasPost) {
      setHasPost(true)
      dispatch(openModal({ type: 'outOfStock', args: post }))
    }
  }, [dispatch, post, hasPost])

  useEffect(() => {
    let isCancelled = false
    const fetchPost = async () => {
      try {
        let response = await api.getPost('out-of-stock')
        if (!isCancelled && !outOfStock) {
          setPost(response)
        }
      } catch (err) {
        // reset modal preference
        dispatch(setModalPref({ modal: 'outOfStock', pref: false }))
      }
    }
    if (!hasPost) fetchPost()
    return () => {
      isCancelled = true
    }
  }, [api, outOfStock, hasPost, dispatch])

  return null
}

MenuModal.displayName = 'MenuModal'

export default MenuModal
