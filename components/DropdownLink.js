import React from 'react';
import Link from 'next/link';

const DropdownLink = (props) => {
    let{href, children, ...rest}=props;
  return (
    <Link href={href}>
        <h3 {...rest}>{children}</h3>
    </Link>
  )
}

export default DropdownLink