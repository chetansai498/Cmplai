"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Save, CheckCircle, X, Users, User, Plus, Edit3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const sopSections = [
  { id: "objective", title: "Objective", required: true },
  { id: "scope", title: "Scope", required: true },
  { id: "responsibility", title: "Responsibility", required: true },
  { id: "accountability", title: "Accountability", required: true },
  { id: "procedure", title: "Procedure", required: true },
  { id: "preparation", title: "Preparation for Hot Work", required: false },
  { id: "annexures", title: "Annexures", required: false },
  { id: "revision", title: "Revision History", required: true },
]

const departmentEmployees = [
  { id: 1, name: "John Smith", role: "Safety Engineer", email: "john.smith@company.com", status: "Active" },
  { id: 2, name: "Sarah Johnson", role: "EHS Specialist", email: "sarah.johnson@company.com", status: "Active" },
  { id: 3, name: "Mike Davis", role: "Safety Coordinator", email: "mike.davis@company.com", status: "Active" },
  { id: 4, name: "Lisa Chen", role: "Environmental Analyst", email: "lisa.chen@company.com", status: "Active" },
  { id: 5, name: "Robert Wilson", role: "Safety Inspector", email: "robert.wilson@company.com", status: "On Leave" },
]

export default function ManagerSOPPage() {
  const [sectionContent, setSectionContent] = useState({
    objective:
      "To establish standardized procedures for conducting hot work operations safely within the facility, ensuring compliance with safety regulations and minimizing fire and explosion risks.",
    scope:
      "This SOP applies to all hot work activities including welding, cutting, grinding, and other operations that produce sparks, flames, or heat within company premises.",
    responsibility:
      "All employees, contractors, and visitors performing or supervising hot work operations must follow these procedures.",
    accountability:
      "Department supervisors are accountable for ensuring compliance with this SOP and conducting regular safety audits.",
    procedure:
      "1. Obtain hot work permit\n2. Conduct fire watch\n3. Prepare work area\n4. Execute work safely\n5. Post-work inspection",
    preparation:
      "Ensure fire extinguishers are available, remove combustible materials, and establish communication protocols.",
    annexures: "Attachment A: Hot Work Permit Form\nAttachment B: Fire Watch Checklist",
    revision: "Version 1.0 - Initial Release - January 2024",
  })

  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false)
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Sync changes to localStorage to simulate real-time updates
  useEffect(() => {
    localStorage.setItem("sopContent", JSON.stringify(sectionContent))
  }, [sectionContent])

  const handleApprove = () => {
    alert("Document approved successfully! Changes will be reflected in the employee panel.")
    // In a real app, this would update the database
  }

  const handleReject = () => {
    alert("Document rejected. Feedback has been sent to the author.")
  }

  const openEmployeeDialog = (employeeType: string) => {
    setSelectedEmployeeType(employeeType)
    setEmployeeDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/manager/department/ehs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Department
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SOP Review & Approval</h1>
                <p className="text-sm text-gray-600">EHS Department - Hot Work Safety Protocol</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Manager View
              </Badge>
              <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? "View Mode" : "Edit Mode"}
              </Button>
              <div className="text-right text-sm text-gray-600">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>SOP No.: EHS-SOP-001</p>
                <p>Submitted by: John Smith</p>
              </div>
              <Image src="/logo.png" alt="CMPLAI Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg h-screen sticky top-16 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Manager Actions</h2>

              {/* Approval Actions */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Document Approval
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    <CheckCircle className="w-3 h-3 mr-2" />
                    Approve Document
                  </Button>
                  <Button onClick={handleReject} variant="destructive" className="w-full" size="sm">
                    <X className="w-3 h-3 mr-2" />
                    Reject & Send Feedback
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Save className="w-3 h-3 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Employee Management */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Employee Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => openEmployeeDialog("Reviewer")}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Reviewer
                  </Button>
                  <Button
                    onClick={() => openEmployeeDialog("Approver")}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Approver
                  </Button>
                  <Button
                    onClick={() => openEmployeeDialog("Observer")}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Observer
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Document Status */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Document Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Submitted:</span>
                  <span className="text-blue-900">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Priority:</span>
                  <Badge className="bg-red-100 text-red-800 text-xs">High</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Author:</span>
                  <span className="text-blue-900">John Smith</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - A4 Format like Employee Portal */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="py-8">
            {/* A4 Page Container */}
            <div
              className="bg-white shadow-lg border border-gray-300 mx-auto p-8 relative"
              style={{
                width: "210mm",
                minHeight: "297mm",
                maxWidth: "210mm",
              }}
            >
              {/* Document Header */}
              <div className="mb-8 text-center border-b border-gray-200 pb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">STANDARD OPERATING PROCEDURE</h1>
                <h2 className="text-xl text-gray-700 mb-4">Hot Work Safety Protocol</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="text-left">
                    <p>
                      <strong>Department:</strong> EHS
                    </p>
                    <p>
                      <strong>Document Type:</strong> SOP
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <strong>Version:</strong> 1.0
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                    <p>
                      <strong>SOP No.:</strong> EHS-SOP-001
                    </p>
                  </div>
                </div>
              </div>

              {/* SOP Sections */}
              <div className="space-y-6 min-h-[200mm]">
                {sopSections.map((section) => (
                  <div key={section.id} className="page-break-inside-avoid">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {section.title}
                        {section.required && <span className="text-red-500">*</span>}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {isEditing && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            Editing
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {sectionContent[section.id] ? "Completed" : "Empty"}
                        </Badge>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <Textarea
                        value={sectionContent[section.id] || ""}
                        onChange={(e) =>
                          setSectionContent((prev) => ({
                            ...prev,
                            [section.id]: e.target.value,
                          }))
                        }
                        className={`min-h-[120px] transition-colors text-justify ${
                          isEditing
                            ? "border-blue-300 bg-blue-50/30 focus:border-blue-500"
                            : "border-gray-200 bg-gray-50"
                        }`}
                        rows={5}
                        readOnly={!isEditing}
                        placeholder={isEditing ? `Edit content for ${section.title}...` : "No content available"}
                      />
                      {isEditing && (
                        <p className="text-xs text-blue-600 mt-2">
                          Changes made here will be reflected in the employee panel after approval.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Page Footer with Page Number */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">Page 1 of 1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Selection Dialog */}
      <Dialog open={employeeDialogOpen} onOpenChange={setEmployeeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Select {selectedEmployeeType} - EHS Department
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-3">
              {departmentEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={employee.status === "Active" ? "default" : "secondary"} className="text-xs">
                          {employee.status}
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Add as {selectedEmployeeType}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900 mb-1">💡 Employee Management:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Select employees to assign specific roles in the document workflow</li>
                <li>• {selectedEmployeeType}s will receive notifications about document updates</li>
                <li>• Only active employees can be assigned to document workflows</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
