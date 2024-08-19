export default function errorHandler(error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        console.error('Bad request:', data.message);
      } else if (status === 401) {
        console.error('Unauthorized. Please login again.');
      } else if (status === 404) {
        console.error('Not found:', data.message);
      } else if (status === 500) {
        console.error('Internal server error. Try again later.');
      }
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error creating request:', error.message);
    }
  }
  