import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Grid,
  useTheme,
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Person,
  Schedule,
  Flag,
  DragIndicator,
} from '@mui/icons-material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const initialColumns = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    color: '#4facfe',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description: 'Create wireframes and mockups for the new landing page',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-01-20',
        avatar: 'JD',
      },
      {
        id: '2',
        title: 'Update documentation',
        description: 'Update API documentation with new endpoints',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-01-18',
        avatar: 'JS',
      },
    ],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tasks: [
      {
        id: '3',
        title: 'Implement user authentication',
        description: 'Add JWT authentication to the application',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-01-25',
        avatar: 'MJ',
      },
      {
        id: '4',
        title: 'Fix responsive design issues',
        description: 'Resolve mobile layout problems',
        priority: 'low',
        assignee: 'Sarah Wilson',
        dueDate: '2024-01-22',
        avatar: 'SW',
      },
    ],
  },
  'review': {
    id: 'review',
    title: 'Review',
    color: '#11998e',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    tasks: [
      {
        id: '5',
        title: 'Code review for payment module',
        description: 'Review the payment integration code',
        priority: 'high',
        assignee: 'David Brown',
        dueDate: '2024-01-19',
        avatar: 'DB',
      },
    ],
  },
  'done': {
    id: 'done',
    title: 'Done',
    color: '#fa709a',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tasks: [
      {
        id: '6',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        priority: 'medium',
        assignee: 'Emily Davis',
        dueDate: '2024-01-15',
        avatar: 'ED',
      },
    ],
  },
}

const priorityColors = {
  low: '#38ef7d',
  medium: '#fee140',
  high: '#ff6b6b',
  critical: '#ee5a24',
}

const Kanban = () => {
  const theme = useTheme()
  const [columns, setColumns] = useState(initialColumns)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState('todo')
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
  })

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(sourceColumn.tasks)
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      })
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks)
      const [removed] = sourceTasks.splice(source.index, 1)
      const destTasks = Array.from(destColumn.tasks)
      destTasks.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destColumn.id]: {
          ...destColumn,
          tasks: destTasks,
        },
      })
    }
  }

  const handleAddTask = () => {
    setSelectedTask(null)
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
    })
    setOpenDialog(true)
  }

  const handleEditTask = (task, columnId) => {
    setSelectedTask(task)
    setSelectedColumn(columnId)
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
    })
    setOpenDialog(true)
  }

  const handleSaveTask = () => {
    if (selectedTask) {
      // Update existing task
      const updatedColumns = { ...columns }
      const column = updatedColumns[selectedColumn]
      const taskIndex = column.tasks.findIndex(task => task.id === selectedTask.id)
      
      column.tasks[taskIndex] = {
        ...selectedTask,
        ...taskForm,
      }
      
      setColumns(updatedColumns)
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        ...taskForm,
        avatar: taskForm.assignee.split(' ').map(name => name[0]).join(''),
      }

      const updatedColumns = { ...columns }
      updatedColumns[selectedColumn].tasks.push(newTask)
      setColumns(updatedColumns)
    }

    setOpenDialog(false)
    setSelectedTask(null)
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
    })
  }

  const handleDeleteTask = () => {
    if (selectedTask) {
      const updatedColumns = { ...columns }
      updatedColumns[selectedColumn].tasks = updatedColumns[selectedColumn].tasks.filter(
        task => task.id !== selectedTask.id
      )
      setColumns(updatedColumns)
      setOpenDialog(false)
      setSelectedTask(null)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedTask(null)
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Kanban Board
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTask}
          sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(79,172,254,0.15)',
            px: 3,
            py: 1.2,
            '&:hover': {
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
              boxShadow: '0 8px 32px rgba(79,172,254,0.25)',
            },
          }}
        >
          Add Task
        </Button>
      </Box>

      <Box sx={{ overflowX: 'auto', pb: 2 }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3} sx={{ minWidth: 900 }}>
            {Object.values(columns).map((column) => (
              <Grid item xs={12} sm={6} md={3} key={column.id}>
                <Card
                  sx={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 1,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    minHeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: column.gradient,
                          mr: 1,
                        }}
                      />
                      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, fontSize: 20 }}>
                        {column.title}
                      </Typography>
                      <Chip
                        label={column.tasks.length}
                        size="small"
                        sx={{ backgroundColor: column.color + '20', color: column.color, fontWeight: 700 }}
                      />
                    </Box>

                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{ minHeight: 200 }}
                        >
                          {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  sx={{
                                    mb: 2,
                                    cursor: 'grab',
                                    borderRadius: 1,
                                    boxShadow: snapshot.isDragging ? '0 8px 32px rgba(79,172,254,0.25)' : '0 2px 8px rgba(0,0,0,0.10)',
                                    background: 'rgba(255,255,255,0.13)',
                                    border: snapshot.isDragging ? '2px solid #4facfe' : '1px solid rgba(255,255,255,0.10)',
                                    transition: 'box-shadow 0.2s, border 0.2s',
                                  }}
                                >
                                  <CardContent sx={{ p: 2 }}>
                                    <Box {...provided.dragHandleProps} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                      <DragIndicator sx={{ color: 'grey.500', fontSize: 16, mr: 1 }} />
                                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 16 }}>
                                        {task.title}
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                      {task.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                      <Avatar sx={{ width: 24, height: 24, fontSize: 12, mr: 1, bgcolor: '#23243a', color: '#fff' }}>
                                        {task.avatar}
                                      </Avatar>
                                      <Typography variant="caption" color="textSecondary">
                                        {task.assignee}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                      <Chip
                                        label={task.priority}
                                        size="small"
                                        sx={{
                                          backgroundColor: priorityColors[task.priority] + '20',
                                          color: priorityColors[task.priority],
                                          fontWeight: 700,
                                          fontSize: '0.8rem',
                                        }}
                                      />
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Flag sx={{ fontSize: 16, color: priorityColors[task.priority] }} />
                                        <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="textSecondary">
                                          {task.dueDate}
                                        </Typography>
                                      </Box>
                                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton size="small" onClick={() => handleEditTask(task, column.id)}>
                                          <Edit fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>

      {/* Task Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(30, 32, 48, 0.98)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            color: '#fff',
          },
        }}
        BackdropProps={{
          sx: {
            background: 'rgba(20, 22, 34, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          },
        }}
      >
        <DialogTitle>
          {selectedTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Assignee"
                value={taskForm.assignee}
                onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={taskForm.priority}
                  label="Priority"
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {!selectedTask && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Column</InputLabel>
                  <Select
                    value={selectedColumn}
                    label="Column"
                    onChange={(e) => setSelectedColumn(e.target.value)}
                  >
                    {Object.values(columns).map((column) => (
                      <MenuItem key={column.id} value={column.id}>
                        {column.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          {selectedTask && (
            <Button
              color="error"
              onClick={handleDeleteTask}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTask}>
            {selectedTask ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Kanban 