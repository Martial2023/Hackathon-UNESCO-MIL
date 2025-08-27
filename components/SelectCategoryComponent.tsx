'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categories } from '@/lib/categories'
import { BookOpen, Cpu, MoreHorizontal, ShieldAlert } from 'lucide-react'
import React from "react"


type Props = {
    category: string
    setCategory: (id: string) => void
}
const SelectCategoryComponent = ({ category, setCategory }: Props) => {
    
    return (
        <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-full cursor-pointer rounded-full p-4">
                <SelectValue placeholder="Choisissez une catégorie" />
            </SelectTrigger>
            <SelectContent className="w-full cursor-pointer">
                <SelectGroup className="w-full">
                    <SelectLabel>{categories.length > 0 ? "Topic" : "No topics available"}</SelectLabel>
                    {
                        categories.map((category) => {
                            return (
                                <SelectItem className='w-full' key={category.label} value={category.label}>
                                    {category.icon}
                                    {category.label}
                                </SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectCategoryComponent