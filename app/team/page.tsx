"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Building,
  User,
  Plus,
  Edit,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  location: string
  joinDate: string
  status: "active" | "inactive" | "on-leave"
  avatar: string
  skills: string[]
  projects: number
  completionRate: number
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@cmplai.com",
    phone: "+91 98765 43210",
    role: "Senior Safety Engineer",
    department: "EHS",
    location: "Mumbai, Maharashtra",
    joinDate: "2022-03-15",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Safety Management", "Risk Assessment", "Compliance"],
    projects: 12,
    completionRate: 94,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@cmplai.com",
    phone: "+91 87654 32109",
    role: "Quality Assurance Manager",
    department: "Quality",
    location: "Delhi NCR, Delhi",
    joinDate: "2021-08-22",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Quality Control", "Process Improvement", "Auditing"],
    projects: 18,
    completionRate: 97,
  },
  {
    id: "3",
    name: "Arjun Patel",
    email: "arjun.patel@cmplai.com",
    phone: "+91 76543 21098",
    role: "Manufacturing Supervisor",
    department: "Manufacturing",
    location: "Ahmedabad, Gujarat",
    joinDate: "2023-01-10",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Production Planning", "Team Leadership", "Lean Manufacturing"],
    projects: 8,
    completionRate: 89,
  },
  {
    id: "4",
    name: "Kavya Reddy",
    email: "kavya.reddy@cmplai.com",
    phone: "+91 65432 10987",
    role: "Compliance Specialist",
    department: "Regulatory Affairs",
    location: "Hyderabad, Telangana",
    joinDate: "2022-11-05",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Regulatory Compliance", "Documentation", "Legal Research"],
    projects: 15,
    completionRate: 92,
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@cmplai.com",
    phone: "+91 54321 09876",
    role: "Operations Manager",
    department: "Operations",
    location: "Pune, Maharashtra",
    joinDate: "2020-06-18",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Operations Management", "Strategic Planning", "Cost Optimization"],
    projects: 22,
    completionRate: 96,
  },
  {
    id: "6",
    name: "Anita Gupta",
    email: "anita.gupta@cmplai.com",
    phone: "+91 43210 98765",
    role: "HR Business Partner",
    department: "Human Resources",
    location: "Bangalore, Karnataka",
    joinDate: "2021-12-03",
    status: "on-leave",
    avatar: "/placeholder-user.jpg",
    skills: ["Talent Management", "Employee Relations", "Performance Management"],
    projects: 10,
    completionRate: 88,
  },
  {
    id: "7",
    name: "Suresh Nair",
    email: "suresh.nair@cmplai.com",
    phone: "+91 32109 87654",
    role: "IT Systems Administrator",
    department: "Information Technology",
    location: "Chennai, Tamil Nadu",
    joinDate: "2023-04-12",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["System Administration", "Network Security", "Database Management"],
    projects: 6,
    completionRate: 91,
  },
  {
    id: "8",
    name: "Meera Joshi",
    email: "meera.joshi@cmplai.com",
    phone: "+91 21098 76543",
    role: "Financial Analyst",
    department: "Finance",
    location: "Mumbai, Maharashtra",
    joinDate: "2022-07-20",
    status: "active",
    avatar: "/placeholder-user.jpg",
    skills: ["Financial Analysis", "Budget Planning", "Cost Accounting"],
    projects: 14,
    completionRate: 93,
  },
]

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredMembers, setFilteredMembers] = useState(teamMembers)

  useEffect(() => {
    let filtered = teamMembers

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((member) => member.department === departmentFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => member.status === statusFilter)
    }

    setFilteredMembers(filtered)
  }, [searchTerm, departmentFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "inactive":
        return "Inactive"
      case "on-leave":
        return "On Leave"
      default:
        return "Unknown"
    }
  }

  const departments = Array.from(new Set(teamMembers.map((member) => member.department)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Team Management
                </h1>
                <p className="text-gray-600">Manage team members and their information</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {teamMembers.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <User className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-600">{departments.length}</p>
                </div>
                <Building className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(teamMembers.reduce((acc, m) => acc + m.completionRate, 0) / teamMembers.length)}%
                  </p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(member.status)}>{getStatusText(member.status)}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {member.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {member.department}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(member.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Projects</span>
                    <span className="text-sm text-gray-600">{member.projects}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm text-gray-600">{member.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${member.completionRate}%` }}></div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
