import React from 'react'
import {Card,CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="overflow-hidden  rounded-xl dark:bg-gray-800 dark:text-white bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
    <div className="relative">
      <img
        src={course.courseThumbnail || "https://www.courses.com/images/blogs/embracing-change-the-future-of-education-in-the-digital-age.jpg"}
        alt=""
        className="w-full h-36 object-cover rounded-xl"
      />
    </div>
    <CardContent className="px-5 py-2 space-y-3">
        <h1 className='hover:underline font-bold text-lg truncate'>{course.courseTitle}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">{course.creator?.name}</h1>
            </div>
            <Badge className="bg-blue-600 rounded-xl hover:bg-blue-400  text-white px-2 py-1 text-xs">{course.courseLevel}</Badge>
        </div>
        <div className="text-lg font-bold"> 
            <span>₹{course.coursePrice}</span>
        </div>
    </CardContent>
    </Card>
    </Link>
  )
}

export default Course