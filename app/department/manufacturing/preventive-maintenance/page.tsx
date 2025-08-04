"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Trash2, Save, Download, Wrench, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PreventiveMaintenancePage() {
  const [formData, setFormData] = useState({
    equipmentId: "",
    equipmentName: "",
    location: "",
    maintenanceDate: "",
    nextDueDate: "",
    technician: "",
    supervisor: "",
    maintenanceType: "",
    workOrderNo: "",
    duration: "",
  })

  const [checklistItems, setChecklistItems] = useState([
    {
      id: 1,
      task: "",
      description: "",
      frequency: "",
      status: "",
      remarks: "",
      completed: false,
    },
  ])

  const [partsUsed, setPartsUsed] = useState([
    {
      id: 1,
      partName: "",
      partNumber: "",
      quantity: "",
      supplier: "",
      cost: "",
    },
  ])

  const addChecklistItem = () => {
    const newItem = {
      id: checklistItems.length + 1,
      task: "",
      description: "",
      frequency: "",
      status: "",
      remarks: "",
      completed: false,
    }
    setChecklistItems([...checklistItems, newItem])
  }

  const addPart = () => {
    const newPart = {
      id: partsUsed.length + 1,
      partName: "",
      partNumber: "",
      quantity: "",
      supplier: "",
      cost: "",
    }
    setPartsUsed([...partsUsed, newPart])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/department/manufacturing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Manufacturing
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Preventive Maintenance</h1>
                <p className="text-sm text-gray-600">Equipment Maintenance Planning and Execution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Record
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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Document Header */}
          <Card>
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl font-bold text-gray-900">PREVENTIVE MAINTENANCE RECORD</CardTitle>
              <p className="text-gray-600 mt-2">Equipment Maintenance and Service Documentation</p>
            </CardHeader>
          </Card>

          {/* Equipment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-green-500" />
                Equipment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Equipment ID:</label>
                  <Input
                    value={formData.equipmentId}
                    onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                    placeholder="EQ-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Equipment Name:</label>
                  <Input
                    value={formData.equipmentName}
                    onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                    placeholder="Equipment name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location:</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Equipment location"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Maintenance Date:</label>
                  <Input
                    type="date"
                    value={formData.maintenanceDate}
                    onChange={(e) => setFormData({ ...formData, maintenanceDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Next Due Date:</label>
                  <Input
                    type="date"
                    value={formData.nextDueDate}
                    onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Work Order No.:</label>
                  <Input
                    value={formData.workOrderNo}
                    onChange={(e) => setFormData({ ...formData, workOrderNo: e.target.value })}
                    placeholder="WO-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Technician:</label>
                  <Input
                    value={formData.technician}
                    onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                    placeholder="Technician name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Supervisor:</label>
                  <Input
                    value={formData.supervisor}
                    onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                    placeholder="Supervisor name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Maintenance Type:</label>
                  <Select
                    value={formData.maintenanceType}
                    onValueChange={(value) => setFormData({ ...formData, maintenanceType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Maintenance</SelectItem>
                      <SelectItem value="scheduled">Scheduled Maintenance</SelectItem>
                      <SelectItem value="calibration">Calibration</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="overhaul">Overhaul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Maintenance Checklist
                </CardTitle>
                <Button onClick={addChecklistItem} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead className="min-w-[150px]">Maintenance Task</TableHead>
                      <TableHead className="min-w-[200px]">Description</TableHead>
                      <TableHead className="min-w-[120px]">Frequency</TableHead>
                      <TableHead className="min-w-[120px]">Status</TableHead>
                      <TableHead className="min-w-[150px]">Remarks</TableHead>
                      <TableHead className="w-20">Completed</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checklistItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={item.task}
                            onChange={(e) =>
                              setChecklistItems(
                                checklistItems.map((i) => (i.id === item.id ? { ...i, task: e.target.value } : i)),
                              )
                            }
                            placeholder="Maintenance task"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={item.description}
                            onChange={(e) =>
                              setChecklistItems(
                                checklistItems.map((i) =>
                                  i.id === item.id ? { ...i, description: e.target.value } : i,
                                ),
                              )
                            }
                            placeholder="Task description"
                            className="min-h-[60px] resize-none"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.frequency}
                            onValueChange={(value) =>
                              setChecklistItems(
                                checklistItems.map((i) => (i.id === item.id ? { ...i, frequency: value } : i)),
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.status}
                            onValueChange={(value) =>
                              setChecklistItems(
                                checklistItems.map((i) => (i.id === item.id ? { ...i, status: value } : i)),
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="skipped">Skipped</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.remarks}
                            onChange={(e) =>
                              setChecklistItems(
                                checklistItems.map((i) => (i.id === item.id ? { ...i, remarks: e.target.value } : i)),
                              )
                            }
                            placeholder="Remarks"
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={(checked) =>
                              setChecklistItems(
                                checklistItems.map((i) => (i.id === item.id ? { ...i, completed: checked } : i)),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setChecklistItems(checklistItems.filter((i) => i.id !== item.id))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Parts and Materials Used */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Parts and Materials Used</CardTitle>
                <Button onClick={addPart} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Part
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead className="min-w-[150px]">Part Name</TableHead>
                      <TableHead className="min-w-[120px]">Part Number</TableHead>
                      <TableHead className="min-w-[100px]">Quantity</TableHead>
                      <TableHead className="min-w-[120px]">Supplier</TableHead>
                      <TableHead className="min-w-[100px]">Cost</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partsUsed.map((part, index) => (
                      <TableRow key={part.id}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={part.partName}
                            onChange={(e) =>
                              setPartsUsed(
                                partsUsed.map((p) => (p.id === part.id ? { ...p, partName: e.target.value } : p)),
                              )
                            }
                            placeholder="Part name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={part.partNumber}
                            onChange={(e) =>
                              setPartsUsed(
                                partsUsed.map((p) => (p.id === part.id ? { ...p, partNumber: e.target.value } : p)),
                              )
                            }
                            placeholder="Part number"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={part.quantity}
                            onChange={(e) =>
                              setPartsUsed(
                                partsUsed.map((p) => (p.id === part.id ? { ...p, quantity: e.target.value } : p)),
                              )
                            }
                            placeholder="Qty"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={part.supplier}
                            onChange={(e) =>
                              setPartsUsed(
                                partsUsed.map((p) => (p.id === part.id ? { ...p, supplier: e.target.value } : p)),
                              )
                            }
                            placeholder="Supplier"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={part.cost}
                            onChange={(e) =>
                              setPartsUsed(
                                partsUsed.map((p) => (p.id === part.id ? { ...p, cost: e.target.value } : p)),
                              )
                            }
                            placeholder="Cost"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPartsUsed(partsUsed.filter((p) => p.id !== part.id))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Work Performed</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the maintenance work performed, any issues found, and corrective actions taken..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Future maintenance recommendations, equipment condition assessment, and suggested improvements..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>
          </div>

          {/* Approval Section */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Approval and Sign-off</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Maintenance Technician:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Maintenance Supervisor:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Production Manager:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
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
