// ===== Task Manager Application =====
// Aplikasi manajemen tugas mahasiswa dengan localStorage

class TaskManager {
  constructor() {
    this.tasks = []
    this.filteredTasks = []
    this.currentFilters = {
      search: "",
      status: "",
      subject: "",
    }
    this.init()
  }

  // Inisialisasi aplikasi
  init() {
    this.loadTasks()
    this.setupEventListeners()
    this.renderTasks()
    this.updateStatistics()
    this.updateSubjectFilter()
  }

  // ===== localStorage Management =====
  // Menyimpan tugas ke localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
  }

  // Memuat tugas dari localStorage
  loadTasks() {
    const stored = localStorage.getItem("tasks")
    this.tasks = stored ? JSON.parse(stored) : []
  }

  // ===== Event Listeners =====
  setupEventListeners() {
    // Form submission
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleAddTask()
    })

    // Search input
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.currentFilters.search = e.target.value.toLowerCase()
      this.applyFilters()
    })

    // Status filter
    document.getElementById("statusFilter").addEventListener("change", (e) => {
      this.currentFilters.status = e.target.value
      this.applyFilters()
    })

    // Subject filter
    document.getElementById("subjectFilter").addEventListener("change", (e) => {
      this.currentFilters.subject = e.target.value
      this.applyFilters()
    })
  }

  // ===== Form Validation =====
  // Validasi input form
  validateForm() {
    const taskName = document.getElementById("taskName").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const deadline = document.getElementById("deadline").value

    let isValid = true
    const errors = {
      taskName: "",
      subject: "",
      deadline: "",
    }

    // Validasi nama tugas
    if (!taskName) {
      errors.taskName = "Nama tugas tidak boleh kosong"
      isValid = false
    } else if (taskName.length < 3) {
      errors.taskName = "Nama tugas minimal 3 karakter"
      isValid = false
    } else if (taskName.length > 100) {
      errors.taskName = "Nama tugas maksimal 100 karakter"
      isValid = false
    }

    // Validasi mata kuliah
    if (!subject) {
      errors.subject = "Mata kuliah tidak boleh kosong"
      isValid = false
    } else if (subject.length < 3) {
      errors.subject = "Mata kuliah minimal 3 karakter"
      isValid = false
    }

    // Validasi deadline
    if (!deadline) {
      errors.deadline = "Deadline tidak boleh kosong"
      isValid = false
    } else {
      const selectedDate = new Date(deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        errors.deadline = "Deadline tidak boleh di masa lalu"
        isValid = false
      }
    }

    // Tampilkan error messages
    this.displayErrors(errors)

    return isValid
  }

  // Tampilkan error messages
  displayErrors(errors) {
    Object.keys(errors).forEach((field) => {
      const errorElement = document.getElementById(`${field}Error`)
      if (errors[field]) {
        errorElement.textContent = errors[field]
        errorElement.classList.add("show")
      } else {
        errorElement.textContent = ""
        errorElement.classList.remove("show")
      }
    })
  }

  // ===== Task Management =====
  // Tambah tugas baru
  handleAddTask() {
    if (!this.validateForm()) {
      return
    }

    const taskName = document.getElementById("taskName").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const deadline = document.getElementById("deadline").value
    const description = document.getElementById("description").value.trim()

    const newTask = {
      id: Date.now(),
      name: taskName,
      subject: subject,
      deadline: deadline,
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    this.tasks.push(newTask)
    this.saveTasks()
    this.resetForm()
    this.renderTasks()
    this.updateStatistics()
    this.updateSubjectFilter()
  }

  // Reset form
  resetForm() {
    document.getElementById("taskForm").reset()
    this.displayErrors({
      taskName: "",
      subject: "",
      deadline: "",
    })
  }

  // Toggle task completion
  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveTasks()
      this.renderTasks()
      this.updateStatistics()
    }
  }

  // Hapus tugas
  deleteTask(id) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveTasks()
      this.renderTasks()
      this.updateStatistics()
      this.updateSubjectFilter()
    }
  }

  // Edit tugas
  editTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      document.getElementById("taskName").value = task.name
      document.getElementById("subject").value = task.subject
      document.getElementById("deadline").value = task.deadline
      document.getElementById("description").value = task.description

      this.deleteTask(id)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // ===== Filtering & Searching =====
  // Terapkan filter
  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchSearch =
        task.name.toLowerCase().includes(this.currentFilters.search) ||
        task.subject.toLowerCase().includes(this.currentFilters.search)

      const matchStatus = !this.currentFilters.status || this.getTaskStatus(task) === this.currentFilters.status

      const matchSubject = !this.currentFilters.subject || task.subject === this.currentFilters.subject

      return matchSearch && matchStatus && matchSubject
    })

    this.renderTasks()
  }

  // Update subject filter options
  updateSubjectFilter() {
    const subjects = [...new Set(this.tasks.map((t) => t.subject))]
    const subjectFilter = document.getElementById("subjectFilter")
    const currentValue = subjectFilter.value

    subjectFilter.innerHTML = '<option value="">Semua Mata Kuliah</option>'
    subjects.forEach((subject) => {
      const option = document.createElement("option")
      option.value = subject
      option.textContent = subject
      subjectFilter.appendChild(option)
    })

    subjectFilter.value = currentValue
  }

  // ===== Task Status & Statistics =====
  // Dapatkan status tugas
  getTaskStatus(task) {
    if (task.completed) {
      return "completed"
    }

    const deadline = new Date(task.deadline)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (deadline < today) {
      return "overdue"
    }

    return "pending"
  }

  // Update statistik
  updateStatistics() {
    const total = this.tasks.length
    const completed = this.tasks.filter((t) => t.completed).length
    const pending = this.tasks.filter((t) => !t.completed && this.getTaskStatus(t) === "pending").length
    const overdue = this.tasks.filter((t) => !t.completed && this.getTaskStatus(t) === "overdue").length

    document.getElementById("totalTasks").textContent = total
    document.getElementById("completedTasks").textContent = completed
    document.getElementById("pendingTasks").textContent = pending
    document.getElementById("overdueTasks").textContent = overdue
  }

  // ===== Rendering =====
  // Render daftar tugas
  renderTasks() {
    const tasksList = document.getElementById("tasksList")
    const tasksToRender =
      this.currentFilters.search || this.currentFilters.status || this.currentFilters.subject
        ? this.filteredTasks
        : this.tasks

    if (tasksToRender.length === 0) {
      tasksList.innerHTML = '<div class="empty-state"><p>Tidak ada tugas yang sesuai dengan filter.</p></div>'
      return
    }

    tasksList.innerHTML = tasksToRender.map((task) => this.createTaskCard(task)).join("")

    // Tambahkan event listeners untuk checkbox dan tombol
    tasksToRender.forEach((task) => {
      const checkbox = document.querySelector(`input[data-task-id="${task.id}"]`)
      if (checkbox) {
        checkbox.addEventListener("change", () => this.toggleTask(task.id))
      }

      const deleteBtn = document.querySelector(`button[data-delete-id="${task.id}"]`)
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => this.deleteTask(task.id))
      }

      const editBtn = document.querySelector(`button[data-edit-id="${task.id}"]`)
      if (editBtn) {
        editBtn.addEventListener("click", () => this.editTask(task.id))
      }
    })
  }

  // Buat task card HTML
  createTaskCard(task) {
    const status = this.getTaskStatus(task)
    const statusLabel = {
      pending: "Pending",
      completed: "Selesai",
      overdue: "Overdue",
    }[status]

    const deadline = new Date(task.deadline)
    const formattedDate = deadline.toLocaleDateString("id-ID", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })

    return `
            <div class="task-card ${task.completed ? "completed" : ""} ${status === "overdue" ? "overdue" : ""}">
                <div class="task-header">
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        data-task-id="${task.id}"
                        ${task.completed ? "checked" : ""}
                    >
                    <div class="task-info">
                        <h3 class="task-title">${this.escapeHtml(task.name)}</h3>
                        <div class="task-meta">
                            <span class="task-subject">${this.escapeHtml(task.subject)}</span>
                            <span class="task-deadline">📅 ${formattedDate}</span>
                            <span class="task-status ${status}">${statusLabel}</span>
                        </div>
                        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ""}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-secondary btn-sm" data-edit-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm" data-delete-id="${task.id}">Hapus</button>
                </div>
            </div>
        `
  }

  // Escape HTML untuk keamanan
  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Inisialisasi aplikasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  new TaskManager()
})
