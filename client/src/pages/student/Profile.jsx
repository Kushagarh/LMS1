import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '../../components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from '../../features/api/authApi';
import { toast } from "sonner";



const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

     const {data,isLoading,refetch}=useLoadUserQuery();
    //  console.log(data);
    
    const [
        updateUser,
        {
          data: updateUserData,
          isLoading: updateUserIsLoading,
          isError,
          error,
          isSuccess,
        },
      ] = useUpdateUserMutation();
    
      const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePhoto(file);
      };

    // const enrolled=[1,2];

    

        const updateUserHandler = async () => {
            // console.log(name,profilePhoto)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("profilePhoto", profilePhoto);
            await updateUser(formData);
          };

          useEffect(() => {
            refetch();
          }, []);
    
          useEffect(()=>{
            if(isSuccess){
                refetch();
                toast.success(data.message || "Profile updated.");
            }
            if (isError) {
                toast.error(error.message || "Failed to update profile");
              }
          },[error, updateUserData, isSuccess, isError]);

        if (isLoading) return <h1>Profile Loading...</h1>;

        const user = data && data.user;

  return (
    <div className='max-w-4xl mx-auto px-4 my-24'>
       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
           </Avatar>
        </div>
        <div>
            <div className='mb-2'>
            <h1 className="font-semibold text-gray-900 dark:text-black ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-800 ml-2">
              {user.name}
              </span>
            </h1>
            </div>
            <div className='mb-2'>
            <h1 className="font-semibold text-gray-900 dark:text-black ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-800 ml-2">
              {user.email}
              </span>
            </h1>
            </div>
            <div className='mb-2'>
            <h1 className="font-semibold text-gray-900 dark:text-black  ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-800 ml-2">
              {user.role.toUpperCase()}
              </span>
            </h1>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                   <Button className="bg-blue-950 text-white hover:bg-blue-800 border rounded-xl mt-2">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription className="text-gray-600">Make changes to your profile here. Click save when you are done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Name :</Label>
                            <Input type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name" className="col-span-3 rounded-xl border border-black-400"></Input>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Profile Photo :</Label>
                            <Input onChange={onChangeHandler} type="file" accept="image/*"className="col-span-3 rounded-xl border border-black-400"></Input>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={updateUserIsLoading} 
                         onClick={updateUserHandler}
                         className='bg-blue-950 text-white hover:bg-blue-800 border rounded-xl '>
                            {
                               updateUserIsLoading ? (
                                    <>
                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                    </>
                                ): "Save Changes"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
       </div>

       <div>
           <h1 className="font-medium text-lg">Courses you are enrolled in</h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                {
                    user.enrolledCourses.length==0 ? (<h1>You have not enrolled yet</h1>)  :
                    (
                        user.enrolledCourses.map((course) =>  <Course course={course} key={course._id} />)
                    )
                }
            </div>
       </div>

    </div>
  )
}

export default Profile