import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  useTheme,
} from '@mui/material'
import {
  Brightness4,
  Brightness7,
  Notifications,
  Security,
  Language,
  Palette,
  AccountCircle,
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material'
import { themeStore } from '../store/themeStore'

const Settings = () => {
  const theme = useTheme()
  const { toggleTheme, isDarkMode } = themeStore()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
  })
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    avatar: 'JD',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(userProfile)

  const handleNotificationChange = (key) => (event) => {
    setNotifications({
      ...notifications,
      [key]: event.target.checked,
    })
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    setEditForm(userProfile)
  }

  const handleSaveProfile = () => {
    setUserProfile(editForm)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm(userProfile)
  }

  const handleInputChange = (field) => (event) => {
    setEditForm({
      ...editForm,
      [field]: event.target.value,
    })
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* User Profile */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="h6">Profile Settings</Typography>
                <IconButton
                  sx={{ ml: 'auto' }}
                  onClick={isEditing ? handleSaveProfile : handleEditProfile}
                  color="primary"
                >
                  {isEditing ? <Save /> : <Edit />}
                </IconButton>
                {isEditing && (
                  <IconButton onClick={handleCancelEdit} color="error">
                    <Cancel />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: 32,
                    mr: 2,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {userProfile.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6">{userProfile.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {userProfile.email}
                  </Typography>
                  <Chip
                    label={userProfile.role}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              {isEditing ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={editForm.name}
                      onChange={handleInputChange('name')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={editForm.email}
                      onChange={handleInputChange('email')}
                    />
                  </Grid>
                </Grid>
              ) : (
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Full Name"
                      secondary={userProfile.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={userProfile.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Role"
                      secondary={userProfile.role}
                    />
                  </ListItem>
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Palette sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon>
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                  </ListItemIcon>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Switch between light and dark theme"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={isDarkMode}
                      onChange={toggleTheme}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Color Scheme
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['#1976d2', '#dc004e', '#4caf50', '#ff9800', '#9c27b0'].map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: color,
                      cursor: 'pointer',
                      border: theme.palette.primary.main === color ? '3px solid' : '1px solid',
                      borderColor: theme.palette.primary.main === color ? 'primary.main' : 'grey.300',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Notifications sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.email}
                      onChange={handleNotificationChange('email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications in browser"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.push}
                      onChange={handleNotificationChange('push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive notifications via SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.sms}
                      onChange={handleNotificationChange('sms')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive promotional emails"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.marketing}
                      onChange={handleNotificationChange('marketing')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Security sx={{ mr: 1 }} />
                <Typography variant="h6">Security</Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add an extra layer of security"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      Enable
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your account password"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      Change
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Login History"
                    secondary="View recent login activity"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      View
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Language Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Language sx={{ mr: 1 }} />
                <Typography variant="h6">Language & Region</Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Language
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['English', 'Spanish', 'French', 'German', 'Chinese'].map((lang) => (
                      <Chip
                        key={lang}
                        label={lang}
                        variant={lang === 'English' ? 'filled' : 'outlined'}
                        color={lang === 'English' ? 'primary' : 'default'}
                        clickable
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Time Zone
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['UTC-5 (EST)', 'UTC-8 (PST)', 'UTC+0 (GMT)', 'UTC+1 (CET)'].map((tz) => (
                      <Chip
                        key={tz}
                        label={tz}
                        variant={tz === 'UTC-5 (EST)' ? 'filled' : 'outlined'}
                        color={tz === 'UTC-5 (EST)' ? 'primary' : 'default'}
                        clickable
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Settings 