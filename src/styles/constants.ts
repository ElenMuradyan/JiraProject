export const formStyles = {
    width: '100%',
    maxWidth: '28rem',  // max-w-md
    padding: '2rem',  // p-8
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(49, 204, 212, 0.31))', // Gradient background (blue to cyan)
    borderRadius: '1rem',  // rounded-2xl
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // shadow-lg
    transition: 'all 0.5s ease',
    color: 'white',  // Text color for contrast
  };
  
  export const inputStyles = {
    border: '1px solid #d1d5db',  // border-gray-300
    borderRadius: '0.5rem',  // rounded-lg
    padding: '0.5rem 1rem',  // px-4 py-2
    outline: 'none',
    width: '100%',
    ':focus': {
      borderColor: '#3b82f6',  // focus:ring-blue-500
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',  // blue glow on focus
    },
  };
  
  export const buttonStyles = {
    backgroundColor: '#2563eb',  // bg-blue-600
    color: 'white',
    padding: '0.5rem 1.5rem',  // px-6 py-2
    borderRadius: '0.5rem',  // rounded-lg
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',  // hover:bg-blue-700
    ':hover': {
      backgroundColor: '#1d4ed8',  // bg-blue-700 on hover
    },
  };
  
  export const linkStyles = {
    fontSize: '0.875rem',  // text-sm
    color: '#3b82f6',  // text-blue-500
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',  // hover:underline
    },
  };
  
  export const headingStyles = {
    fontSize: '2rem',  // text-3xl
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #3b82f6, #9333ea)',  // gradient from blue to purple
    color: 'transparent',
    backgroundClip: 'text',  // makes the gradient fill the text
  };
  