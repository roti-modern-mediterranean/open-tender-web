import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { openModal, selectAPI, selectModalPrefs } from '../../../slices'

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
        if (!isCancelled) {
          setPost(response)
        }
      } catch (err) {
        // okay if post is not found
      }
    }
    if (!outOfStock && !hasPost) fetchPost()
    return () => {
      isCancelled = true
    }
  }, [api, outOfStock, hasPost])

  return null
}

MenuModal.displayName = 'MenuModal'

export default MenuModal
