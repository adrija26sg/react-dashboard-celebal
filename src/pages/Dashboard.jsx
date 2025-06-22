import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  useTheme,
} from '@mui/material'
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  TrendingDown,
  CheckCircle,
  Warning,
  Error,
  Visibility,
} from '@mui/icons-material'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme()
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {change > 0 ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: change > 0 ? 'success.main' : 'error.main',
                  fontWeight: 600,
                }}
              >
                {Math.abs(change)}%
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                from last month
              </Typography>
            </Box>
          </Box>
          <Avatar
            sx={{
              backgroundColor: color + '20',
              color: color,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

const chartData = [
  { name: 'Jan', value: 4000, color: '#4facfe' },
  { name: 'Feb', value: 3000, color: '#00f2fe' },
  { name: 'Mar', value: 2000, color: '#667eea' },
  { name: 'Apr', value: 2780, color: '#764ba2' },
  { name: 'May', value: 1890, color: '#11998e' },
  { name: 'Jun', value: 2390, color: '#38ef7d' },
  { name: 'Jul', value: 3490, color: '#fa709a' },
]

const pieData = [
  { name: 'Desktop', value: 400, color: '#4facfe' },
  { name: 'Mobile', value: 300, color: '#667eea' },
  { name: 'Tablet', value: 200, color: '#11998e' },
  { name: 'Other', value: 100, color: '#fa709a' },
]

const statsData = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'positive',
    icon: <TrendingUp />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: 'Subscriptions',
    value: '2,350',
    change: '+180.1%',
    changeType: 'positive',
    icon: <People />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Sales',
    value: '12,234',
    change: '+19%',
    changeType: 'positive',
    icon: <ShoppingCart />,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    title: 'Active Now',
    value: '573',
    change: '+201',
    changeType: 'positive',
    icon: <Visibility />,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
]

const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Completed task',
    task: 'Update user interface',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Started project',
    task: 'E-commerce redesign',
    time: '1 hour ago',
    status: 'warning',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Reported issue',
    task: 'Payment gateway error',
    time: '3 hours ago',
    status: 'error',
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'Uploaded file',
    task: 'Q4 financial report',
    time: '5 hours ago',
    status: 'success',
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return <CheckCircle sx={{ color: 'success.main' }} />
    case 'warning':
      return <Warning sx={{ color: 'warning.main' }} />
    case 'error':
      return <Error sx={{ color: 'error.main' }} />
    default:
      return <CheckCircle sx={{ color: 'success.main' }} />
  }
}

const Dashboard = () => {
  const theme = useTheme()

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard Overview
      </Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                background: stat.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 160,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                borderRadius: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 1, fontSize: 18 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: 36 }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: stat.changeType === 'positive' ? '#38ef7d' : '#ff6b6b',
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ minHeight: 370, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 20 }}>
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stackId="1"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.main + '20'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ minHeight: 370, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 20 }}>
                Traffic Sources
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                {pieData.map((entry, idx) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: entry.color, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: entry.color, fontWeight: 500 }}>
                      {entry.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'grey.200' }}>
                        {getStatusIcon(activity.status)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" component="span">
                            {activity.user}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="span">
                            {activity.action}
                          </Typography>
                          <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
                            {activity.task}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="textSecondary">
                          {activity.time}
                        </Typography>
                      }
                    />
                    <Chip
                      label={activity.status}
                      size="small"
                      color={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'error'}
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard 