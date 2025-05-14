import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
  import { Button } from "./ui/button";
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from '../DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet";
 
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate=useNavigate();

    const logoutHandler=async ()=>{
      await logoutUser();
    }

    useEffect(()=>{
      if(isSuccess){
        toast.success(data?.message|| "User log out.");
        navigate('/login');
      }
    },[isSuccess])

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
         {/* Desktop */}
        <div className="max-w-6xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
          <div className="flex items-center gap-2">
            <School className="dark:text-white" size={"30"} />
            <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl dark:text-white">
              E-Learning
            </h1>
            </Link>
            
          </div>
           {/* User icons and dark mode icon  */}
          <div className='flex items-center gap-5'>
             {
                user? (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button variant="outline" className='border rounded-xl hover:bg-slate-200'>Open</Button> */}
                      <Avatar>
                      <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className=' '>
                          <span className='hover:bg-slate-200 w-full h-full cursor-pointer'><Link to={"/my-learning"}>My learning</Link></span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <span className='hover:bg-slate-200 w-full h-full cursor-pointer'><Link to={"/profile"}>Edit Profile</Link></span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logoutHandler}>
                        <span className='hover:bg-slate-200 w-full h-full cursor-pointer'> Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem> <span className='hover:bg-slate-200 w-full h-full cursor-pointer'><Link to={"/admin/dashboard"}>Dashboard</Link></span> </DropdownMenuItem>
                  </>
                )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                    <div className='flex items-center gap-2'> 
                     <Button variant="outline" className="bg-gray-200 text-black hover:bg-gray-400 border rounded-xl" onClick={() => navigate("/login")}>Login</Button>
                     <Button variant="outline" className="bg-blue-950 text-white hover:bg-blue-800 border rounded-xl" onClick={() => navigate("/login")}>SignUp</Button>
                    </div>
                )
             }
             <DarkMode />
          </div>
        </div> 

        {/* Mobile App */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
           <h1 className="font-extrabold text-2xl dark:text-white"><Link to="/">E-Learning</Link></h1>
           <MobileNavbar user={user}/>
         </div>
    </div>
  )
}

export default Navbar;


const MobileNavbar=({user})=>{
    // const role="instructor";
     const navigate=useNavigate();
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full dark:text-white hover:bg-gray-200">
            <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-white flex flex-col '>
        <SheetHeader className='flex flex-row items-center justify-between mt-2'>
          <SheetTitle><Link to="/">E-Learning</Link></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className='mr-2'/>
        <nav className='flex flex-col space-y-4'> 
        <Link to="/my-learning">My Learning</Link>
        <Link to="/profile">Edit Profile</Link>
            <p>Log Out</p>
        </nav>
        {
            user?.role === 'instructor' && (
                <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit"onClick={()=> navigate("/admin/dashboard")} className='bg-blue-950 text-white hover:bg-blue-800 border rounded-xl'>Dashboard</Button>
                </SheetClose>
              </SheetFooter>
            )
        }
        
      </SheetContent>
    </Sheet>
    )
}