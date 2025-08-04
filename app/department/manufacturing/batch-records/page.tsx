"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Trash2, Save, Download, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BatchRecordsPage() {
  const [formData, setFormData] = useState({
    batchNo: "",
    productName: "",
    productCode: "",
    batchSize: "",
    manufacturingDate: "",
    expiryDate: "",
    supervisor: "",
    operator: "",
    equipmentUsed: "",
    batchStatus: "",
  })

  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      material: "",
      lotNo: "",
      supplier: "",
      quantityRequired: "",
      quantityUsed: "",
      expiryDate: "",
      verified: false,
    },
  ])

  const [processSteps, setProcessSteps] = useState([
    {
      id: 1,
      stepNo: "",
      description: "",
      parameters: "",
      actualValues: "",
      operator: "",
      time: "",
      verified: false,
    },
  ])

  const addRawMaterial = () => {
    const newMaterial = {
      id: rawMaterials.length + 1,
      material: "",
      lotNo: "",
      supplier: "",
      quantityRequired: "",
      quantityUsed: "",
      expiryDate: "",
      verified: false,
    }
    setRawMaterials([...rawMaterials, newMaterial])
  }

  const addProcessStep = () => {
    const newStep = {
      id: processSteps.length + 1,
      stepNo: "",
      description: "",
      parameters: "",
      actualValues: "",
      operator: "",
      time: "",
      verified: false,
    }
    setProcessSteps([...processSteps, newStep])
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
                <h1 className="text-xl font-bold text-gray-900">Batch Production Records</h1>
                <p className="text-sm text-gray-600">Manufacturing Batch Documentation and Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Batch
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
              <CardTitle className="text-2xl font-bold text-gray-900">BATCH PRODUCTION RECORD</CardTitle>
              <p className="text-gray-600 mt-2">Manufacturing Documentation and Quality Control</p>
            </CardHeader>
          </Card>

          {/* Batch Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Batch Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Batch No.:</label>
                  <Input
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    placeholder="BATCH-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Name:</label>
                  <Input
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="Product name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Code:</label>
                  <Input
                    value={formData.productCode}
                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                    placeholder="PRD-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Batch Size:</label>
                  <Input
                    value={formData.batchSize}
                    onChange={(e) => setFormData({ ...formData, batchSize: e.target.value })}
                    placeholder="1000 units"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Manufacturing Date:</label>
                  <Input
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => setFormData({ ...formData, manufacturingDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expiry Date:</label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
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
                  <label className="text-sm font-medium text-gray-700">Operator:</label>
                  <Input
                    value={formData.operator}
                    onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                    placeholder="Operator name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Batch Status:</label>
                  <Select
                    value={formData.batchStatus}
                    onValueChange={(value) => setFormData({ ...formData, batchStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="released">Released</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Raw Materials */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Raw Materials Used</CardTitle>
                <Button onClick={addRawMaterial} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Material
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead className="min-w-[150px]">Material Name</TableHead>
                      <TableHead className="min-w-[120px]">Lot No.</TableHead>
                      <TableHead className="min-w-[120px]">Supplier</TableHead>
                      <TableHead className="min-w-[120px]">Qty Required</TableHead>
                      <TableHead className="min-w-[120px]">Qty Used</TableHead>
                      <TableHead className="min-w-[120px]">Expiry Date</TableHead>
                      <TableHead className="w-20">Verified</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rawMaterials.map((material, index) => (
                      <TableRow key={material.id}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={material.material}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) =>
                                  m.id === material.id ? { ...m, material: e.target.value } : m,
                                ),
                              )
                            }
                            placeholder="Material name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={material.lotNo}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) => (m.id === material.id ? { ...m, lotNo: e.target.value } : m)),
                              )
                            }
                            placeholder="Lot number"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={material.supplier}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) =>
                                  m.id === material.id ? { ...m, supplier: e.target.value } : m,
                                ),
                              )
                            }
                            placeholder="Supplier name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={material.quantityRequired}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) =>
                                  m.id === material.id ? { ...m, quantityRequired: e.target.value } : m,
                                ),
                              )
                            }
                            placeholder="Required qty"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={material.quantityUsed}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) =>
                                  m.id === material.id ? { ...m, quantityUsed: e.target.value } : m,
                                ),
                              )
                            }
                            placeholder="Used qty"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={material.expiryDate}
                            onChange={(e) =>
                              setRawMaterials(
                                rawMaterials.map((m) =>
                                  m.id === material.id ? { ...m, expiryDate: e.target.value } : m,
                                ),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={material.verified}
                            onCheckedChange={(checked) =>
                              setRawMaterials(
                                rawMaterials.map((m) => (m.id === material.id ? { ...m, verified: checked } : m)),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRawMaterials(rawMaterials.filter((m) => m.id !== material.id))}
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

          {/* Manufacturing Process Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manufacturing Process Steps</CardTitle>
                <Button onClick={addProcessStep} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Step</TableHead>
                      <TableHead className="min-w-[200px]">Process Description</TableHead>
                      <TableHead className="min-w-[150px]">Parameters</TableHead>
                      <TableHead className="min-w-[150px]">Actual Values</TableHead>
                      <TableHead className="min-w-[120px]">Operator</TableHead>
                      <TableHead className="min-w-[100px]">Time</TableHead>
                      <TableHead className="w-20">Verified</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processSteps.map((step, index) => (
                      <TableRow key={step.id}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Textarea
                            value={step.description}
                            onChange={(e) =>
                              setProcessSteps(
                                processSteps.map((s) => (s.id === step.id ? { ...s, description: e.target.value } : s)),
                              )
                            }
                            placeholder="Process description"
                            className="min-h-[60px] resize-none"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={step.parameters}
                            onChange={(e) =>
                              setProcessSteps(
                                processSteps.map((s) => (s.id === step.id ? { ...s, parameters: e.target.value } : s)),
                              )
                            }
                            placeholder="Required parameters"
                            className="min-h-[60px] resize-none"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={step.actualValues}
                            onChange={(e) =>
                              setProcessSteps(
                                processSteps.map((s) =>
                                  s.id === step.id ? { ...s, actualValues: e.target.value } : s,
                                ),
                              )
                            }
                            placeholder="Actual values"
                            className="min-h-[60px] resize-none"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={step.operator}
                            onChange={(e) =>
                              setProcessSteps(
                                processSteps.map((s) => (s.id === step.id ? { ...s, operator: e.target.value } : s)),
                              )
                            }
                            placeholder="Operator"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={step.time}
                            onChange={(e) =>
                              setProcessSteps(
                                processSteps.map((s) => (s.id === step.id ? { ...s, time: e.target.value } : s)),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={step.verified}
                            onCheckedChange={(checked) =>
                              setProcessSteps(
                                processSteps.map((s) => (s.id === step.id ? { ...s, verified: checked } : s)),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setProcessSteps(processSteps.filter((s) => s.id !== step.id))}
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

          {/* Quality Control and Approval */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quality Control Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Document quality control test results, specifications met, and any deviations..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Batch Release Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Final batch assessment, release authorization, and any special instructions..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>
          </div>

          {/* Approval Section */}
          <Card>
            <CardHeader>
              <CardTitle>Batch Approval and Release</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Production Manager:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Quality Assurance:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Authorized Person:</p>
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
