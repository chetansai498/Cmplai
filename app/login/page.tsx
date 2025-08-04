"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, UserCheck, Lock, Mail, ArrowLeft, Sparkles, Shield, BarChart3, Building2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const departments = [
  { id: "ehs", name: "EHS (Environment, Health & Safety)" },
  { id: "regulatory-affairs", name: "Regulatory Affairs" },
  { id: "quality-assurance", name: "Quality Assurance" },
  { id: "quality-control", name: "Quality Control" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "supply-chain", name: "Supply Chain" },
  { id: "clinical-operations", name: "Clinical Operations" },
  { id: "sales-marketing", name: "Sales & Marketing" },
  { id: "it", name: "IT" },
  { id: "hr", name: "HR" },
  { id: "finance", name: "Finance" },
  { id: "executive", name: "Executive (All Departments Access)" },
]

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("employee")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    employeeId: "",
    department: "",
    firstName: "",
    lastName: "",
  })
  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = (userType: string) => {
    if (isRegistering) {
      // Registration logic
      if (!formData.email || !formData.password || !formData.department || !formData.firstName || !formData.lastName) {
        alert("Please fill in all required fields")
        return
      }
      
      // Store user data
      localStorage.setItem("userType", userType)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userDepartment", formData.department)
      localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`)
      localStorage.setItem("userEmail", formData.email)
      
      // Create activity log entry
      const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
      activityLog.push({
        id: Date.now(),
        user: `${formData.firstName} ${formData.lastName}`,
        action: "Account Created",
        details: `New ${userType} account created for ${formData.department} department`,
        timestamp: new Date().toISOString(),
        type: "system"
      })
      localStorage.setItem("activityLog", JSON.stringify(activityLog))
      
      window.location.href = "/dashboard"
    } else {
      // Login logic (simplified for demo)
      localStorage.setItem("userType", userType)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userDepartment", "executive") // Default for existing users
      localStorage.setItem("userName", "Demo User")
      localStorage.setItem("userEmail", formData.email)
      
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:30px_30px] opacity-30"></div>

      <div className="w-full max-w-5xl relative z-10 flex items-center justify-center gap-12">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col space-y-8 text-white max-w-md">
          <div>
            <Image src="/logo.png" alt="CMPLAI Logo" width={200} height={80} className="object-contain mb-6" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              AI-Powered ERP Solution
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Streamline your business processes with intelligent automation and compliance management.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">AI-Powered Content</h3>
                <p className="text-sm text-blue-200">Generate documents with intelligent assistance</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-lg backdrop-blur-sm">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">Compliance Management</h3>
                <p className="text-sm text-blue-200">Stay compliant with automated workflows</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur-sm">
                <BarChart3 className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">Real-time Analytics</h3>
                <p className="text-sm text-blue-200">Monitor performance with live dashboards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Form */}
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <div className="mb-6 flex justify-center lg:hidden">
                <Image src="/logo.png" alt="CMPLAI Logo" width={150} height={60} className="object-contain" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isRegistering ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {isRegistering ? "Register for your CMPLAI account" : "Sign in to your CMPLAI account"}
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                  <TabsTrigger
                    value="employee"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <User className="w-4 h-4" />
                    Employee
                  </TabsTrigger>
                  <TabsTrigger
                    value="manager"
                    className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <UserCheck className="w-4 h-4" />
                    Manager
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="employee" className="space-y-4">
                  <div className="space-y-4">
                    {isRegistering && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="employee-firstName">First Name</Label>
                            <Input
                              id="employee-firstName"
                              type="text"
                              placeholder="First name"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="employee-lastName">Last Name</Label>
                            <Input
                              id="employee-lastName"
                              type="text"
                              placeholder="Last name"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employee-department">Department</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Select
                              value={formData.department}
                              onValueChange={(value) => setFormData({ ...formData, department: value })}
                            >
                              <SelectTrigger className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select your department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="employee-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="employee-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employee-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="employee-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => handleLogin("employee")}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
                    >
                      {isRegistering ? "Create Employee Account" : "Sign In as Employee"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manager" className="space-y-4">
                  <div className="space-y-4">
                    {isRegistering && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="manager-firstName">First Name</Label>
                            <Input
                              id="manager-firstName"
                              type="text"
                              placeholder="First name"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="manager-lastName">Last Name</Label>
                            <Input
                              id="manager-lastName"
                              type="text"
                              placeholder="Last name"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="manager-department">Department</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Select
                              value={formData.department}
                              onValueChange={(value) => setFormData({ ...formData, department: value })}
                            >
                              <SelectTrigger className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500">
                                <SelectValue placeholder="Select your department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="manager-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="manager-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manager-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="manager-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>

                    {!isRegistering && (
                      <div className="space-y-2">
                        <Label htmlFor="manager-id">Manager ID</Label>
                        <div className="relative">
                          <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="manager-id"
                            type="text"
                            placeholder="Enter your manager ID"
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.employeeId}
                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => handleLogin("manager")}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
                    >
                      {isRegistering ? "Create Manager Account" : "Sign In as Manager"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
                </Button>
              </div>

              {!isRegistering && (
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    Forgot your password?
                  </a>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By {isRegistering ? "creating an account" : "signing in"}, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-white/60 text-sm">
            <p>© 2024 LN Infosphere TechTransformers Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
