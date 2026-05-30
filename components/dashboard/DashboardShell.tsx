"use client"

import * as React from "react"
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Eye,
  LayoutGrid,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Users,
  UserRound,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge as UiBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Priority = "Baja" | "Media" | "Alta" | "Urgente"
type TaskStatus = "Pendiente" | "En progreso" | "Bloqueada" | "Completada"
type ProjectStatus = "Planificado" | "En progreso" | "En revisión" | "Completado"
type ProjectCategory = "Web" | "Mobile" | "Diseño" | "Marketing" | "Data"

type Project = {
  id: string
  name: string
  description: string
  category: ProjectCategory
  priority: Priority
  startDate: string
  endDate: string
  budget: number
  memberIds: string[]
}

type TeamMember = {
  id: string
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: string
  phone: string
  projectId: string | null
  isActive: boolean
}

type Task = {
  id: string
  description: string
  projectId: string | null
  status: TaskStatus
  priority: Priority
  userId: string
  deadline: string
}

type SettingsState = {
  companyName: string
  timezone: string
  brandColor: string
  defaultPriority: Priority
  notifications: boolean
  autoAssign: boolean
  compactMode: boolean
  workingDays: string
}

type ProjectFormState = {
  name: string
  description: string
  category: ProjectCategory | ""
  priority: Priority | ""
  startDate: string
  endDate: string
  budget: string
  memberIds: string[]
}

type TeamMemberFormState = {
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: string
  phone: string
  projectId: string
  isActive: boolean
}

type TaskFormState = {
  description: string
  projectId: string
  status: TaskStatus | ""
  priority: Priority | ""
  userId: string
  deadline: string
}

const projectSeed: Project[] = [
  {
    id: "proj-1",
    name: "E-commerce Platform",
    description: "Plataforma de comercio electrónico con checkout y panel administrativo.",
    category: "Web",
    priority: "Alta",
    startDate: "2026-05-08",
    endDate: "2026-07-10",
    budget: 22000,
    memberIds: ["mem-1", "mem-2", "mem-5"],
  },
  {
    id: "proj-2",
    name: "Mobile App",
    description: "Aplicación móvil para clientes y seguimiento de pedidos.",
    category: "Mobile",
    priority: "Media",
    startDate: "2026-05-12",
    endDate: "2026-08-15",
    budget: 18000,
    memberIds: ["mem-3", "mem-4"],
  },
  {
    id: "proj-3",
    name: "Dashboard Analytics",
    description: "Panel ejecutivo con KPIs, reportes y visualización de datos.",
    category: "Data",
    priority: "Urgente",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    budget: 26000,
    memberIds: ["mem-1", "mem-6"],
  },
]

const teamSeed: TeamMember[] = [
  {
    id: "mem-1",
    userId: "USR-001",
    role: "Lead",
    name: "María García",
    email: "maria@example.com",
    position: "Frontend Developer",
    birthdate: "1992-04-18",
    phone: "+52 55 3333 0101",
    projectId: "proj-1",
    isActive: true,
  },
  {
    id: "mem-2",
    userId: "USR-002",
    role: "Backend",
    name: "Juan Pérez",
    email: "juan@example.com",
    position: "Backend Developer",
    birthdate: "1990-09-12",
    phone: "+52 55 3333 0102",
    projectId: "proj-1",
    isActive: true,
  },
  {
    id: "mem-3",
    userId: "USR-003",
    role: "Designer",
    name: "Ana López",
    email: "ana@example.com",
    position: "UI/UX Designer",
    birthdate: "1994-01-04",
    phone: "+52 55 3333 0103",
    projectId: "proj-2",
    isActive: true,
  },
  {
    id: "mem-4",
    userId: "USR-004",
    role: "DevOps",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    position: "DevOps Engineer",
    birthdate: "1989-11-23",
    phone: "+52 55 3333 0104",
    projectId: "proj-2",
    isActive: false,
  },
  {
    id: "mem-5",
    userId: "USR-005",
    role: "QA",
    name: "Laura Martínez",
    email: "laura@example.com",
    position: "QA Analyst",
    birthdate: "1993-07-08",
    phone: "+52 55 3333 0105",
    projectId: "proj-1",
    isActive: true,
  },
  {
    id: "mem-6",
    userId: "USR-006",
    role: "Data",
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    position: "Data Engineer",
    birthdate: "1991-02-28",
    phone: "+52 55 3333 0106",
    projectId: "proj-3",
    isActive: true,
  },
]

const taskSeed: Task[] = [
  {
    id: "task-1",
    description: "Implementar autenticación con sesión persistente",
    projectId: "proj-1",
    status: "En progreso",
    priority: "Alta",
    userId: "USR-001",
    deadline: "2026-06-10",
  },
  {
    id: "task-2",
    description: "Diseñar flujo de onboarding para mobile",
    projectId: "proj-2",
    status: "Pendiente",
    priority: "Media",
    userId: "USR-003",
    deadline: "2026-06-12",
  },
  {
    id: "task-3",
    description: "Crear endpoint de métricas agregadas",
    projectId: "proj-3",
    status: "Completada",
    priority: "Urgente",
    userId: "USR-002",
    deadline: "2026-05-29",
  },
  {
    id: "task-4",
    description: "Ajustar dashboard responsive para tablets",
    projectId: "proj-3",
    status: "Bloqueada",
    priority: "Alta",
    userId: "USR-001",
    deadline: "2026-06-02",
  },
  {
    id: "task-5",
    description: "Documentar pipeline de despliegue",
    projectId: "proj-1",
    status: "Completada",
    priority: "Baja",
    userId: "USR-005",
    deadline: "2026-05-22",
  },
  {
    id: "task-6",
    description: "Preparar tablero de seguimiento semanal",
    projectId: "proj-2",
    status: "En progreso",
    priority: "Media",
    userId: "USR-006",
    deadline: "2026-06-18",
  },
]

const settingsSeed: SettingsState = {
  companyName: "Northstar Studio",
  timezone: "America/Mexico_City",
  brandColor: "Azul océano",
  defaultPriority: "Media",
  notifications: true,
  autoAssign: true,
  compactMode: false,
  workingDays: "Lunes a viernes",
}

const blankProjectForm: ProjectFormState = {
  name: "",
  description: "",
  category: "",
  priority: "",
  startDate: "",
  endDate: "",
  budget: "",
  memberIds: [],
}

const blankMemberForm: TeamMemberFormState = {
  userId: "",
  role: "",
  name: "",
  email: "",
  position: "",
  birthdate: "",
  phone: "",
  projectId: "",
  isActive: true,
}

const blankTaskForm: TaskFormState = {
  description: "",
  projectId: "",
  status: "",
  priority: "",
  userId: "",
  deadline: "",
}

const projectCategories: ProjectCategory[] = ["Web", "Mobile", "Diseño", "Marketing", "Data"]
const priorityOptions: Priority[] = ["Baja", "Media", "Alta", "Urgente"]
const taskStatusOptions: TaskStatus[] = ["Pendiente", "En progreso", "Bloqueada", "Completada"]

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function isPastDue(dateValue: string) {
  if (!dateValue) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadline = new Date(dateValue)
  deadline.setHours(0, 0, 0, 0)
  return deadline < today
}

function getProjectProgress(projectId: string, tasks: Task[]) {
  const projectTasks = tasks.filter((task) => task.projectId === projectId)
  const completedTasks = projectTasks.filter((task) => task.status === "Completada").length
  const totalTasks = projectTasks.length
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return { projectTasks, completedTasks, totalTasks, progress }
}

function statusVariant(status: ProjectStatus | TaskStatus) {
  switch (status) {
    case "Completada":
    case "Completado":
      return "default"
    case "En progreso":
      return "secondary"
    case "Bloqueada":
      return "destructive"
    case "Pendiente":
      return "outline"
    case "En revisión":
      return "secondary"
    default:
      return "outline"
  }
}

function priorityVariant(priority: Priority) {
  switch (priority) {
    case "Urgente":
      return "destructive"
    case "Alta":
      return "default"
    case "Media":
      return "secondary"
    case "Baja":
      return "outline"
    default:
      return "outline"
  }
}

function LoadingIcon({ active }: { active: boolean }) {
  if (!active) return null
  return <Loader2 className="mr-2 size-4 animate-spin" />
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

function StatCard({
  title,
  value,
  detail,
  icon,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactNode
}) {
  return (
    <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-full border border-border/60 bg-secondary/70 p-2 text-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}

function DatePickerField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const selectedDate = value ? new Date(value) : undefined

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Calendar
        selected={selectedDate}
        onSelect={(date) => onChange(date.toISOString().slice(0, 10))}
        className="w-full"
      />
      <Input value={value} onChange={(event) => onChange(event.target.value)} type="date" />
    </div>
  )
}

function DashboardShell() {
  const [projects, setProjects] = React.useState<Project[]>(projectSeed)
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(teamSeed)
  const [tasks, setTasks] = React.useState<Task[]>(taskSeed)
  const [settings, setSettings] = React.useState<SettingsState>(settingsSeed)
  const [overviewTab, setOverviewTab] = React.useState("overview")

  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false)
  const [projectDetailsId, setProjectDetailsId] = React.useState<string | null>(null)
  const [projectEditingId, setProjectEditingId] = React.useState<string | null>(null)
  const [projectForm, setProjectForm] = React.useState<ProjectFormState>(blankProjectForm)
  const [projectFormAlert, setProjectFormAlert] = React.useState<string | null>(null)
  const [projectLoading, setProjectLoading] = React.useState(false)

  const [memberDialogOpen, setMemberDialogOpen] = React.useState(false)
  const [memberEditingId, setMemberEditingId] = React.useState<string | null>(null)
  const [memberForm, setMemberForm] = React.useState<TeamMemberFormState>(blankMemberForm)
  const [memberFormAlert, setMemberFormAlert] = React.useState<string | null>(null)
  const [memberLoading, setMemberLoading] = React.useState(false)

  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false)
  const [taskEditingId, setTaskEditingId] = React.useState<string | null>(null)
  const [taskForm, setTaskForm] = React.useState<TaskFormState>(blankTaskForm)
  const [taskFormAlert, setTaskFormAlert] = React.useState<string | null>(null)
  const [taskLoading, setTaskLoading] = React.useState(false)
  const [taskPage, setTaskPage] = React.useState(1)
  const pageSize = 5

  const [settingsForm, setSettingsForm] = React.useState(settingsSeed)
  const [settingsAlert, setSettingsAlert] = React.useState<string | null>(null)
  const [settingsLoading, setSettingsLoading] = React.useState(false)

  const projectDetails = React.useMemo(
    () => projects.find((project) => project.id === projectDetailsId) ?? null,
    [projectDetailsId, projects]
  )

  const metrics = React.useMemo(() => {
    const activeProjects = projects.filter((project) => {
      const { progress } = getProjectProgress(project.id, tasks)
      return progress < 100
    }).length
    const completedTasks = tasks.filter((task) => task.status === "Completada").length
    const activeMembers = teamMembers.filter((member) => member.isActive).length
    const overdueTasks = tasks.filter((task) => task.status !== "Completada" && isPastDue(task.deadline)).length

    return {
      totalProjects: projects.length,
      activeProjects,
      completedTasks,
      activeMembers,
      overdueTasks,
    }
  }, [projects, tasks, teamMembers])

  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((left, right) => right.startDate.localeCompare(left.startDate))
  }, [projects])

  const taskPages = Math.max(1, Math.ceil(tasks.length / pageSize))
  const currentTaskPage = Math.min(taskPage, taskPages)
  const visibleTasks = React.useMemo(() => {
    const startIndex = (currentTaskPage - 1) * pageSize
    return tasks.slice(startIndex, startIndex + pageSize)
  }, [currentTaskPage, tasks])

  const projectProgressMap = React.useMemo(() => {
    return Object.fromEntries(
      projects.map((project) => [project.id, getProjectProgress(project.id, tasks)])
    ) as Record<string, ReturnType<typeof getProjectProgress>>
  }, [projects, tasks])

  const projectById = React.useCallback(
    (projectId: string | null) => projects.find((project) => project.id === projectId) ?? null,
    [projects]
  )

  const memberByUserId = React.useCallback(
    (userId: string) => teamMembers.find((member) => member.userId === userId) ?? null,
    [teamMembers]
  )

  function resetProjectForm(project?: Project) {
    if (!project) {
      setProjectForm(blankProjectForm)
      setProjectEditingId(null)
      setProjectFormAlert(null)
      return
    }

    setProjectForm({
      name: project.name,
      description: project.description,
      category: project.category,
      priority: project.priority,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: String(project.budget),
      memberIds: project.memberIds,
    })
    setProjectEditingId(project.id)
    setProjectFormAlert(null)
  }

  function resetMemberForm(member?: TeamMember) {
    if (!member) {
      setMemberForm(blankMemberForm)
      setMemberEditingId(null)
      setMemberFormAlert(null)
      return
    }

    setMemberForm({
      userId: member.userId,
      role: member.role,
      name: member.name,
      email: member.email,
      position: member.position,
      birthdate: member.birthdate,
      phone: member.phone,
      projectId: member.projectId ?? "",
      isActive: member.isActive,
    })
    setMemberEditingId(member.id)
    setMemberFormAlert(null)
  }

  function resetTaskForm(task?: Task) {
    if (!task) {
      setTaskForm(blankTaskForm)
      setTaskEditingId(null)
      setTaskFormAlert(null)
      return
    }

    setTaskForm({
      description: task.description,
      projectId: task.projectId ?? "",
      status: task.status,
      priority: task.priority,
      userId: task.userId,
      deadline: task.deadline,
    })
    setTaskEditingId(task.id)
    setTaskFormAlert(null)
  }

  function openCreateProject() {
    resetProjectForm()
    setProjectDialogOpen(true)
  }

  function openEditProject(project: Project) {
    resetProjectForm(project)
    setProjectDialogOpen(true)
  }

  function openCreateMember() {
    resetMemberForm()
    setMemberDialogOpen(true)
  }

  function openEditMember(member: TeamMember) {
    resetMemberForm(member)
    setMemberDialogOpen(true)
  }

  function openCreateTask() {
    resetTaskForm()
    setTaskDialogOpen(true)
  }

  function openEditTask(task: Task) {
    resetTaskForm(task)
    setTaskDialogOpen(true)
  }

  async function handleProjectSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!projectForm.name.trim() || !projectForm.description.trim() || !projectForm.category || !projectForm.priority || !projectForm.startDate || !projectForm.endDate) {
      setProjectFormAlert("Completa nombre, descripción, categoría, prioridad y fechas del proyecto.")
      return
    }

    if (!projectForm.memberIds.length) {
      setProjectFormAlert("Selecciona al menos un miembro del equipo para este proyecto.")
      return
    }

    setProjectLoading(true)
    setProjectFormAlert(null)
    await new Promise((resolve) => setTimeout(resolve, 850))

    const nextProject: Project = {
      id: projectEditingId ?? createId("proj"),
      name: projectForm.name.trim(),
      description: projectForm.description.trim(),
      category: projectForm.category,
      priority: projectForm.priority,
      startDate: projectForm.startDate,
      endDate: projectForm.endDate,
      budget: Number(projectForm.budget || 0),
      memberIds: projectForm.memberIds,
    }

    setProjects((current) => {
      const upserted = projectEditingId
        ? current.map((project) => (project.id === projectEditingId ? nextProject : project))
        : [nextProject, ...current]

      return upserted.map((project) =>
        project.id === nextProject.id
          ? project
          : {
              ...project,
              memberIds: project.memberIds.filter((memberId) => !nextProject.memberIds.includes(memberId)),
            }
      )
    })

    setTeamMembers((current) =>
      current.map((member) => {
        if (nextProject.memberIds.includes(member.id)) {
          return { ...member, projectId: nextProject.id }
        }

        if (projectEditingId && member.projectId === projectEditingId) {
          return { ...member, projectId: null }
        }

        return member
      })
    )

    setProjectLoading(false)
    setProjectDialogOpen(false)
    setProjectForm(blankProjectForm)
    setProjectEditingId(null)
  }

  async function handleMemberSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!memberForm.userId.trim() || !memberForm.role.trim() || !memberForm.name.trim() || !memberForm.email.trim() || !memberForm.position.trim() || !memberForm.birthdate || !memberForm.phone.trim()) {
      setMemberFormAlert("Completa userId, rol, nombre, email, cargo, fecha de nacimiento y teléfono.")
      return
    }

    if (!memberForm.email.includes("@")) {
      setMemberFormAlert("El correo no parece válido.")
      return
    }

    setMemberLoading(true)
    setMemberFormAlert(null)
    await new Promise((resolve) => setTimeout(resolve, 850))

    const nextMember: TeamMember = {
      id: memberEditingId ?? createId("mem"),
      userId: memberForm.userId.trim(),
      role: memberForm.role.trim(),
      name: memberForm.name.trim(),
      email: memberForm.email.trim(),
      position: memberForm.position.trim(),
      birthdate: memberForm.birthdate,
      phone: memberForm.phone.trim(),
      projectId: memberForm.projectId || null,
      isActive: memberForm.isActive,
    }

    setTeamMembers((current) =>
      memberEditingId
        ? current.map((member) => (member.id === memberEditingId ? nextMember : member))
        : [nextMember, ...current]
    )

    if (nextMember.projectId) {
      setProjects((current) =>
        current.map((project) =>
          project.id === nextMember.projectId && !project.memberIds.includes(nextMember.id)
            ? { ...project, memberIds: [...project.memberIds, nextMember.id] }
            : project
        )
      )
    }

    setMemberLoading(false)
    setMemberDialogOpen(false)
    setMemberForm(blankMemberForm)
    setMemberEditingId(null)
  }

  async function handleTaskSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!taskForm.description.trim() || !taskForm.projectId || !taskForm.status || !taskForm.priority || !taskForm.userId || !taskForm.deadline) {
      setTaskFormAlert("Completa descripción, proyecto, estado, prioridad, asignación y fecha límite.")
      return
    }

    setTaskLoading(true)
    setTaskFormAlert(null)
    await new Promise((resolve) => setTimeout(resolve, 850))

    const nextTask: Task = {
      id: taskEditingId ?? createId("task"),
      description: taskForm.description.trim(),
      projectId: taskForm.projectId,
      status: taskForm.status,
      priority: taskForm.priority,
      userId: taskForm.userId,
      deadline: taskForm.deadline,
    }

    setTasks((current) =>
      taskEditingId
        ? current.map((task) => (task.id === taskEditingId ? nextTask : task))
        : [nextTask, ...current]
    )

    setTaskLoading(false)
    setTaskDialogOpen(false)
    setTaskForm(blankTaskForm)
    setTaskEditingId(null)
  }

  async function deleteProject(projectId: string) {
    if (!window.confirm("¿Eliminar este proyecto? Se retirarán sus tareas y se desasignarán sus miembros.")) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    setProjects((current) => current.filter((project) => project.id !== projectId))
    setTasks((current) => current.filter((task) => task.projectId !== projectId))
    setTeamMembers((current) =>
      current.map((member) => (member.projectId === projectId ? { ...member, projectId: null } : member))
    )

    if (projectDetailsId === projectId) {
      setProjectDetailsId(null)
    }
  }

  async function deleteMember(memberId: string) {
    if (!window.confirm("¿Eliminar este miembro?")) {
      return
    }

    const member = teamMembers.find((item) => item.id === memberId)
    if (!member) return

    await new Promise((resolve) => setTimeout(resolve, 400))
    setTeamMembers((current) => current.filter((member) => member.id !== memberId))
    setProjects((current) =>
      current.map((project) => ({
        ...project,
        memberIds: project.memberIds.filter((id) => id !== memberId),
      }))
    )
    setTasks((current) => current.filter((task) => task.userId !== member.userId))
  }

  async function deleteTask(taskId: string) {
    if (!window.confirm("¿Eliminar esta tarea?")) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 350))
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSettingsLoading(true)
    setSettingsAlert(null)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSettings(settingsForm)
    setSettingsLoading(false)
    setSettingsAlert("Configuración guardada. La interfaz quedó sincronizada con los ajustes de memoria.")
  }

  const taskPageButtons = React.useMemo(() => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (taskPages <= maxVisible) {
      for (let index = 1; index <= taskPages; index += 1) pages.push(index)
      return pages
    }

    pages.push(1)
    if (currentTaskPage > 3) pages.push("ellipsis")

    const start = Math.max(2, currentTaskPage - 1)
    const end = Math.min(taskPages - 1, currentTaskPage + 1)

    for (let index = start; index <= end; index += 1) pages.push(index)
    if (currentTaskPage < taskPages - 2) pages.push("ellipsis")
    pages.push(taskPages)

    return pages
  }, [currentTaskPage, taskPages])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.16),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,0.98),_rgba(240,253,250,0.94))] px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
            <div className="space-y-4">
              <UiBadge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em]">
                Dashboard operativo
              </UiBadge>
              <div className="space-y-2">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Gestión de proyectos, equipo y tareas en un solo lugar.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  Todo funciona con datos en memoria, carga simulada y componentes shadcn/ui listos para desplegar en Vercel sin backend.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={openCreateProject}>
                  <Plus className="mr-2 size-4" />
                  Nuevo proyecto
                </Button>
                <Button variant="outline" onClick={openCreateMember}>
                  <Users className="mr-2 size-4" />
                  Nuevo miembro
                </Button>
                <Button variant="outline" onClick={openCreateTask}>
                  <CalendarDays className="mr-2 size-4" />
                  Nueva tarea
                </Button>
              </div>
            </div>

            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Estado general</CardTitle>
                <CardDescription>Resumen de la memoria interna del dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <LayoutGrid className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Proyectos activos</p>
                    <p className="text-2xl font-semibold">{metrics.activeProjects}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tareas completadas</p>
                    <p className="text-2xl font-semibold">{metrics.completedTasks}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Configuración activa</p>
                  <p className="mt-1 text-sm font-medium">{settings.companyName}</p>
                  <p className="text-xs text-muted-foreground">
                    Color de marca {settings.brandColor} · Prioridad por defecto {settings.defaultPriority}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Tabs value={overviewTab} onValueChange={setOverviewTab} className="space-y-6">
          <TabsList className="flex w-full flex-wrap justify-start gap-2 rounded-2xl bg-background/85 p-2 shadow-sm backdrop-blur">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total proyectos"
                value={String(metrics.totalProjects)}
                detail="Proyectos guardados en memoria"
                icon={<LayoutGrid className="size-4" />}
              />
              <StatCard
                title="Tareas completadas"
                value={String(metrics.completedTasks)}
                detail="Tareas con estado Completada"
                icon={<CheckCircle2 className="size-4" />}
              />
              <StatCard
                title="Miembros activos"
                value={String(metrics.activeMembers)}
                detail="Miembros con acceso operativo"
                icon={<UserRound className="size-4" />}
              />
              <StatCard
                title="Tareas vencidas"
                value={String(metrics.overdueTasks)}
                detail="Fechas límite superadas"
                icon={<CircleAlert className="size-4" />}
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardTitle>Progreso por proyecto</CardTitle>
                  <CardDescription>Avance calculado desde las tareas asociadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {sortedProjects.map((project) => {
                    const progress = projectProgressMap[project.id] ?? { progress: 0, totalTasks: 0, completedTasks: 0, projectTasks: [] }
                    return (
                      <div key={project.id} className="space-y-2 rounded-2xl border border-border/60 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.category} · {progress.totalTasks} tareas</p>
                          </div>
                          <UiBadge variant={priorityVariant(project.priority)}>{project.priority}</UiBadge>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress.progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{progress.completedTasks} completadas</span>
                          <span>{progress.progress}%</span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                  <CardDescription>Información derivada de la memoria actual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.slice(0, 4).map((task) => {
                    const member = memberByUserId(task.userId)
                    const project = projectById(task.projectId)
                    return (
                      <div key={task.id} className="flex items-start gap-3 rounded-2xl border border-border/60 p-4">
                        <Avatar className="size-10">
                          <AvatarFallback>{initials(member?.name ?? "Tarea")}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{task.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {member?.name ?? task.userId} · {project?.name ?? "Sin proyecto"}
                          </p>
                        </div>
                        <UiBadge variant={statusVariant(task.status)}>{task.status}</UiBadge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <SectionHeader
              title="Menú: Proyectos"
              description="Crea, edita, consulta y elimina proyectos con miembros asignados."
              action={
                <Button onClick={openCreateProject}>
                  <Plus className="mr-2 size-4" />
                  Crear proyecto
                </Button>
              }
            />

            <div className="grid gap-4 xl:grid-cols-3">
              {sortedProjects.map((project) => {
                const progress = projectProgressMap[project.id] ?? { progress: 0, totalTasks: 0, completedTasks: 0, projectTasks: [] }
                const members = teamMembers.filter((member) => project.memberIds.includes(member.id))
                const statusLabel = progress.progress === 100 ? "Completado" : progress.totalTasks > 0 ? "En progreso" : "Planificado"

                return (
                  <Card key={project.id} className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <UiBadge variant={statusVariant(statusLabel as ProjectStatus)}>{statusLabel}</UiBadge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="rounded-2xl border border-border/60 p-3">
                          <p>Categoría</p>
                          <p className="font-medium text-foreground">{project.category}</p>
                        </div>
                        <div className="rounded-2xl border border-border/60 p-3">
                          <p>Presupuesto</p>
                          <p className="font-medium text-foreground">{formatMoney(project.budget)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{progress.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{members.length} miembros</span>
                        <span>•</span>
                        <span>{progress.totalTasks} tareas</span>
                        <span>•</span>
                        <span>{project.startDate} → {project.endDate}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => setProjectDetailsId(project.id)}>
                          <Eye className="mr-2 size-4" />
                          Ver detalles
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditProject(project)}>
                          <Pencil className="mr-2 size-4" />
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => void deleteProject(project.id)}>
                          <Trash2 className="mr-2 size-4" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <SectionHeader
              title="Menú: Tareas"
              description="CRUD completo con paginación y cálculo de métricas desde la memoria interna."
              action={
                <Button onClick={openCreateTask}>
                  <Plus className="mr-2 size-4" />
                  Crear tarea
                </Button>
              }
            />

            <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle>Listado de tareas</CardTitle>
                <CardDescription>Paginación incluida para evitar tablas interminables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border border-border/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Proyecto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleTasks.map((task) => {
                        const member = memberByUserId(task.userId)
                        const project = projectById(task.projectId)
                        return (
                          <TableRow key={task.id}>
                            <TableCell className="max-w-[260px] whitespace-normal font-medium">{task.description}</TableCell>
                            <TableCell>{project?.name ?? "Sin proyecto"}</TableCell>
                            <TableCell><UiBadge variant={statusVariant(task.status)}>{task.status}</UiBadge></TableCell>
                            <TableCell><UiBadge variant={priorityVariant(task.priority)}>{task.priority}</UiBadge></TableCell>
                            <TableCell>{member?.name ?? task.userId}</TableCell>
                            <TableCell>{task.deadline}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost" onClick={() => openEditTask(task)}>Editar</Button>
                                <Button size="sm" variant="ghost" onClick={() => void deleteTask(task.id)}>Eliminar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setTaskPage((current) => Math.max(1, current - 1))}
                        disabled={currentTaskPage === 1}
                      />
                    </PaginationItem>
                    {taskPageButtons.map((entry, index) => (
                      <PaginationItem key={`${entry}-${index}`}>
                        {entry === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            isActive={entry === currentTaskPage}
                            onClick={() => setTaskPage(entry)}
                          >
                            {entry}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setTaskPage((current) => Math.min(taskPages, current + 1))}
                        disabled={currentTaskPage === taskPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <SectionHeader
              title="Menú: Equipo"
              description="CRUD completo de miembros con validaciones, fecha de nacimiento y estado activo."
              action={
                <Button onClick={openCreateMember}>
                  <Plus className="mr-2 size-4" />
                  Nuevo miembro
                </Button>
              }
            />

            <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle>Miembros del equipo</CardTitle>
                <CardDescription>Cada registro incluye projectId, role, position, birthdate, phone e isActive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-2xl border border-border/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Miembro</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Posición</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Proyecto</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member) => {
                        const project = projectById(member.projectId)
                        return (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="size-9">
                                  <AvatarFallback>{initials(member.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.phone}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{member.userId}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{project?.name ?? "Sin asignar"}</TableCell>
                            <TableCell>
                              <UiBadge variant={member.isActive ? "default" : "secondary"}>
                                {member.isActive ? "Activo" : "Inactivo"}
                              </UiBadge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost" onClick={() => openEditMember(member)}>Editar</Button>
                                <Button size="sm" variant="ghost" onClick={() => void deleteMember(member.id)}>Eliminar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SectionHeader
              title="Menú: Configuración"
              description="Simulación de preferencias de cuenta y operación del dashboard."
            />

            <Card className="border-border/60 bg-background/85 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle>Preferencias del sistema</CardTitle>
                <CardDescription>Los cambios se guardan en memoria y se reflejan en el panel.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={saveSettings} className="grid gap-5 lg:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Nombre de la compañía</Label>
                    <Input
                      id="companyName"
                      value={settingsForm.companyName}
                      onChange={(event) => setSettingsForm({ ...settingsForm, companyName: event.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Zona horaria</Label>
                    <Input
                      id="timezone"
                      value={settingsForm.timezone}
                      onChange={(event) => setSettingsForm({ ...settingsForm, timezone: event.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brandColor">Color de marca</Label>
                    <Input
                      id="brandColor"
                      value={settingsForm.brandColor}
                      onChange={(event) => setSettingsForm({ ...settingsForm, brandColor: event.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="defaultPriority">Prioridad por defecto</Label>
                    <Select
                      value={settingsForm.defaultPriority}
                      onValueChange={(value) => setSettingsForm({ ...settingsForm, defaultPriority: value as Priority })}
                    >
                      <SelectTrigger id="defaultPriority">
                        <SelectValue placeholder="Selecciona una prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 lg:col-span-2">
                    <Label htmlFor="workingDays">Horario de trabajo</Label>
                    <Textarea
                      id="workingDays"
                      value={settingsForm.workingDays}
                      onChange={(event) => setSettingsForm({ ...settingsForm, workingDays: event.target.value })}
                    />
                  </div>
                  <div className="flex flex-wrap gap-6 rounded-2xl border border-border/60 p-4 lg:col-span-2">
                    <label className="flex items-center gap-3 text-sm">
                      <Switch
                        checked={settingsForm.notifications}
                        onCheckedChange={(checked) =>
                          setSettingsForm({ ...settingsForm, notifications: checked === true })
                        }
                      />
                      Notificaciones activas
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <Switch
                        checked={settingsForm.autoAssign}
                        onCheckedChange={(checked) =>
                          setSettingsForm({ ...settingsForm, autoAssign: checked === true })
                        }
                      />
                      Asignación automática
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <Switch
                        checked={settingsForm.compactMode}
                        onCheckedChange={(checked) =>
                          setSettingsForm({ ...settingsForm, compactMode: checked === true })
                        }
                      />
                      Vista compacta
                    </label>
                  </div>
                  {settingsAlert ? (
                    <Alert variant="default" className="lg:col-span-2">
                      <AlertTitle>Configuración guardada</AlertTitle>
                      <AlertDescription>{settingsAlert}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="flex justify-end lg:col-span-2">
                    <Button type="submit" disabled={settingsLoading}>
                      <LoadingIcon active={settingsLoading} />
                      Guardar configuración
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{projectEditingId ? "Editar proyecto" : "Crear proyecto"}</DialogTitle>
            <DialogDescription>
              Completa la información, selecciona miembros y confirma la carga simulada.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="grid gap-5">
            {projectFormAlert ? (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Revisa el formulario</AlertTitle>
                <AlertDescription>{projectFormAlert}</AlertDescription>
              </Alert>
            ) : null}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Nombre</Label>
                <Input id="project-name" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-category">Categoría</Label>
                <Select value={projectForm.category} onValueChange={(value) => setProjectForm({ ...projectForm, category: value as ProjectCategory })}>
                  <SelectTrigger id="project-category"><SelectValue placeholder="Selecciona una categoría" /></SelectTrigger>
                  <SelectContent>
                    {projectCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 lg:col-span-2">
                <Label htmlFor="project-description">Descripción</Label>
                <Textarea id="project-description" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-priority">Prioridad</Label>
                <Select value={projectForm.priority} onValueChange={(value) => setProjectForm({ ...projectForm, priority: value as Priority })}>
                  <SelectTrigger id="project-priority"><SelectValue placeholder="Selecciona prioridad" /></SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((priority) => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-budget">Presupuesto</Label>
                <Input id="project-budget" type="number" min="0" value={projectForm.budget} onChange={(event) => setProjectForm({ ...projectForm, budget: event.target.value })} />
              </div>
              <DatePickerField label="Fecha de inicio" value={projectForm.startDate} onChange={(value) => setProjectForm({ ...projectForm, startDate: value })} />
              <DatePickerField label="Fecha de cierre" value={projectForm.endDate} onChange={(value) => setProjectForm({ ...projectForm, endDate: value })} />
            </div>
            <div className="grid gap-3">
              <Label>Miembros del equipo</Label>
              <div className="grid gap-2 rounded-2xl border border-border/60 p-4 sm:grid-cols-2">
                {teamMembers.map((member) => {
                  const checked = projectForm.memberIds.includes(member.id)
                  return (
                    <label key={member.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setProjectForm((current) => ({
                            ...current,
                            memberIds: event.target.checked
                              ? [...current.memberIds, member.id]
                              : current.memberIds.filter((id) => id !== member.id),
                          }))
                        }}
                      />
                      <span className="min-w-0">
                        <span className="block font-medium">{member.name}</span>
                        <span className="block text-xs text-muted-foreground">{member.position}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={projectLoading}>
                <LoadingIcon active={projectLoading} />
                {projectEditingId ? "Actualizar proyecto" : "Guardar proyecto"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{memberEditingId ? "Editar miembro" : "Nuevo miembro"}</DialogTitle>
            <DialogDescription>
              Completa los campos de equipo y selecciona su proyecto si corresponde.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMemberSubmit} className="grid gap-5">
            {memberFormAlert ? (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Revisa los datos</AlertTitle>
                <AlertDescription>{memberFormAlert}</AlertDescription>
              </Alert>
            ) : null}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="member-userId">User ID</Label>
                <Input id="member-userId" value={memberForm.userId} onChange={(event) => setMemberForm({ ...memberForm, userId: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-role">Rol</Label>
                <Input id="member-role" value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-name">Nombre</Label>
                <Input id="member-name" value={memberForm.name} onChange={(event) => setMemberForm({ ...memberForm, name: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-email">Email</Label>
                <Input id="member-email" type="email" value={memberForm.email} onChange={(event) => setMemberForm({ ...memberForm, email: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-position">Posición</Label>
                <Input id="member-position" value={memberForm.position} onChange={(event) => setMemberForm({ ...memberForm, position: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-phone">Teléfono</Label>
                <Input id="member-phone" value={memberForm.phone} onChange={(event) => setMemberForm({ ...memberForm, phone: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-project">Proyecto</Label>
                <Select value={memberForm.projectId || "__none__"} onValueChange={(value) => setMemberForm({ ...memberForm, projectId: value === "__none__" ? "" : value })}>
                  <SelectTrigger id="member-project"><SelectValue placeholder="Sin asignar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Sin asignar</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
                <div>
                  <p className="text-sm font-medium">Miembro activo</p>
                  <p className="text-xs text-muted-foreground">Activa o desactiva el acceso operativo.</p>
                </div>
                <Switch checked={memberForm.isActive} onCheckedChange={(checked) => setMemberForm({ ...memberForm, isActive: checked === true })} />
              </div>
              <div className="lg:col-span-2">
                <DatePickerField label="Fecha de nacimiento" value={memberForm.birthdate} onChange={(value) => setMemberForm({ ...memberForm, birthdate: value })} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setMemberDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={memberLoading}>
                <LoadingIcon active={memberLoading} />
                {memberEditingId ? "Actualizar miembro" : "Guardar miembro"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{taskEditingId ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
            <DialogDescription>
              Crea y modifica tareas con estado, prioridad, asignación y fecha límite.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTaskSubmit} className="grid gap-5">
            {taskFormAlert ? (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Revisa los datos</AlertTitle>
                <AlertDescription>{taskFormAlert}</AlertDescription>
              </Alert>
            ) : null}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2 lg:col-span-2">
                <Label htmlFor="task-description">Descripción</Label>
                <Textarea id="task-description" value={taskForm.description} onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-project">Proyecto</Label>
                <Select value={taskForm.projectId} onValueChange={(value) => setTaskForm({ ...taskForm, projectId: value })}>
                  <SelectTrigger id="task-project"><SelectValue placeholder="Selecciona proyecto" /></SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-user">User ID</Label>
                <Select value={taskForm.userId} onValueChange={(value) => setTaskForm({ ...taskForm, userId: value })}>
                  <SelectTrigger id="task-user"><SelectValue placeholder="Selecciona miembro" /></SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.userId}>{member.name} · {member.userId}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-status">Estado</Label>
                <Select value={taskForm.status} onValueChange={(value) => setTaskForm({ ...taskForm, status: value as TaskStatus })}>
                  <SelectTrigger id="task-status"><SelectValue placeholder="Selecciona estado" /></SelectTrigger>
                  <SelectContent>
                    {taskStatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-priority">Prioridad</Label>
                <Select value={taskForm.priority} onValueChange={(value) => setTaskForm({ ...taskForm, priority: value as Priority })}>
                  <SelectTrigger id="task-priority"><SelectValue placeholder="Selecciona prioridad" /></SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((priority) => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <DatePickerField label="Fecha límite" value={taskForm.deadline} onChange={(value) => setTaskForm({ ...taskForm, deadline: value })} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setTaskDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={taskLoading}>
                <LoadingIcon active={taskLoading} />
                {taskEditingId ? "Actualizar tarea" : "Guardar tarea"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(projectDetails)} onOpenChange={() => setProjectDetailsId(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {projectDetails ? (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del proyecto</DialogTitle>
                <DialogDescription>{projectDetails.name}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-5">
                {(() => {
                  const progress = projectProgressMap[projectDetails.id] ?? { progress: 0, totalTasks: 0, completedTasks: 0, projectTasks: [] }
                  const members = teamMembers.filter((member) => projectDetails.memberIds.includes(member.id))
                  return (
                    <>
                      <div className="grid gap-3 rounded-2xl border border-border/60 p-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Resumen</p>
                          <p className="mt-1 text-sm text-foreground">{projectDetails.description}</p>
                        </div>
                        <div className="grid gap-2 text-sm text-muted-foreground">
                          <span>Categoría: <strong className="text-foreground">{projectDetails.category}</strong></span>
                          <span>Prioridad: <strong className="text-foreground">{projectDetails.priority}</strong></span>
                          <span>Presupuesto: <strong className="text-foreground">{formatMoney(projectDetails.budget)}</strong></span>
                          <span>Fechas: <strong className="text-foreground">{projectDetails.startDate} → {projectDetails.endDate}</strong></span>
                        </div>
                      </div>
                      <div className="space-y-2 rounded-2xl border border-border/60 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso total</span>
                          <span className="font-medium">{progress.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress.progress}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground">{progress.completedTasks} de {progress.totalTasks} tareas completadas</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-border/60 bg-background/80">
                          <CardHeader>
                            <CardTitle className="text-base">Miembros asignados</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {members.length ? members.map((member) => (
                              <div key={member.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                                <Avatar className="size-9">
                                  <AvatarFallback>{initials(member.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.position}</p>
                                </div>
                              </div>
                            )) : <p className="text-sm text-muted-foreground">Sin miembros asignados.</p>}
                          </CardContent>
                        </Card>
                        <Card className="border-border/60 bg-background/80">
                          <CardHeader>
                            <CardTitle className="text-base">Tareas asociadas</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {progress.projectTasks.length ? progress.projectTasks.map((task) => (
                              <div key={task.id} className="rounded-xl border border-border/60 p-3">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-medium">{task.description}</p>
                                  <UiBadge variant={statusVariant(task.status)}>{task.status}</UiBadge>
                                </div>
                                <p className="text-xs text-muted-foreground">Deadline {task.deadline}</p>
                              </div>
                            )) : <p className="text-sm text-muted-foreground">Sin tareas vinculadas.</p>}
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )
                })()}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { DashboardShell }
