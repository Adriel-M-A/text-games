import React from 'react'

/**
 * IconButton - Componente de UI genérico para botones basados en iconos.
 * Sigue la estética minimalista de "papel y lápiz": sin bordes, icono grande, hover y click dinámicos.
 */
const IconButton = ({
  icon: Icon,
  onClick,
  title,
  className = '',
  size = 24,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-2
        text-black dark:text-white
        hover:scale-110 active:scale-95
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      <Icon size={size} strokeWidth={2.5} />
    </button>
  )
}

export default IconButton
