import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from '../../../components/RichTextEditor';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '../../../features/api/courseApi';
import { toast } from 'sonner';


const CourseTab = () => {
    const navigate=useNavigate();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
      });
      const [previewThumbnail, setPreviewThumbnail] = useState("");
      const params = useParams();
      const courseId = params.courseId;

      const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
      useGetCourseByIdQuery(courseId);

      const [publishCourse, {}] = usePublishCourseMutation();

      useEffect(() => {
        if (courseByIdData?.course) { 
            const course = courseByIdData?.course;
          setInput({
            courseTitle: course.courseTitle,
            subTitle: course.subTitle,
            description: course.description,
            category: course.category,
            courseLevel: course.courseLevel,
            coursePrice: course.coursePrice,
            courseThumbnail: "",
          });
        }
      }, [courseByIdData]);

      const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

      const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
      };
      const selectCategory = (value) => {
        setInput({ ...input, category: value });
      };
      const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
      };
       // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  }
   
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if(courseByIdLoading) return <h1>Loading...</h1>
 

    // const isPublished=true;
  return (
    <Card>
        <CardHeader className='flex flex-row justify-between'>
            <div>
                <CardTitle>Basic Course Information</CardTitle>
                <CardDescription className='text-gray-500' >Make changes to your courses here. Click save when you're done. </CardDescription>
            </div>
            <div  className="space-x-2" >
            <Button  disabled={courseByIdData?.course.lectures.length === 0} className="border border-gray-300 hover:bg-gray-300 rounded-xl" variant="outline" onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
               {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
            </Button>
                <Button className='bg-blue-950 text-white hover:bg-blue-800 border rounded-xl'>Remove Course</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className='space-y-4 mt-5'>
              <div>
                <Label>Title</Label>
                <Input   className='border rounded-xl border-gray-300' type="text"       name="courseTitle" value={input.courseTitle} onChange={changeEventHandler}  placeholder="Ex. Fullstack developer"   />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input  className='border rounded-xl border-gray-300'  type="text"    name="subTitle"  value={input.subTitle}  onChange={changeEventHandler} placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"  />
              </div>
              <div>
                <Label>Description</Label>
                <RichTextEditor input={input} setInput={setInput} />
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <Label>Category</Label>
                     <Select  defaultValue={input.category} onValueChange={selectCategory}>
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
                <div>
                  <Label>Course Level</Label>
                  <Select  defaultValue={input.courseLevel}  onValueChange={selectCourseLevel}  >
                <SelectTrigger className="w-[180px] border-gray-300 rounded-xl bg-white">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent className="border-gray-300 rounded-xl bg-white ">
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                </div>
                <div>
                  <Label>Price in (INR)</Label>
                  <Input   type="number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="199"    className="w-fit border-gray-300 rounded-xl bg-white"  />
                 </div>
              </div>
              <div>
                <Label>Course Thumbnail</Label>
                <Input  type="file" accept="image/*"  onChange={selectThumbnail} className="w-fit border-gray-300 rounded-xl bg-white"/>
                {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2 w-20 h-21"
                alt="Course Thumbnail"
              />
            )}
              </div>
              <div className='space-x-2'>
                <Button variant='outline' onClick={() => navigate("/admin/course")} className='border rounded-xl hover:bg-slate-400'>Cancel</Button>
                <Button onClick={updateCourseHandler} disabled={isLoading} className='bg-blue-950 text-white hover:bg-blue-800 border rounded-xl'>
                {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
                </Button>
              </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default CourseTab