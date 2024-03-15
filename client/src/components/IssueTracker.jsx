// IssueTracker.jsx
import React from 'react';

const IssueTracker = () => {
  const issues = [
    { id: 1, type: 'Bug', priority: 'High', status: 'Open', assignee: 'John Doe' },
    { id: 2, type: 'Feature', priority: 'Medium', status: 'In Progress', assignee: 'Jane Smith' },
    // Add more issue data as needed
  ];

  return (
    <div>
      <h2>Issue Tracker</h2>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            {issue.type} - Priority: {issue.priority} - Status: {issue.status} - Assignee: {issue.assignee}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueTracker;
