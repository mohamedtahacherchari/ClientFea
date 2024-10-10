export async function fetchInfoById(id, token) {
    try {
      const response = await fetch(`/api/${id}/show`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status code: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received data for ID", id, ":", data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data for ID', id, ":", error);
      throw error;
    }
  }
  