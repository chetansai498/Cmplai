"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  Factory,
  BarChart3,
  Wrench,
  AlertTriangle,
  ClipboardCheck,
  Package,
  Users,
  Calendar,
  Archive,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const manufacturingDocuments = [
  {
    name: "Manufacturing Data Reporting",
    icon: BarChart3,
    color: "bg-blue-500",
    description: "Production data collection and performance reporting",
    lastUpdated: "1 day ago",
    status: "Active",
    route: "/department/manufacturing/data-reporting",
  },
  {
    name: "Preventive Maintenance",
    icon: Wrench,
    color: "bg-green-500",
    description: "Scheduled maintenance procedures and tracking",
    lastUpdated: "2 days ago",
    status: "Active",
    route: "/department/manufacturing/preventive-maintenance",
  },
  {
    name: "Deviation Management",
    icon: AlertTriangle,
    color: "bg-red-500",
    description: "Manufacturing deviation investigation and resolution",
    lastUpdated: "3 hours ago",
    status: "Under Review",
    route: "/department/manufacturing/deviation-management",
  },
  {
    name: "Quality Control Procedures",
    icon: ClipboardCheck,
    color: "bg-purple-500",
    description: "QC testing protocols and acceptance criteria",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/department/manufacturing/quality-control",
  },
  {
    name: "Batch Records",
    icon: FileText,
    color: "bg-orange-500",
    description: "Production batch documentation and tracking",
    lastUpdated: "4 hours ago",
    status: "Active",
    route: "/department/manufacturing/batch-records",
  },
  {
    name: "Equipment Maintenance Logs",
    icon: Settings,
    color: "bg-indigo-500",
    description: "Equipment service history and maintenance records",
    lastUpdated: "2 days ago",
    status: "Active",
    route: "/department/manufacturing/equipment-logs",
  },
  {
    name: "Supplier Qualification",
    icon: Users,
    color: "bg-cyan-500",
    description: "Vendor assessment and qualification documentation",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/department/manufacturing/supplier-qualification",
  },
  {
    name: "Production Schedule",
    icon: Calendar,
    color: "bg-yellow-500",
    description: "Manufacturing planning and scheduling documents",
    lastUpdated: "6 hours ago",
    status: "Active",
    route: "/department/manufacturing/production-schedule",
  },
  {
    name: "Inventory Management",
    icon: Package,
    color: "bg-emerald-500",
    description: "Raw material and finished goods inventory tracking",
    lastUpdated: "3 hours ago",
    status: "Active",
    route: "/department/manufacturing/inventory-management",
  },
  {
    name: "Manufacturing Audits",
    icon: Search,
    color: "bg-pink-500",
    description: "Internal and external manufacturing audit reports",
    lastUpdated: "5 days ago",
    status: "Active",
    route: "/department/manufacturing/audits",
  },
  {
    name: "Process Validation",
    icon: TrendingUp,
    color: "bg-teal-500",
    description: "Manufacturing process validation and verification",
    lastUpdated: "1 week ago",
    status: "Active",
    route: "/department/manufacturing/process-validation",
  },
  {
    name: "Change Control",
    icon: Archive,
    color: "bg-gray-500",
    description: "Manufacturing change control documentation",
    lastUpdated: "3 days ago",
    status: "Active",
    route: "/department/manufacturing/change-control",
  },
]

export default function ManufacturingDepartmentPage() {
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
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Manufacturing & Production</h1>
                  <p className="text-gray-600">Production Operations and Quality Management</p>
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
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Department Overview</h2>
                  <p className="text-orange-100 mb-4">
                    Managing production operations, quality control, and manufacturing excellence across all facilities.
                  </p>
                  <div className="flex space-x-6">
                    <div>
                      <p className="text-2xl font-bold">{manufacturingDocuments.length}</p>
                      <p className="text-orange-100 text-sm">Total Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {manufacturingDocuments.filter((doc) => doc.status === "Active").length}
                      </p>
                      <p className="text-orange-100 text-sm">Active Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">99.2%</p>
                      <p className="text-orange-100 text-sm">Production Efficiency</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Factory className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Manufacturing Documents</h2>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <FileText className="w-4 h-4 mr-2" />
              Create New Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {manufacturingDocuments.map((document, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Production Report</h3>
                <p className="text-sm text-gray-600">Generate daily production report</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Wrench className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Maintenance</h3>
                <p className="text-sm text-gray-600">Plan equipment maintenance</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Inventory Check</h3>
                <p className="text-sm text-gray-600">Review inventory levels</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <ClipboardCheck className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Audit</h3>
                <p className="text-sm text-gray-600">Conduct quality inspection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
