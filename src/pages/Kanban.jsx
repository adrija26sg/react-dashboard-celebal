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
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {Object.values(columns).map((column) => (
            <Grid item xs={12} sm={6} lg={3} key={column.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: column.gradient,
                        mr: 1,
                      }}
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {column.title}
                    </Typography>
                    <Chip
                      label={column.tasks.length}
                      size="small"
                      sx={{ backgroundColor: column.color + '20', color: column.color }}
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
                                  transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                                  boxShadow: snapshot.isDragging ? 4 : 1,
                                }}
                              >
                                <CardContent sx={{ p: 2 }}>
                                  <Box {...provided.dragHandleProps} sx={{ mb: 1 }}>
                                    <DragIndicator sx={{ color: 'grey.500', fontSize: 16 }} />
                                  </Box>
                                  
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    {task.title}
                                  </Typography>
                                  
                                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {task.description}
                                  </Typography>

                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Avatar sx={{ width: 24, height: 24, fontSize: 12, mr: 1 }}>
                                      {task.avatar}
                                    </Avatar>
                                    <Typography variant="caption" color="textSecondary">
                                      {task.assignee}
                                    </Typography>
                                  </Box>

                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Chip
                                      label={task.priority}
                                      size="small"
                                      sx={{
                                        backgroundColor: priorityColors[task.priority] + '20',
                                        color: priorityColors[task.priority],
                                        fontSize: '0.7rem',
                                      }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                      <IconButton
                                        size="small"
                                        onClick={() => handleEditTask(task, column.id)}
                                      >
                                        <Edit fontSize="small" />
                                      </IconButton>
                                    </Box>
                                  </Box>

                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Schedule sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="textSecondary">
                                      {task.dueDate}
                                    </Typography>
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

      {/* Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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