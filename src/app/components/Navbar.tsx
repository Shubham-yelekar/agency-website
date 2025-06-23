import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='font-mono uppercase flex gap-8 justify-between text-neutral-500 p-4'>
      <Link className='text-neutral-50' href={"#"}>Home</Link>
      <Link href={"/projects"}>Portfolio</Link>
      <Link href={"#"}>Services</Link>
      <Link href={"/journey"}>Journey</Link>
      <Link href={"#"}>About</Link>
    </div>
  )
}

export default Navbar