import React from 'react';
import { useRouter } from 'next/router';

const editProduct = () => {
    const router = useRouter()
    const {slug} = router.query
  return (
    <div>{slug}</div>
  )
}

export default editProduct