import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"; 
import { useRouter } from "next/router";

export default function Component() {


  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader className="space-y-2">
          <h2 className="text-2xl font-bold text-center">BrainCo. 🧠</h2>
        </CardHeader>
        <CardContent className="space-y-4 px-8 py-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Username" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full mb-2" type="submit">
            Login
          </Button>
          <div className="flex space-x-2">
            <Button className="w-full" type="button" variant="outline">
              Login with Google
            </Button>
            <Button className="w-full" type="button" variant="outline">
              Login with GitHub
            </Button>
          </div>
          <Button className="w-full mt-2" type="button" variant="secondary">
            Register
          </Button>
          <Link className="text-center text-sm underline block mt-4" href="#">
            Forgot password?
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
