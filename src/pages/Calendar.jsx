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
  Grid,
  IconButton,
  Tabs,
  Tab,
  Avatar,
  Badge,
  useTheme,
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Event,
  Schedule,
  LocationOn,
  People,
  Notifications,
  VideoCall,
  Assignment,
  Celebration,
  Work,
  School,
  FitnessCenter,
  Restaurant,
  Flight,
  Hotel,
} from '@mui/icons-material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

const initialEvents = [
  {
    id: '1',
    title: 'Team Standup Meeting',
    start: '2024-01-15T10:00:00',
    end: '2024-01-15T10:30:00',
    color: '#667eea',
    extendedProps: {
      description: 'Daily team sync meeting',
      location: 'Conference Room A',
      type: 'meeting',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      priority: 'high',
      isRecurring: true,
    },
  },
  {
    id: '2',
    title: 'Client Presentation',
    start: '2024-01-16T14:00:00',
    end: '2024-01-16T15:30:00',
    color: '#764ba2',
    extendedProps: {
      description: 'Present quarterly results to client',
      location: 'Virtual Meeting',
      type: 'presentation',
      attendees: ['Sarah Wilson', 'David Brown'],
      priority: 'high',
      isRecurring: false,
    },
  },
  {
    id: '3',
    title: 'Project Deadline',
    start: '2024-01-18T17:00:00',
    end: '2024-01-18T17:00:00',
    color: '#fa709a',
    extendedProps: {
      description: 'Submit final project deliverables',
      location: 'Office',
      type: 'deadline',
      attendees: ['Emily Davis'],
      priority: 'critical',
      isRecurring: false,
    },
  },
  {
    id: '4',
    title: 'Training Session',
    start: '2024-01-20T09:00:00',
    end: '2024-01-20T12:00:00',
    color: '#4facfe',
    extendedProps: {
      description: 'New software training for team',
      location: 'Training Room',
      type: 'training',
      attendees: ['All Team Members'],
      priority: 'medium',
      isRecurring: false,
    },
  },
  {
    id: '5',
    title: 'Birthday Party',
    start: '2024-01-22T18:00:00',
    end: '2024-01-22T22:00:00',
    color: '#fee140',
    extendedProps: {
      description: 'Celebrating team member birthday',
      location: 'Restaurant Downtown',
      type: 'personal',
      attendees: ['Team Members'],
      priority: 'low',
      isRecurring: false,
    },
  },
]

const eventTypes = [
  { value: 'meeting', label: 'Meeting', icon: <Event />, color: '#4facfe' },
  { value: 'presentation', label: 'Presentation', icon: <Assignment />, color: '#667eea' },
  { value: 'deadline', label: 'Deadline', icon: <Schedule />, color: '#ff6b6b' },
  { value: 'training', label: 'Training', icon: <School />, color: '#11998e' },
  { value: 'personal', label: 'Personal', icon: <Celebration />, color: '#fa709a' },
  { value: 'workout', label: 'Workout', icon: <FitnessCenter />, color: '#38ef7d' },
  { value: 'dinner', label: 'Dinner', icon: <Restaurant />, color: '#fee140' },
  { value: 'travel', label: 'Travel', icon: <Flight />, color: '#764ba2' },
]

const priorityLevels = [
  { value: 'low', label: 'Low', color: '#38ef7d' },
  { value: 'medium', label: 'Medium', color: '#fee140' },
  { value: 'high', label: 'High', color: '#ff6b6b' },
  { value: 'critical', label: 'Critical', color: '#ee5a24' },
]

const Calendar = () => {
  const theme = useTheme()
  const [events, setEvents] = useState(initialEvents)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedView, setSelectedView] = useState('dayGridMonth')
  const [selectedTab, setSelectedTab] = useState(0)
  const [eventForm, setEventForm] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    location: '',
    type: 'meeting',
    attendees: '',
    priority: 'medium',
    isRecurring: false,
  })

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null)
    setEventForm({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      description: '',
      location: '',
      type: 'meeting',
      attendees: '',
      priority: 'medium',
      isRecurring: false,
    })
    setOpenDialog(true)
  }

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event)
    setEventForm({
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      description: clickInfo.event.extendedProps.description || '',
      location: clickInfo.event.extendedProps.location || '',
      type: clickInfo.event.extendedProps.type || 'meeting',
      attendees: clickInfo.event.extendedProps.attendees?.join(', ') || '',
      priority: clickInfo.event.extendedProps.priority || 'medium',
      isRecurring: clickInfo.event.extendedProps.isRecurring || false,
    })
    setOpenDialog(true)
  }

  const handleEventDrop = (dropInfo) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.startStr,
          end: dropInfo.event.endStr,
        }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const handleEventResize = (resizeInfo) => {
    const updatedEvents = events.map(event => {
      if (event.id === resizeInfo.event.id) {
        return {
          ...event,
          start: resizeInfo.event.startStr,
          end: resizeInfo.event.endStr,
        }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const handleSaveEvent = () => {
    const eventType = eventTypes.find(type => type.value === eventForm.type)
    const priority = priorityLevels.find(p => p.value === eventForm.priority)
    
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            title: eventForm.title,
            start: eventForm.start,
            end: eventForm.end,
            color: eventType.color,
            extendedProps: {
              description: eventForm.description,
              location: eventForm.location,
              type: eventForm.type,
              attendees: eventForm.attendees.split(',').map(a => a.trim()).filter(a => a),
              priority: eventForm.priority,
              isRecurring: eventForm.isRecurring,
            },
          }
        }
        return event
      })
      setEvents(updatedEvents)
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        title: eventForm.title,
        start: eventForm.start,
        end: eventForm.end,
        color: eventType.color,
        extendedProps: {
          description: eventForm.description,
          location: eventForm.location,
          type: eventForm.type,
          attendees: eventForm.attendees.split(',').map(a => a.trim()).filter(a => a),
          priority: eventForm.priority,
          isRecurring: eventForm.isRecurring,
        },
      }
      setEvents([...events, newEvent])
    }
    
    setOpenDialog(false)
    setSelectedEvent(null)
    setEventForm({
      title: '',
      start: '',
      end: '',
      description: '',
      location: '',
      type: 'meeting',
      attendees: '',
      priority: 'medium',
      isRecurring: false,
    })
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id)
      setEvents(updatedEvents)
      setOpenDialog(false)
      setSelectedEvent(null)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedEvent(null)
    setEventForm({
      title: '',
      start: '',
      end: '',
      description: '',
      location: '',
      type: 'meeting',
      attendees: '',
      priority: 'medium',
      isRecurring: false,
    })
  }

  const renderEventContent = (arg) => {
    const eventType = eventTypes.find(type => type.value === arg.event.extendedProps.type)
    const priority = priorityLevels.find(p => p.value === arg.event.extendedProps.priority)
    
    return (
      <Box sx={{ 
        padding: '2px 4px', 
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        border: `1px solid ${eventType?.color || '#667eea'}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          {eventType?.icon}
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
            {arg.event.title}
          </Typography>
        </Box>
        {arg.event.extendedProps.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 12 }} />
            <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
              {arg.event.extendedProps.location}
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Smart Calendar
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedEvent(null)
            setEventForm({
              title: '',
              start: '',
              end: '',
              description: '',
              location: '',
              type: 'meeting',
              attendees: '',
              priority: 'medium',
              isRecurring: false,
            })
            setOpenDialog(true)
          }}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
          }}
        >
          Add Event
        </Button>
      </Box>

      {/* Calendar Controls */}
      <Card sx={{ mb: 3, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <CardContent>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <Tab label="Calendar" onClick={() => setSelectedView('dayGridMonth')} />
            <Tab label="Week" onClick={() => setSelectedView('timeGridWeek')} />
            <Tab label="Day" onClick={() => setSelectedView('timeGridDay')} />
            <Tab label="List" onClick={() => setSelectedView('listWeek')} />
          </Tabs>
        </CardContent>
      </Card>

      {/* Event Type Legend */}
      <Card sx={{ mb: 3, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
            Event Categories
          </Typography>
          <Grid container spacing={2}>
            {eventTypes.map((type) => (
              <Grid item key={type.value}>
                <Chip
                  icon={type.icon}
                  label={type.label}
                  sx={{
                    backgroundColor: type.color + '20',
                    color: type.color,
                    border: `1px solid ${type.color}`,
                    '&:hover': {
                      backgroundColor: type.color + '30',
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            initialView={selectedView}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            height="auto"
            eventContent={renderEventContent}
            eventDisplay="block"
            dayCellContent={(arg) => (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                fontWeight: 600,
                color: '#ffffff',
              }}>
                {arg.dayNumberText}
              </Box>
            )}
            titleFormat={{ year: 'numeric', month: 'long' }}
            buttonText={{
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              list: 'List',
            }}
          />
        </CardContent>
      </Card>

      {/* Event Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#667eea',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date & Time"
                type="datetime-local"
                value={eventForm.start}
                onChange={(e) => setEventForm({ ...eventForm, start: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date & Time"
                type="datetime-local"
                value={eventForm.end}
                onChange={(e) => setEventForm({ ...eventForm, end: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Event Type</InputLabel>
                <Select
                  value={eventForm.type}
                  label="Event Type"
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                  }}
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Attendees (comma separated)"
                value={eventForm.attendees}
                onChange={(e) => setEventForm({ ...eventForm, attendees: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Priority</InputLabel>
                <Select
                  value={eventForm.priority}
                  label="Priority"
                  onChange={(e) => setEventForm({ ...eventForm, priority: e.target.value })}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: priority.color,
                          }}
                        />
                        {priority.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button
              color="error"
              onClick={handleDeleteEvent}
              startIcon={<Delete />}
              sx={{ color: '#ff6b6b' }}
            >
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveEvent}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              },
            }}
          >
            {selectedEvent ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Calendar 