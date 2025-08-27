import { Button } from '@/components/ui/button'
import { ArrowLeft, HatGlasses } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Spotlight } from '@/components/ui/spotlight-new'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <main className=' relative w-full min-h-screen overflow-hidden'>
            <Spotlight />
            <div className='p-3 md:p-8 md:px-[8%] text-xl flex items-center justify-between'>
                <Link
                    href={"/"}
                    className='flex items-center rounded-full'
                >
                    <Button
                        className='rounded-full text-sm'
                        variant={"outline"}
                    >
                        <ArrowLeft />
                        Retour
                    </Button>
                </Link>

                <ThemeToggle />
            </div>

            <div className='flex flex-col items-center justify-center'>
                <div className='w-full flex items-center justify-center'>
                    <h2 className="text-2xl font-bold flex items-center">
                        <HatGlasses className="w-7 h-7 text-orange-500 mr-1" />
                        <span className="text-primary">Info</span>
                        <span className="dark:text-white">Wise</span>
                    </h2>
                </div>

                {children}

                <p className='text-center mb-4'>
                    En vous connectant, vous acceptez nos <br />
                    <a href="#" className='text-primary/40 hover:underline'>politiques de confidentialités</a> ainsi que <br />
                    nos <a href="#" className='text-primary/40 hover:underline'>conditions d&apos;utilisation</a>
                </p>
            </div>
        </main>
    )
}

export default layout