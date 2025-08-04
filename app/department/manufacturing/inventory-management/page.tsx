"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2, Save, Download, Package, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InventoryManagementPage() {
  const [formData, setFormData] = useState({
    reportDate: "",
    reportedBy: "",
    department: "",
    location: "",
    inventoryType: "",
  })

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      itemCode: "",
      itemName: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unitPrice: "",
      supplier: "",
      lastUpdated: "",
      status: "",
    },
  ])

  const addInventoryItem = () => {
    const newItem = {
      id: inventoryItems.length + 1,
      itemCode: "",
      itemName: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unitPrice: "",
      supplier: "",
      lastUpdated: "",
      status: "",
    }
    setInventoryItems([...inventoryItems, newItem])
  }

  const updateInventoryItem = (id: number, field: string, value: string) => {
    setInventoryItems(inventoryItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "on-order":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                <h1 className="text-xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-600">Stock Control and Material Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Inventory
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Image src="/logo.png" alt="CMPLAI Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Document Header */}
          <Card>
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl font-bold text-gray-900">INVENTORY MANAGEMENT REPORT</CardTitle>
              <p className="text-gray-600 mt-2">Stock Control and Material Tracking System</p>
            </CardHeader>
          </Card>

          {/* Report Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-500" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Report Date:</label>
                  <Input
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Reported By:</label>
                  <Input
                    value={formData.reportedBy}
                    onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                    placeholder="Reporter name"
                  />
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
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="quality">Quality Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Inventory Type:</label>
                  <Select
                    value={formData.inventoryType}
                    onValueChange={(value) => setFormData({ ...formData, inventoryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="raw-materials">Raw Materials</SelectItem>
                      <SelectItem value="finished-goods">Finished Goods</SelectItem>
                      <SelectItem value="work-in-progress">Work in Progress</SelectItem>
                      <SelectItem value="spare-parts">Spare Parts</SelectItem>
                      <SelectItem value="consumables">Consumables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low Stock Items</p>
                    <p className="text-2xl font-bold text-yellow-600">23</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">5</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-green-600">$2.4M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Items Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Items</CardTitle>
                <Button onClick={addInventoryItem} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S.No.</TableHead>
                      <TableHead className="min-w-[120px]">Item Code</TableHead>
                      <TableHead className="min-w-[150px]">Item Name</TableHead>
                      <TableHead className="min-w-[120px]">Category</TableHead>
                      <TableHead className="min-w-[100px]">Current Stock</TableHead>
                      <TableHead className="min-w-[100px]">Min Stock</TableHead>
                      <TableHead className="min-w-[100px]">Max Stock</TableHead>
                      <TableHead className="min-w-[100px]">Unit Price</TableHead>
                      <TableHead className="min-w-[120px]">Supplier</TableHead>
                      <TableHead className="min-w-[120px]">Last Updated</TableHead>
                      <TableHead className="min-w-[120px]">Status</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={item.itemCode}
                            onChange={(e) => updateInventoryItem(item.id, "itemCode", e.target.value)}
                            placeholder="ITM-001"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.itemName}
                            onChange={(e) => updateInventoryItem(item.id, "itemName", e.target.value)}
                            placeholder="Item name"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.category}
                            onValueChange={(value) => updateInventoryItem(item.id, "category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="raw-material">Raw Material</SelectItem>
                              <SelectItem value="component">Component</SelectItem>
                              <SelectItem value="finished-product">Finished Product</SelectItem>
                              <SelectItem value="packaging">Packaging</SelectItem>
                              <SelectItem value="chemical">Chemical</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.currentStock}
                            onChange={(e) => updateInventoryItem(item.id, "currentStock", e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.minStock}
                            onChange={(e) => updateInventoryItem(item.id, "minStock", e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.maxStock}
                            onChange={(e) => updateInventoryItem(item.id, "maxStock", e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateInventoryItem(item.id, "unitPrice", e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.supplier}
                            onChange={(e) => updateInventoryItem(item.id, "supplier", e.target.value)}
                            placeholder="Supplier name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={item.lastUpdated}
                            onChange={(e) => updateInventoryItem(item.id, "lastUpdated", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.status}
                            onValueChange={(value) => updateInventoryItem(item.id, "status", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="in-stock">In Stock</SelectItem>
                              <SelectItem value="low-stock">Low Stock</SelectItem>
                              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                              <SelectItem value="on-order">On Order</SelectItem>
                              <SelectItem value="discontinued">Discontinued</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInventoryItems(inventoryItems.filter((i) => i.id !== item.id))}
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

          {/* Analysis and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Stock Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Analyze current stock levels, identify trends, and highlight critical items requiring attention..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Procurement Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Recommend items for reordering, suggest optimal stock levels, and identify cost-saving opportunities..."
                  className="min-h-[120px]"
                  rows={5}
                />
              </CardContent>
            </Card>
          </div>

          {/* Approval Section */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Verification and Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Inventory Controller:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Warehouse Manager:</p>
                    <div className="h-16 border-b border-gray-400"></div>
                    <p className="text-xs text-gray-500 mt-2">Signature & Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium text-gray-700 mb-8">Operations Manager:</p>
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
