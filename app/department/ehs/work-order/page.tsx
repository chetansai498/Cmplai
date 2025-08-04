"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Download, Wrench, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WorkOrderPage() {
  const [formData, setFormData] = useState({
    requesterName: "",
    date: "",
    department: "",
    telephone: "",
    location: "",
    urgent: false,
    room: "",
    workDescription: "",
    completedDescription: "",
    completedBy: "",
    completedDate: "",
    timeStarted: "",
    timeEnded: "",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/department/ehs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to EHS
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Work Order Request Form</h1>
                <p className="text-sm text-gray-600">Maintenance and Service Request</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Image src="/logo.png" alt="CMPLAI Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Document Header */}
          <Card>
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl font-bold text-gray-900">WORK ORDER REQUEST FORM</CardTitle>
              <p className="text-gray-600 mt-2">Maintenance and Service Request</p>
            </CardHeader>
          </Card>

          {/* Requester Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" />
                Requester Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Requester Name:</label>
                  <Input
                    value={formData.requesterName}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    placeholder="Enter requester name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date:</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">dd-mm-yyyy</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Department:</label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ehs">EHS</SelectItem>
                      <SelectItem value="qa">Quality Assurance</SelectItem>
                      <SelectItem value="qc">Quality Control</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="regulatory">Regulatory Affairs</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Telephone:</label>
                  <Input
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location:</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Room:</label>
                  <Input
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Enter room number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Urgent:</label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent-yes"
                      checked={formData.urgent === true}
                      onCheckedChange={() => setFormData({ ...formData, urgent: true })}
                    />
                    <label htmlFor="urgent-yes" className="text-sm text-gray-700 cursor-pointer">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent-no"
                      checked={formData.urgent === false}
                      onCheckedChange={() => setFormData({ ...formData, urgent: false })}
                    />
                    <label htmlFor="urgent-no" className="text-sm text-gray-700 cursor-pointer">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description of Work Order Requested</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.workDescription}
                onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                placeholder="Provide detailed description of the work requested, including specific requirements, materials needed, and any special instructions..."
                className="min-h-[150px]"
                rows={6}
              />
            </CardContent>
          </Card>

          {/* Maintenance Use Only Section */}
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                Maintenance Use Only
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Description of completed Work Order and Material Used:
                </label>
                <Textarea
                  value={formData.completedDescription}
                  onChange={(e) => setFormData({ ...formData, completedDescription: e.target.value })}
                  placeholder="Describe the completed work, materials used, and any additional notes..."
                  className="min-h-[120px] bg-white"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Completed By:</label>
                  <Input
                    value={formData.completedBy}
                    onChange={(e) => setFormData({ ...formData, completedBy: e.target.value })}
                    placeholder="Technician name"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date:</label>
                  <Input
                    type="date"
                    value={formData.completedDate}
                    onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500">dd-mm-yyyy</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time Started:</label>
                  <Input
                    type="time"
                    value={formData.timeStarted}
                    onChange={(e) => setFormData({ ...formData, timeStarted: e.target.value })}
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500">--:-- --</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time Ended:</label>
                  <Input
                    type="time"
                    value={formData.timeEnded}
                    onChange={(e) => setFormData({ ...formData, timeEnded: e.target.value })}
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500">--:-- --</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signature Section */}
          <Card>
            <CardHeader>
              <CardTitle>Signatures and Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Requester Signature:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Date: _______________</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Maintenance Supervisor Signature:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Date: _______________</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
