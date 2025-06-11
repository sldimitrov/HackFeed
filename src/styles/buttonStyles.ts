// styles/buttonStyles.ts or top of component file
export const warningButtonStyles = {
  textTransform: 'capitalize',
  fontWeight: 500,
  px: 3,
  m: 0.5,
  fontSize: '0.875rem',
  borderRadius: 1,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#f57c00',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};
