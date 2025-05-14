import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCreateCourseMutation } from '../../../features/api/courseApi';
import { toast } from 'sonner';



const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const navigate=useNavigate();

    const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

    const getSelectedCategory = (value) => {
        setCategory(value);
      };

    const createCourseHandler= async()=>{
        await createCourse({ courseTitle, category });
    //   alert("hlo")
    // console.log(courseTitle,category);
    }

    // for displaying toast
  useEffect(()=>{
    if(isSuccess){
        toast.success(data?.message || "Course created.");
        navigate("/admin/course");
    }
  },[isSuccess, error])

  return (
    <div className="flex-1 mx-10">
        <div className="mb-4">
            <h1 className="font-bold text-xl">
              Lets add course, add some basic course details for your new course
            </h1>
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
               laborum!
            </p>  
        </div>
        <div>
            <div>
                <Label>Title</Label>
                <Input type="text" name="courseTitle" className="border-gray-300 rounded-xl "
                   value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)} 
                  placeholder="Your Course Name"
                 />
            </div>
            <div className='my-3'>
                <Label>Category</Label>
                <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px] border-gray-300 rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent  className="border-gray-300 rounded-xl bg-white ">
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
            </div>
            <div className="flex items-center gap-2"> 
               <Button  variant="outline" onClick={() => navigate("/admin/course")} className=" border rounded-xl">Back</Button>
               <Button className="bg-blue-950 text-white hover:bg-blue-800 border rounded-xl" disabled={isLoading} onClick={createCourseHandler}>
               {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
               </Button>
            </div>
        </div>
    </div>
  )
}

export default AddCourse