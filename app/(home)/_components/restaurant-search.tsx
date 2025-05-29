'use client'

import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export function RestaurantSearch() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    if (!search) {
      return
    }

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button
        size="icon"
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600"
      >
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}
