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
  ScatterChart
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
  { name: 'Desktop', value: 400, color: '#4facfe' },
  { name: 'Mobile', value: 300, color: '#667eea' },
  { name: 'Tablet', value: 200, color: '#11998e' },
  { name: 'Other', value: 100, color: '#fa709a' },
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

const COLORS = pieData.map(d => d.color)

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
                stroke="#4facfe"
                strokeWidth={3}
                dot={{ fill: '#4facfe', strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#764ba2"
                strokeWidth={3}
                dot={{ fill: '#764ba2', strokeWidth: 2, r: 6 }}
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
                stroke="#4facfe"
                fill="#4facfe20"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke="#764ba2"
                fill="#764ba220"
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
              <Bar dataKey="sales" fill="#4facfe" />
              <Bar dataKey="profit" fill="#764ba2" />
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
                fill="#4facfe20"
                stroke="#4facfe"
              />
              <Bar dataKey="orders" fill="#764ba2" />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ff6b6b"
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
                    stroke="#4facfe"
                    fill="#4facfe20"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target"
                    dataKey="B"
                    stroke="#764ba2"
                    fill="#764ba220"
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
                  <Scatter name="Data Points" data={scatterData} fill="#4facfe" />
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