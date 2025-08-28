"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Eye,
  EyeOff,
  Save,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SettingsPage() {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userDepartment, setUserDepartment] = useState("")
  const [userRole, setUserRole] = useState("")
  const [userBio, setUserBio] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC")
  const [emailNotifications, setEmailNotifications] = useState({
    approvals: true,
    meetings: true,
    deadlines: true,
    system: false,
  })
  const [pushNotifications, setPushNotifications] = useState({
    urgent: true,
    daily: false,
    training: true,
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "team",
    activityTracking: true,
    dataSharing: false,
  })

  useEffect(() => {
    // Load user settings from localStorage
    const storedUserName = localStorage.getItem("userName") || ""
    const storedUserEmail = localStorage.getItem("userEmail") || ""
    const storedUserDepartment = localStorage.getItem("userDepartment") || ""
    const storedUserType = localStorage.getItem("userType") || ""

    setUserName(storedUserName)
    setUserEmail(storedUserEmail)
    setUserDepartment(storedUserDepartment)
    setUserRole(storedUserType)
  }, [])

  const handleSaveProfile = () => {
    // Save profile settings
    localStorage.setItem("userName", userName)
    localStorage.setItem("userEmail", userEmail)
    localStorage.setItem("userDepartment", userDepartment)
    localStorage.setItem("userType", userRole)

    // Log activity
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Profile Updated",
      details: "User profile settings have been updated",
      timestamp: new Date().toISOString(),
      type: "settings",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!")
      return
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }

    // Log password change
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Password Changed",
      details: "User password has been updated",
      timestamp: new Date().toISOString(),
      type: "security",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    alert("Password changed successfully!")
  }

  const handleExportData = () => {
    const userData = {
      profile: { userName, userEmail, userDepartment, userRole, userBio },
      settings: { theme, language, timezone },
      notifications: { emailNotifications, pushNotifications },
      privacy: privacySettings,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `cmplai-user-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Clear all user data
      localStorage.clear()
      alert("Account deleted successfully. You will be redirected to the login page.")
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Image src="/logo.png" alt="CMPLAI Logo" width={100} height={32} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security settings</p>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Image
                      src="/diverse-woman-portrait.png"
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-gray-200"
                    />
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
                    <p className="text-sm text-gray-500">Upload a new profile picture</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userDepartment">Department</Label>
                    <Select value={userDepartment} onValueChange={setUserDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ehs">EHS</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                        <SelectItem value="quality-control">Quality Control</SelectItem>
                        <SelectItem value="regulatory-affairs">Regulatory Affairs</SelectItem>
                        <SelectItem value="supply-chain">Supply Chain</SelectItem>
                        <SelectItem value="clinical-operations">Clinical Operations</SelectItem>
                        <SelectItem value="sales-marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <Select value={userRole} onValueChange={setUserRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="userBio">Bio</Label>
                  <Textarea
                    id="userBio"
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="twoFactor"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <Label htmlFor="twoFactor">Enable</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Document approvals</span>
                        <input
                          type="checkbox"
                          checked={emailNotifications.approvals}
                          onChange={(e) =>
                            setEmailNotifications({ ...emailNotifications, approvals: e.target.checked })
                          }
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Meeting reminders</span>
                        <input
                          type="checkbox"
                          checked={emailNotifications.meetings}
                          onChange={(e) => setEmailNotifications({ ...emailNotifications, meetings: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Training deadlines</span>
                        <input
                          type="checkbox"
                          checked={emailNotifications.deadlines}
                          onChange={(e) =>
                            setEmailNotifications({ ...emailNotifications, deadlines: e.target.checked })
                          }
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">System updates</span>
                        <input
                          type="checkbox"
                          checked={emailNotifications.system}
                          onChange={(e) => setEmailNotifications({ ...emailNotifications, system: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Push Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Urgent alerts</span>
                        <input
                          type="checkbox"
                          checked={pushNotifications.urgent}
                          onChange={(e) => setPushNotifications({ ...pushNotifications, urgent: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Daily summaries</span>
                        <input
                          type="checkbox"
                          checked={pushNotifications.daily}
                          onChange={(e) => setPushNotifications({ ...pushNotifications, daily: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Training reminders</span>
                        <input
                          type="checkbox"
                          checked={pushNotifications.training}
                          onChange={(e) => setPushNotifications({ ...pushNotifications, training: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance & Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="team">Team Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Activity Tracking</h4>
                      <p className="text-sm text-gray-500">Allow system to track your activity for analytics</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.activityTracking}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, activityTracking: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Data Sharing</h4>
                      <p className="text-sm text-gray-500">Share anonymized data for product improvement</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, dataSharing: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Export Data</h4>
                      <p className="text-sm text-gray-500">Download a copy of your data</p>
                    </div>
                    <Button onClick={handleExportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900">Delete Account</h4>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <Button onClick={handleDeleteAccount} variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
