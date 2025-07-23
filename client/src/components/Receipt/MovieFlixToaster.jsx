import toast, { Toaster } from 'react-hot-toast';

// Add this component somewhere in your root layout
const MovieFlixToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className: '',
      style: {
        border: '1px solid #1f2937',
        padding: '12px 16px',
        color: '#fff',
        background: '#111827',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        borderRadius: '8px'
      },
      success: {
        style: {
          background: '#1f2937',
          borderColor: '#047857',
          iconTheme: {
            primary: '#f59e0b',
            secondary: '#f59e0b'
          }
        },
      },
      error: {
        style: {
          background: '#7f1d1d',
          borderColor: '#b91c1c',
          iconTheme: {
            primary: '#f87171',
            secondary: '#111827'
          }
        },
      },
      loading: {
        style: {
          background: '#1e40af',
          borderColor: '#1d4ed8',
        }
      },
      custom: {
        style: {
          background: '#1f2937',
          borderColor: '#374151',
          iconTheme: {
            primary: '#f59e0b',
            secondary: '#111827'
          }
        }
      }
    }}
  />
);

// Usage examples:
const showSuccessToast = () => toast.success('Booking confirmed!');
const showErrorToast = () => toast.error('Booking failed');
const showLoadingToast = () => toast.loading('Processing payment...');
const showCustomToast = () => toast('Welcome to MovieFlix!', {
  icon: '🎬',
  style: {
    background: '#1f2937',
    borderColor: '#f59e0b'
  }
});
export default MovieFlixToaster;