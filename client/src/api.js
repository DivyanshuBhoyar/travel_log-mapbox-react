export async function listLogEntries() {
    const resopnse=  await fetch(`${import.meta.env.VITE_API_URL}/api/logs`)
    return resopnse.json()
}

export async function createLogEntry(entry) {
    console.log(entry);
    
  try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/logs` , {
          method: 'POST',
          headers: {
              'content-type' : 'application/json' ,
          },
          body: JSON.stringify(entry)
      })
      return response.json()
  } catch (error) {
      console.log(error);
  }
 
}