import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "../features/api/authApi.js"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login=()=> {
       const navigate=useNavigate();
       const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
      });
      const [loginInput, setLoginInput] = useState({ email: "", password: "" });

      const [
        registerUser,
        {
          data: registerData,
          error: registerError,
          isLoading: registerIsLoading,
          isSuccess: registerIsSuccess,
        },
      ] = useRegisterUserMutation();
      const [
        loginUser,
        {
          data: loginData,
          error: loginError,
          isLoading: loginIsLoading,
          isSuccess: loginIsSuccess,
        },
      ] = useLoginUserMutation();

      const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
          setSignupInput({ ...signupInput, [name]: value });
        } else {
          setLoginInput({ ...loginInput, [name]: value });
        }
      };

      const handleRegistration= async(type)=>{
        const inputData = type==="signup" ? signupInput : loginInput;
            // console.log(inputData);
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
      }

      useEffect(() => {
        if(registerIsSuccess && registerData){
          toast.success(registerData.message || "Signup successful.")
        }
        if(registerError){
          toast.error(registerError.data.message || "Signup Failed");
        }
        if(loginIsSuccess && loginData){
          toast.success(loginData.message || "Login successful.");
          navigate("/");
        }
        if(loginError){ 
          toast.error(loginError.data.message || "login Failed");
        }
      }, [
        loginIsLoading,
        registerIsLoading,
        loginData,
        registerData,
        loginError,
        registerError,
      ]);

  return ( 
    
  <div className="flex items-center w-full justify-center mt-20">
   <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger  value="signup">SignUp</TabsTrigger>
        <TabsTrigger  value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription className="text-gray-400">
            Create a new account and click signup when you are done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input className="border rounded-xl border-gray-400" id="name"  name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} type="text" placeholder="Eg: Kush"  required="true" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input className="border rounded-xl border-gray-400" id="email"  name="email" value={signupInput.email} onChange={(e) => changeInputHandler(e, "signup")} type="email" placeholder="Eg: Kush@gmail.com" required="true" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input className="border rounded-xl border-gray-400" id="password" name="password" value={signupInput.password} onChange={(e) => changeInputHandler(e, "signup")} type="password" placeholder="Eg: xyz" required="true" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-950 text-white hover:bg-blue-800 border rounded-xl" 
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription className="text-gray-400">
              Login your password here. After signup, you will be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <Label htmlFor="current">Email</Label>
              <Input className="border rounded-xl border-gray-400" id="current" name="email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} type="email" placeholder="Eg: kush@gmail.com" required="true" />
            </div>
            <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
              <Input className="border rounded-xl border-gray-400" id="new" name="password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} type="password" placeholder="Eg: xyz" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button  className="bg-blue-950 text-white hover:bg-blue-800 border rounded-xl" 
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
    
  )
}



export default Login