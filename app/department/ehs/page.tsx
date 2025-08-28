"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ehsDocuments = [
  {
    id: 1,
    title: "Chemical Safety Data Sheets Update",
    type: "Safety Data Sheet",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-20",
    assignee: "Michael Davis",
    progress: 100,
    lastModified: "2024-01-18",
  },
  {
    id: 2,
    title: "Monthly Safety Inspection Report",
    type: "Inspection Report",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-01-25",
    assignee: "Sarah Johnson",
    progress: 75,
    lastModified: "2024-01-19",
  },
  {
    id: 3,
    title: "Emergency Response Procedure Review",
    type: "Emergency Procedure",
    status: "pending",
    priority: "high",
    dueDate: "2024-01-30",
    assignee: "Michael Davis",
    progress: 25,
    lastModified: "2024-01-15",
  },
  {
    id: 4,
    title: "PPE Compliance Audit",
    type: "Compliance Audit",
    status: "overdue",
    priority: "critical",
    dueDate: "2024-01-15",
    assignee: "Emily Chen",
    progress: 60,
    lastModified: "2024-01-14",
  },
  {
    id: 5,
    title: "Hazard Communication Training Materials",
    type: "Training Material",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-02-05",
    assignee: "David Rodriguez",
    progress: 40,
    lastModified: "2024-01-17",
  },
]

const recentActivities = [
  {
    id: 1,
    action: "Document Updated",
    document: "Chemical Safety Data Sheets Update",
    user: "Michael Davis",
    timestamp: "2 hours ago",
    type: "update",
  },
  {
    id: 2,
    action: "New Document Created",
    document: "Quarterly Safety Review",
    user: "Sarah Johnson",
    timestamp: "4 hours ago",
    type: "create",
  },
  {
    id: 3,
    action: "Document Approved",
    document: "Safety Training Protocol",
    user: "Department Head",
    timestamp: "1 day ago",
    type: "approval",
  },
  {
    id: 4,
    action: "Compliance Check",
    document: "PPE Compliance Audit",
    user: "Emily Chen",
    timestamp: "2 days ago",
    type: "compliance",
  },
]

export default function EHSPage() {
  const [documents, setDocuments] = useState(ehsDocuments)
  const [activities, setActivities] = useState(recentActivities)
  const [userType, setUserType] = useState("employee")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "employee"
    const storedUserName = localStorage.getItem("userName") || "Demo User"
    setUserType(storedUserType)
    setUserName(storedUserName)

    // Log department access
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: storedUserName,
      action: "Department Access",
      details: "Accessed EHS department page",
      timestamp: new Date().toISOString(),
      type: "access",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const completedDocs = documents.filter((doc) => doc.status === "completed").length
  const inProgressDocs = documents.filter((doc) => doc.status === "in_progress").length
  const overdueDocs = documents.filter((doc) => doc.status === "overdue").length
  const averageProgress = Math.round(documents.reduce((sum, doc) => sum + doc.progress, 0) / documents.length)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Image src="/logo.png" alt="CMPLAI Logo" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/create-document">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Document
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Department Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Environmental, Health & Safety</h1>
              <p className="text-gray-600">Manage safety protocols, compliance documents, and risk assessments</p>
            </div>
          </div>
          {userType === "manager" && (
            <Badge className="bg-green-100 text-green-800">Manager View - Full Department Access</Badge>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedDocs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{inProgressDocs}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueDocs}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Documents List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    EHS Documents
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{doc.type}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1">{doc.status.replace("_", " ")}</span>
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(doc.priority)}`}>{doc.priority}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{doc.progress}%</span>
                        </div>
                        <Progress value={doc.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {doc.assignee}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {new Date(doc.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/create-document">
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Safety Document
                  </Button>
                </Link>
                <Link href="/department/ehs/job-safety-analysis">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Job Safety Analysis
                  </Button>
                </Link>
                <Link href="/department/ehs/deviation-report">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Deviation Report
                  </Button>
                </Link>
                <Link href="/department/ehs/work-order">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Work Order
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "update" && <Edit className="w-4 h-4 text-blue-500" />}
                        {activity.type === "create" && <Plus className="w-4 h-4 text-green-500" />}
                        {activity.type === "approval" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {activity.type === "compliance" && <Shield className="w-4 h-4 text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600 truncate">{activity.document}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{activity.user}</p>
                          <p className="text-xs text-gray-400">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Compliance</span>
                      <span className="text-sm font-bold text-green-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Safety Training</span>
                      <span className="text-sm font-bold text-blue-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Equipment Inspections</span>
                      <span className="text-sm font-bold text-orange-600">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
