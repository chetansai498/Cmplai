"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Shield, Clock, CheckCircle, AlertTriangle, Eye, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const pendingDocuments = [
  {
    id: 1,
    name: "Hot Work Safety SOP",
    type: "Standard Operating Procedure",
    submittedBy: "John Smith",
    submittedDate: "2024-01-15",
    priority: "High",
    status: "Pending Review",
    description: "Updated safety procedures for hot work operations",
    sections: 8,
    completedSections: 6,
  },
  {
    id: 2,
    name: "Chemical Storage Protocol",
    type: "Safety Protocol",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-01-14",
    priority: "Medium",
    status: "Under Review",
    description: "New chemical storage and handling procedures",
    sections: 5,
    completedSections: 5,
  },
  {
    id: 3,
    name: "Emergency Response Plan",
    type: "Emergency Procedure",
    submittedBy: "Mike Davis",
    submittedDate: "2024-01-13",
    priority: "High",
    status: "Pending Approval",
    description: "Updated emergency response procedures",
    sections: 10,
    completedSections: 8,
  },
  {
    id: 4,
    name: "PPE Requirements Update",
    type: "Safety Guidelines",
    submittedBy: "Lisa Chen",
    submittedDate: "2024-01-12",
    priority: "Low",
    status: "Pending Review",
    description: "Updated personal protective equipment requirements",
    sections: 4,
    completedSections: 4,
  },
]

export default function ManagerEHSDepartmentPage() {
  const [selectedDocument, setSelectedDocument] = useState(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-orange-100 text-orange-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending Approval":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EHS Department - Manager View</h1>
                  <p className="text-gray-600">Document Approval & Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Manager
              </Badge>
              <Image src="/logo.png" alt="CMPLAI Logo" width={100} height={35} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Approval Dashboard</h2>
                  <p className="text-red-100 mb-4">Review and approve documents submitted by your team members.</p>
                  <div className="flex space-x-6">
                    <div>
                      <p className="text-2xl font-bold">{pendingDocuments.length}</p>
                      <p className="text-red-100 text-sm">Pending Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {pendingDocuments.filter((doc) => doc.priority === "High").length}
                      </p>
                      <p className="text-red-100 text-sm">High Priority</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-red-100 text-sm">Due Today</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Awaiting Approval */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Documents Awaiting Approval</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Sort by Date
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Priority Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingDocuments.map((document) => (
              <Card
                key={document.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{document.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{document.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{document.submittedBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{document.submittedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className={getPriorityColor(document.priority)}>{document.priority} Priority</Badge>
                        <Badge variant="secondary" className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Completion Progress</span>
                          <span>
                            {document.completedSections}/{document.sections} sections
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(document.completedSections / document.sections) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Link href={`/manager/sop/${document.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Eye className="w-4 h-4 mr-2" />
                        Review & Edit
                      </Button>
                    </Link>
                    <Button variant="outline" className="px-4">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Bulk Approve</h3>
                <p className="text-sm text-gray-600">Approve multiple documents</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Request Changes</h3>
                <p className="text-sm text-gray-600">Send feedback to authors</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibent text-gray-900 mb-2">Generate Report</h3>
                <p className="text-sm text-gray-600">Create approval summary</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Set Deadlines</h3>
                <p className="text-sm text-gray-600">Manage approval timelines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
