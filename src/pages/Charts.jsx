import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
} from 'recharts'

const monthlyData = [
  { name: 'Jan', sales: 4000, profit: 2400, orders: 2400, customers: 1800 },
  { name: 'Feb', sales: 3000, profit: 1398, orders: 2210, customers: 1600 },
  { name: 'Mar', sales: 2000, profit: 9800, orders: 2290, customers: 1900 },
  { name: 'Apr', sales: 2780, profit: 3908, orders: 2000, customers: 2100 },
  { name: 'May', sales: 1890, profit: 4800, orders: 2181, customers: 2400 },
  { name: 'Jun', sales: 2390, profit: 3800, orders: 2500, customers: 2200 },
  { name: 'Jul', sales: 3490, profit: 4300, orders: 2100, customers: 2600 },
]

const pieData = [
  { name: 'Desktop', value: 400, color: '#8884d8' },
  { name: 'Mobile', value: 300, color: '#82ca9d' },
  { name: 'Tablet', value: 200, color: '#ffc658' },
  { name: 'Other', value: 100, color: '#ff7300' },
]

const radarData = [
  { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
  { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Development', A: 86, B: 130, fullMark: 150 },
  { subject: 'Customer Support', A: 99, B: 100, fullMark: 150 },
  { subject: 'Finance', A: 85, B: 90, fullMark: 150 },
  { subject: 'HR', A: 65, B: 85, fullMark: 150 },
]

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const Charts = () => {
  const theme = useTheme()
  const [selectedChart, setSelectedChart] = useState('line')

  const renderChart = () => {
    switch (selectedChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={theme.palette.secondary.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="1"
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.main + '20'}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke={theme.palette.secondary.main}
                fill={theme.palette.secondary.main + '20'}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill={theme.palette.primary.main} />
              <Bar dataKey="profit" fill={theme.palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="customers"
                fill={theme.palette.primary.main + '20'}
                stroke={theme.palette.primary.main}
              />
              <Bar dataKey="orders" fill={theme.palette.secondary.main} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={theme.palette.error.main}
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Analytics & Charts
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={selectedChart}
            label="Chart Type"
            onChange={(e) => setSelectedChart(e.target.value)}
          >
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="composed">Composed Chart</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Main Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Performance Overview
              </Typography>
              {renderChart()}
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Traffic Sources
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
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
            </CardContent>
          </Card>
        </Grid>

        {/* Radar Chart */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Department Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar
                    name="Current"
                    dataKey="A"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.main + '20'}
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target"
                    dataKey="B"
                    stroke={theme.palette.secondary.main}
                    fill={theme.palette.secondary.main + '20'}
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Scatter Chart */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="x" />
                  <YAxis type="number" dataKey="y" name="y" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Data Points" data={scatterData} fill={theme.palette.primary.main} />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Sales
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    $23,456
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +12.5% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Orders
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>
                    1,234
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +8.7% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Average Order Value
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    $89.45
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +5.2% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                    3.24%
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    -1.2% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Charts 