import React from 'react'

const filterList = ['all', 'mine', 'development', 'analysis', 'design']


export default function ProjectFilter({currentFilter, changeFilter}) {


  const handleClick = (newFilter) => {
    changeFilter(newFilter)
    
  }  
  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {filterList.map((f) => (
            <button key={f}
               onClick={() => handleClick(f)}
               className={currentFilter === f ? 'active' : ''}
            >
                {f}
            </button>
        ))}
      </nav>
    </div>
  )
}
