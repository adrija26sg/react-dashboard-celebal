import React, { useState, useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'
import {
  Search,
  Add,
  Edit,
  Delete,
  FilterList,
  Sort,
} from '@mui/icons-material'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { CSVLink } from 'react-csv'

const columnHelper = createColumnHelper()

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-15',
    avatar: 'JD',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-14',
    avatar: 'JS',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Editor',
    status: 'Inactive',
    lastLogin: '2024-01-10',
    avatar: 'MJ',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-13',
    avatar: 'SW',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-12',
    avatar: 'DB',
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Editor',
    status: 'Inactive',
    lastLogin: '2024-01-08',
    avatar: 'ED',
  },
]

const columns = [
  columnHelper.accessor('avatar', {
    header: 'Avatar',
    cell: (info) => (
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        {info.getValue()}
      </Avatar>
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => (
      <Typography variant="body2" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => (
      <Chip
        label={info.getValue()}
        size="small"
        color={info.getValue() === 'Admin' ? 'error' : info.getValue() === 'Editor' ? 'warning' : 'default'}
        variant="outlined"
      />
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chip
        label={info.getValue()}
        size="small"
        color={info.getValue() === 'Active' ? 'success' : 'error'}
        variant="outlined"
      />
    ),
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Last Login',
    cell: (info) => (
      <Typography variant="body2" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor('id', {
    header: 'Actions',
    cell: (info) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton size="small" color="primary">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error">
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    ),
  }),
]

const statusColors = {
  active: '#38ef7d',
  inactive: '#ff6b6b',
  pending: '#fee140',
  completed: '#4facfe',
}

const priorityColors = {
  low: '#38ef7d',
  medium: '#fee140',
  high: '#ff6b6b',
  critical: '#ee5a24',
}

const Tables = () => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const filteredData = useMemo(() => {
    let filtered = data

    if (selectedRole) {
      filtered = filtered.filter(item => item.role === selectedRole)
    }

    if (selectedStatus) {
      filtered = filtered.filter(item => item.status === selectedStatus)
    }

    return filtered
  }, [selectedRole, selectedStatus])

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredData.map((row) => row.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    // Implement your delete logic here (e.g., update data state)
    alert(`Delete rows: ${selectedRows.join(', ')}`)
    setSelectedRows([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Data Tables
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add User
          </Button>
          <CSVLink data={filteredData} filename="users.csv" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Export CSV</Button>
          </CSVLink>
          {selectedRows.length > 0 && (
            <Button variant="outlined" color="error" onClick={handleDeleteSelected}
              >Delete Selected</Button>
          )}
        </Box>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole}
                  label="Role"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSelectedRole('')
                  setSelectedStatus('')
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} sx={{ boxShadow: 'none', maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#23243a' }}>
                  <TableCell padding="checkbox" sx={{ backgroundColor: '#23243a', color: '#fff', borderBottom: '2px solid #30314a' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {table.getHeaderGroups()[0].headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        fontWeight: 700,
                        backgroundColor: '#23243a',
                        color: '#fff',
                        borderBottom: '2px solid #30314a',
                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <Sort fontSize="small" />
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.id} hover selected={selectedRows.includes(row.id)}>
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {row.avatar}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.role}
                        size="small"
                        color={row.role === 'Admin' ? 'error' : row.role === 'Editor' ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={row.status === 'Active' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {row.lastLogin}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Rows per page:
            </Typography>
            <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{ marginRight: 16 }}>
              {[5, 10, 25].map((rows) => (
                <option key={rows} value={rows}>{rows}</option>
              ))}
            </select>
            <Button onClick={() => handleChangePage(null, Math.max(page - 1, 0))} disabled={page === 0}>&lt;</Button>
            <Typography variant="body2" sx={{ mx: 1 }}>
              {page + 1} / {Math.ceil(filteredData.length / rowsPerPage)}
            </Typography>
            <Button onClick={() => handleChangePage(null, Math.min(page + 1, Math.ceil(filteredData.length / rowsPerPage) - 1))} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>&gt;</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role">
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Tables 