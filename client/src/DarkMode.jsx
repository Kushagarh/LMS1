import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './components/ThemeProvider'

const DarkMode = () => {
  const {setTheme} = useTheme();
  return (
    <DropdownMenu className="dark:text-white">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='border rounded-xl dark:text-white' size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" bg-white hover:cursor-pointer">
        <DropdownMenuItem onClick={() => setTheme("light")} className=" bg-white hover:cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className=" bg-white hover:cursor-pointer">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className=" bg-white hover:cursor-pointer">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DarkMode