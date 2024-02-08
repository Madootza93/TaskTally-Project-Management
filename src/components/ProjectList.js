import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

//import css
import './ProjectList.css';

export default function ProjectList({ projects }) {
  const isDueSoon = (dueDate) => {
    const now = new Date();
    const dueDateTime = new Date(dueDate.seconds * 1000); 
    const oneDay = 24 * 60 * 60 * 1000; 
    return now < dueDateTime && dueDateTime - now < oneDay; //chack if due date is in the next 24h
  };

  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id} className={isDueSoon(project.dueDate) ? 'due-soon' : ''}>
          <h4>{project.name}</h4>
          <p>
            Due by {project.dueDate.toDate().toDateString()}
            {isDueSoon(project.dueDate) && <span className="due-soon-text"> - Due in 24hrs!</span>}
          </p>
          <div className='assigned-to'>
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL}/>
                </li>
              ))}
            </ul> 
          </div>
        </Link>
      ))}
    </div>
  );
}
