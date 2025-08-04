"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  ClipboardCheck,
  Wrench,
  Leaf,
  HardHat,
  Eye,
  FlaskConical,
  BookOpen,
  FileX,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ehsDocuments = [
  {
    name: "Job Safety Analysis",
    icon: ClipboardCheck,
    color: "bg-blue-500",
    description: "Systematic examination of job tasks to identify hazards",
    lastUpdated: "2 days ago",
    status: "Active",
    route: "/department/ehs/job-safety-analysis",
  },
  {
    name: "Standard Operating Procedure (SOP)",
    icon: FileText,
    color: "bg-green-500",
    description: "Step-by-step instructions for routine operations",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/sop",
  },
  {
    name: "Deviation Report",
    icon: AlertTriangle,
    color: "bg-red-500",
    description: "Documentation of deviations from standard procedures",
    lastUpdated: "3 days ago",
    status: "Under Review",
    route: "/department/ehs/deviation-report",
  },
  {
    name: "Work Order",
    icon: Wrench,
    color: "bg-orange-500",
    description: "Authorization and instruction for maintenance work",
    lastUpdated: "5 days ago",
    status: "Active",
    route: "/department/ehs/work-order",
  },
  {
    name: "Environmental Impact Assessment",
    icon: Leaf,
    color: "bg-emerald-500",
    description: "Evaluation of environmental effects of projects",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/department/ehs/environmental-impact",
  },
  {
    name: "Chemical Hygiene Plan",
    icon: Shield,
    color: "bg-purple-500",
    description: "Procedures for safe handling of hazardous chemicals",
    lastUpdated: "2 weeks ago",
    status: "Active",
    route: "/department/ehs/chemical-hygiene",
  },
  {
    name: "PPE Program",
    icon: HardHat,
    color: "bg-yellow-500",
    description: "Personal protective equipment requirements and training",
    lastUpdated: "4 days ago",
    status: "Active",
    route: "/department/ehs/ppe-program",
  },
  {
    name: "Safety Inspection Checklist",
    icon: Eye,
    color: "bg-indigo-500",
    description: "Systematic safety inspection procedures",
    lastUpdated: "6 days ago",
    status: "Active",
    route: "/department/ehs/safety-inspection",
  },
  {
    name: "Incident Report Form",
    icon: FileX,
    color: "bg-red-600",
    description: "Documentation of workplace incidents and accidents",
    lastUpdated: "1 day ago",
    status: "Active",
    route: "/department/ehs/incident-report",
  },
  {
    name: "Risk Assessment Matrix",
    icon: FlaskConical,
    color: "bg-pink-500",
    description: "Comprehensive risk evaluation and mitigation planning",
    lastUpdated: "3 days ago",
    status: "Active",
    route: "/department/ehs/risk-assessment",
  },
  {
    name: "Training Record",
    icon: BookOpen,
    color: "bg-cyan-500",
    description: "Employee safety training documentation and tracking",
    lastUpdated: "2 days ago",
    status: "Active",
    route: "/department/ehs/training-record",
  },
  {
    name: "Emergency Response Plan",
    icon: AlertTriangle,
    color: "bg-red-700",
    description: "Comprehensive emergency procedures and contact information",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/department/ehs/emergency-response",
  },
]

export default function EHSDepartmentPage() {
  const [selectedDocument, setSelectedDocument] = useState(null)

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
                  <h1 className="text-2xl font-bold text-gray-900">EHS Department</h1>
                  <p className="text-gray-600">Environment, Health & Safety</p>
                </div>
              </div>
            </div>
            <Image src="/logo.png" alt="CMPLAI Logo" width={100} height={35} className="object-contain" />
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
                  <h2 className="text-xl font-bold mb-2">Department Overview</h2>
                  <p className="text-red-100 mb-4">
                    Ensuring workplace safety, environmental compliance, and health standards across all operations.
                  </p>
                  <div className="flex space-x-6">
                    <div>
                      <p className="text-2xl font-bold">{ehsDocuments.length}</p>
                      <p className="text-red-100 text-sm">Total Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {ehsDocuments.filter((doc) => doc.status === "Active").length}
                      </p>
                      <p className="text-red-100 text-sm">Active Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-red-100 text-sm">Compliance Rate</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Department Documents</h2>
            <Button className="bg-red-600 hover:bg-red-700">
              <FileText className="w-4 h-4 mr-2" />
              Create New Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ehsDocuments.map((document, index) => (
              <Link key={index} href={document.route}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${document.color} flex-shrink-0`}>
                        <document.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{document.name}</h3>
                        <Badge 
                          variant={document.status === "Active" ? "default" : "secondary"} 
                          className={`text-xs ${document.status === "Active" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}
                        >
                          {document.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{document.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Updated {document.lastUpdated}</span>
                      <FileText className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Report Incident</h3>
                <p className="text-sm text-gray-600">Submit a safety incident report</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <ClipboardCheck className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Safety Audit</h3>
                <p className="text-sm text-gray-600">Conduct safety inspection</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <HardHat className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Training Schedule</h3>
                <p className="text-sm text-gray-600">View upcoming safety training</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
