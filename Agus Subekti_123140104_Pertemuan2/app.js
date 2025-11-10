// Class untuk Schedule
class Schedule {
  constructor(id, subject, time, room, instructor) {
    this.id = id
    this.subject = subject
    this.time = time
    this.room = room
    this.instructor = instructor
  }
}

// Class untuk Task
class Task {
  constructor(id, title, description, dueDate, completed = false) {
    this.id = id
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.completed = completed
  }
}

// Class untuk Note
class Note {
  constructor(id, title, content, createdAt) {
    this.id = id
    this.title = title
    this.content = content
    this.createdAt = createdAt
  }
}

// Main Dashboard Class
class Dashboard {
  constructor() {
    this.schedules = []
    this.tasks = []
    this.notes = []
    this.currentModal = null
    this.editingId = null
    this.editingType = null
    this.init()
  }

  // Arrow function untuk inisialisasi
  init = () => {
    this.loadFromLocalStorage()
    this.setupEventListeners()
    this.updateCurrentTime()
    this.renderAllData()
    this.loadWeatherData()
    setInterval(this.updateCurrentTime, 1000)
  }

  // Arrow function untuk setup event listeners
  setupEventListeners = () => {
    // Tab navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.switchTab(e.target.dataset.tab))
    })

    // Add buttons
    document.getElementById("addScheduleBtn").addEventListener("click", () => this.openModal("schedule"))
    document.getElementById("addTaskBtn").addEventListener("click", () => this.openModal("tasks"))
    document.getElementById("addNoteBtn").addEventListener("click", () => this.openModal("notes"))

    // Modal controls
    document.getElementById("modalClose").addEventListener("click", () => this.closeModal())
    document.getElementById("btnCancel").addEventListener("click", () => this.closeModal())
    document.getElementById("modalForm").addEventListener("submit", (e) => this.handleFormSubmit(e))

    // Close modal on background click
    document.getElementById("modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") this.closeModal()
    })
  }

  // Arrow function untuk switch tab
  switchTab = (tabName) => {
    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"))
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"))

    document.getElementById(tabName).classList.add("active")
    event.target.classList.add("active")
  }

  // Arrow function untuk update waktu
  updateCurrentTime = () => {
    const now = new Date()
    const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
    document.getElementById("currentTime").textContent = timeString
  }

  // Arrow function untuk open modal
  openModal = (type) => {
    this.editingType = type
    this.editingId = null
    const modal = document.getElementById("modal")
    const title = document.getElementById("modalTitle")
    const formFields = document.getElementById("formFields")

    title.textContent = `Tambah ${this.getTypeLabel(type)}`
    formFields.innerHTML = this.getFormFields(type)
    modal.classList.add("active")
  }

  // Arrow function untuk close modal
  closeModal = () => {
    document.getElementById("modal").classList.remove("active")
    document.getElementById("modalForm").reset()
    this.editingId = null
    this.editingType = null
  }

  // Arrow function untuk get type label
  getTypeLabel = (type) => {
    const labels = {
      schedule: "Jadwal Kuliah",
      tasks: "Tugas",
      notes: "Catatan",
    }
    return labels[type] || type
  }

  // Arrow function untuk get form fields menggunakan template literals
  getFormFields = (type) => {
    const fields = {
      schedule: `
                <div class="form-group">
                    <label>Mata Kuliah</label>
                    <input type="text" id="subject" placeholder="Masukkan nama mata kuliah" required>
                </div>
                <div class="form-group">
                    <label>Waktu</label>
                    <input type="time" id="time" required>
                </div>
                <div class="form-group">
                    <label>Ruangan</label>
                    <input type="text" id="room" placeholder="Masukkan nomor ruangan" required>
                </div>
                <div class="form-group">
                    <label>Dosen</label>
                    <input type="text" id="instructor" placeholder="Masukkan nama dosen" required>
                </div>
            `,
      tasks: `
                <div class="form-group">
                    <label>Judul Tugas</label>
                    <input type="text" id="taskTitle" placeholder="Masukkan judul tugas" required>
                </div>
                <div class="form-group">
                    <label>Deskripsi</label>
                    <textarea id="taskDesc" placeholder="Masukkan deskripsi tugas"></textarea>
                </div>
                <div class="form-group">
                    <label>Tanggal Deadline</label>
                    <input type="date" id="dueDate" required>
                </div>
            `,
      notes: `
                <div class="form-group">
                    <label>Judul Catatan</label>
                    <input type="text" id="noteTitle" placeholder="Masukkan judul catatan" required>
                </div>
                <div class="form-group">
                    <label>Isi Catatan</label>
                    <textarea id="noteContent" placeholder="Masukkan isi catatan" required></textarea>
                </div>
            `,
    }
    return fields[type] || ""
  }

  // Arrow function untuk handle form submit
  handleFormSubmit = (e) => {
    e.preventDefault()

    if (this.editingType === "schedule") {
      this.saveSchedule()
    } else if (this.editingType === "tasks") {
      this.saveTask()
    } else if (this.editingType === "notes") {
      this.saveNote()
    }

    this.closeModal()
  }

  // Arrow function untuk save schedule
  saveSchedule = () => {
    const subject = document.getElementById("subject").value
    const time = document.getElementById("time").value
    const room = document.getElementById("room").value
    const instructor = document.getElementById("instructor").value

    if (this.editingId) {
      const schedule = this.schedules.find((s) => s.id === this.editingId)
      if (schedule) {
        schedule.subject = subject
        schedule.time = time
        schedule.room = room
        schedule.instructor = instructor
      }
    } else {
      const newSchedule = new Schedule(Date.now(), subject, time, room, instructor)
      this.schedules.push(newSchedule)
    }

    this.saveToLocalStorage()
    this.renderSchedules()
  }

  // Arrow function untuk save task
  saveTask = () => {
    const title = document.getElementById("taskTitle").value
    const description = document.getElementById("taskDesc").value
    const dueDate = document.getElementById("dueDate").value

    if (this.editingId) {
      const task = this.tasks.find((t) => t.id === this.editingId)
      if (task) {
        task.title = title
        task.description = description
        task.dueDate = dueDate
      }
    } else {
      const newTask = new Task(Date.now(), title, description, dueDate, false)
      this.tasks.push(newTask)
    }

    this.saveToLocalStorage()
    this.renderTasks()
  }

  // Arrow function untuk save note
  saveNote = () => {
    const title = document.getElementById("noteTitle").value
    const content = document.getElementById("noteContent").value
    const createdAt = new Date().toLocaleDateString("id-ID")

    if (this.editingId) {
      const note = this.notes.find((n) => n.id === this.editingId)
      if (note) {
        note.title = title
        note.content = content
      }
    } else {
      const newNote = new Note(Date.now(), title, content, createdAt)
      this.notes.push(newNote)
    }

    this.saveToLocalStorage()
    this.renderNotes()
  }

  // Arrow function untuk delete schedule
  deleteSchedule = (id) => {
    this.schedules = this.schedules.filter((s) => s.id !== id)
    this.saveToLocalStorage()
    this.renderSchedules()
  }

  // Arrow function untuk delete task
  deleteTask = (id) => {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.saveToLocalStorage()
    this.renderTasks()
  }

  // Arrow function untuk delete note
  deleteNote = (id) => {
    this.notes = this.notes.filter((n) => n.id !== id)
    this.saveToLocalStorage()
    this.renderNotes()
  }

  // Arrow function untuk toggle task completion
  toggleTask = (id) => {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveToLocalStorage()
      this.renderTasks()
    }
  }

  // Arrow function untuk edit schedule
  editSchedule = (id) => {
    const schedule = this.schedules.find((s) => s.id === id)
    if (schedule) {
      this.editingId = id
      this.editingType = "schedule"
      const modal = document.getElementById("modal")
      const title = document.getElementById("modalTitle")
      const formFields = document.getElementById("formFields")

      title.textContent = "Edit Jadwal Kuliah"
      formFields.innerHTML = this.getFormFields("schedule")

      document.getElementById("subject").value = schedule.subject
      document.getElementById("time").value = schedule.time
      document.getElementById("room").value = schedule.room
      document.getElementById("instructor").value = schedule.instructor

      modal.classList.add("active")
    }
  }

  // Arrow function untuk edit task
  editTask = (id) => {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      this.editingId = id
      this.editingType = "tasks"
      const modal = document.getElementById("modal")
      const title = document.getElementById("modalTitle")
      const formFields = document.getElementById("formFields")

      title.textContent = "Edit Tugas"
      formFields.innerHTML = this.getFormFields("tasks")

      document.getElementById("taskTitle").value = task.title
      document.getElementById("taskDesc").value = task.description
      document.getElementById("dueDate").value = task.dueDate

      modal.classList.add("active")
    }
  }

  // Arrow function untuk edit note
  editNote = (id) => {
    const note = this.notes.find((n) => n.id === id)
    if (note) {
      this.editingId = id
      this.editingType = "notes"
      const modal = document.getElementById("modal")
      const title = document.getElementById("modalTitle")
      const formFields = document.getElementById("formFields")

      title.textContent = "Edit Catatan"
      formFields.innerHTML = this.getFormFields("notes")

      document.getElementById("noteTitle").value = note.title
      document.getElementById("noteContent").value = note.content

      modal.classList.add("active")
    }
  }

  // Arrow function untuk render schedules menggunakan template literals
  renderSchedules = () => {
    const container = document.getElementById("scheduleList")

    if (this.schedules.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <div class="empty-state-text">Belum ada jadwal. Tambahkan jadwal kuliah Anda sekarang!</div>
                </div>
            `
      return
    }

    container.innerHTML = this.schedules
      .map(
        (schedule) => `
            <div class="schedule-item">
                <div class="item-content">
                    <div class="item-title">${schedule.subject}</div>
                    <div class="item-description">Ruangan: ${schedule.room}</div>
                    <div class="item-meta">
                        <span>⏰ ${schedule.time}</span> | 
                        <span>👨‍🏫 ${schedule.instructor}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="dashboard.editSchedule(${schedule.id})">Edit</button>
                    <button class="btn-delete" onclick="dashboard.deleteSchedule(${schedule.id})">Hapus</button>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Arrow function untuk render tasks menggunakan template literals
  renderTasks = () => {
    const container = document.getElementById("tasksList")

    if (this.tasks.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">✓</div>
                    <div class="empty-state-text">Tidak ada tugas. Tambahkan tugas baru untuk memulai!</div>
                </div>
            `
      return
    }

    container.innerHTML = this.tasks
      .map(
        (task) => `
            <div class="task-item ${task.completed ? "completed" : ""}">
                <div class="item-content">
                    <div class="item-title">${task.title}</div>
                    <div class="item-description">${task.description}</div>
                    <div class="item-meta">📅 Deadline: ${new Date(task.dueDate).toLocaleDateString("id-ID")}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-toggle" onclick="dashboard.toggleTask(${task.id})">
                        ${task.completed ? "Buka" : "Selesai"}
                    </button>
                    <button class="btn-edit" onclick="dashboard.editTask(${task.id})">Edit</button>
                    <button class="btn-delete" onclick="dashboard.deleteTask(${task.id})">Hapus</button>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Arrow function untuk render notes menggunakan template literals
  renderNotes = () => {
    const container = document.getElementById("notesList")

    if (this.notes.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div class="empty-state-text">Belum ada catatan. Buat catatan baru sekarang!</div>
                </div>
            `
      return
    }

    container.innerHTML = this.notes
      .map(
        (note) => `
            <div class="note-item">
                <div class="item-content">
                    <div class="item-title">${note.title}</div>
                    <div class="item-description">${note.content}</div>
                    <div class="item-meta">📅 ${note.createdAt}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="dashboard.editNote(${note.id})">Edit</button>
                    <button class="btn-delete" onclick="dashboard.deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Arrow function untuk render all data
  renderAllData = () => {
    this.renderSchedules()
    this.renderTasks()
    this.renderNotes()
  }

  // Async function untuk load weather data menggunakan Promises
  loadWeatherData = async () => {
    try {
      // Simulasi fetch data cuaca dengan Promise
      const weatherData = await this.fetchWeatherData()
      this.renderWeather(weatherData)
    } catch (error) {
      console.error("[v0] Error loading weather:", error)
      this.renderWeatherError()
    }
  }

  // Arrow function untuk fetch weather data (simulasi dengan Promise)
  fetchWeatherData = () => {
    return new Promise((resolve) => {
      // Simulasi delay API call
      setTimeout(() => {
        const weatherData = {
          location: "Jakarta, Indonesia",
          temperature: 28,
          description: "Cerah",
          humidity: 65,
          windSpeed: 12,
          feelsLike: 30,
        }
        resolve(weatherData)
      }, 500)
    })
  }

  // Arrow function untuk render weather menggunakan template literals
  renderWeather = (data) => {
    const container = document.getElementById("weatherContainer")
    container.innerHTML = `
            <div class="weather-card">
                <h3>${data.location}</h3>
                <div class="weather-temp">${data.temperature}°C</div>
                <div class="weather-description">${data.description}</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span class="weather-detail-label">Terasa Seperti</span>
                        <span>${data.feelsLike}°C</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Kelembaban</span>
                        <span>${data.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Kecepatan Angin</span>
                        <span>${data.windSpeed} km/h</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Update</span>
                        <span>${new Date().toLocaleTimeString("id-ID")}</span>
                    </div>
                </div>
            </div>
        `
  }

  // Arrow function untuk render weather error
  renderWeatherError = () => {
    const container = document.getElementById("weatherContainer")
    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⛅</div>
                <div class="empty-state-text">Tidak dapat memuat data cuaca. Silakan coba lagi nanti.</div>
            </div>
        `
  }

  // Arrow function untuk save to localStorage
  saveToLocalStorage = () => {
    const data = {
      schedules: this.schedules,
      tasks: this.tasks,
      notes: this.notes,
    }
    localStorage.setItem("dashboardData", JSON.stringify(data))
  }

  // Arrow function untuk load from localStorage
  loadFromLocalStorage = () => {
    const data = localStorage.getItem("dashboardData")
    if (data) {
      const parsed = JSON.parse(data)
      this.schedules = parsed.schedules || []
      this.tasks = parsed.tasks || []
      this.notes = parsed.notes || []
    }
  }
}

// Initialize dashboard ketika DOM loaded
let dashboard
document.addEventListener("DOMContentLoaded", () => {
  dashboard = new Dashboard()
})
