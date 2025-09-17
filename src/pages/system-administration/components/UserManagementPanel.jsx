import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementPanel = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@railcontrol.com",
      role: "Senior Controller",
      permissions: ["view_dashboard", "make_decisions", "override_ai"],
      lastLogin: "2025-01-11 14:30:00",
      status: "active",
      department: "Operations",
      shift: "Day Shift"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@railcontrol.com",
      role: "Supervisor",
      permissions: ["view_dashboard", "make_decisions", "override_ai", "manage_users", "view_audit"],
      lastLogin: "2025-01-11 16:15:00",
      status: "active",
      department: "Operations",
      shift: "Day Shift"
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      email: "mike.rodriguez@railcontrol.com",
      role: "Controller",
      permissions: ["view_dashboard", "make_decisions"],
      lastLogin: "2025-01-10 22:45:00",
      status: "active",
      department: "Operations",
      shift: "Night Shift"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@railcontrol.com",
      role: "Administrator",
      permissions: ["view_dashboard", "make_decisions", "override_ai", "manage_users", "view_audit", "system_config"],
      lastLogin: "2025-01-11 09:20:00",
      status: "active",
      department: "IT",
      shift: "Day Shift"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@railcontrol.com",
      role: "Controller",
      permissions: ["view_dashboard", "make_decisions"],
      lastLogin: "2025-01-09 18:30:00",
      status: "inactive",
      department: "Operations",
      shift: "Evening Shift"
    }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "Controller", label: "Controller" },
    { value: "Senior Controller", label: "Senior Controller" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Administrator", label: "Administrator" }
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" }
  ];

  const permissionOptions = [
    { value: "view_dashboard", label: "View Dashboard" },
    { value: "make_decisions", label: "Make Decisions" },
    { value: "override_ai", label: "Override AI Recommendations" },
    { value: "manage_users", label: "Manage Users" },
    { value: "view_audit", label: "View Audit Trail" },
    { value: "system_config", label: "System Configuration" },
    { value: "emergency_override", label: "Emergency Override" }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = !filterRole || user?.role === filterRole;
    const matchesStatus = !filterStatus || user?.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (action, user) => {
    switch (action) {
      case 'edit':
        setSelectedUser(user);
        setShowAddUserModal(true);
        break;
      case 'deactivate':
        if (window.confirm(`Are you sure you want to deactivate ${user?.name}?`)) {
          setUsers(prev => prev?.map(u => 
            u?.id === user?.id ? { ...u, status: 'inactive' } : u
          ));
        }
        break;
      case 'activate':
        setUsers(prev => prev?.map(u => 
          u?.id === user?.id ? { ...u, status: 'active' } : u
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to permanently delete ${user?.name}? This action cannot be undone.`)) {
          setUsers(prev => prev?.filter(u => u?.id !== user?.id));
        }
        break;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      suspended: { color: 'bg-error text-error-foreground', label: 'Suspended' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage system users, roles, and permissions
          </p>
        </div>
        
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => {
            setSelectedUser(null);
            setShowAddUserModal(true);
          }}
        >
          Add User
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        
        <Select
          placeholder="Filter by role"
          options={roleOptions}
          value={filterRole}
          onChange={setFilterRole}
        />
        
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
        />
        
        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={() => {
            setSearchTerm("");
            setFilterRole("");
            setFilterStatus("");
          }}
        >
          Reset
        </Button>
      </div>
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Role</th>
                <th className="text-left p-4 font-medium text-foreground">Department</th>
                <th className="text-left p-4 font-medium text-foreground">Last Login</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr key={user?.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">{user?.role}</div>
                    <div className="text-xs text-muted-foreground">{user?.shift}</div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{user?.department}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatLastLogin(user?.lastLogin)}
                  </td>
                  <td className="p-4">{getStatusBadge(user?.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleUserAction('edit', user)}
                      />
                      {user?.status === 'active' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="UserX"
                          onClick={() => handleUserAction('deactivate', user)}
                        />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="UserCheck"
                          onClick={() => handleUserAction('activate', user)}
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleUserAction('delete', user)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-popover border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-popover-foreground">
                  {selectedUser ? 'Edit User' : 'Add New User'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowAddUserModal(false)}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Role"
                    placeholder="Select role"
                    options={roleOptions?.slice(1)}
                    required
                  />
                  <Select
                    label="Department"
                    placeholder="Select department"
                    options={[
                      { value: "Operations", label: "Operations" },
                      { value: "IT", label: "IT" },
                      { value: "Management", label: "Management" }
                    ]}
                    required
                  />
                </div>

                <Select
                  label="Shift Assignment"
                  placeholder="Select shift"
                  options={[
                    { value: "Day Shift", label: "Day Shift (06:00 - 14:00)" },
                    { value: "Evening Shift", label: "Evening Shift (14:00 - 22:00)" },
                    { value: "Night Shift", label: "Night Shift (22:00 - 06:00)" }
                  ]}
                  required
                />

                <div>
                  <label className="text-sm font-medium text-popover-foreground mb-3 block">
                    Permissions
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {permissionOptions?.map((permission) => (
                      <Checkbox
                        key={permission?.value}
                        label={permission?.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      console.log('User saved');
                      setShowAddUserModal(false);
                    }}
                  >
                    {selectedUser ? 'Update User' : 'Create User'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPanel;