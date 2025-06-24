import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
  return response.json();
};

export const UsersList = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers   
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading users</div>
    }

    return (
        <>
            <h1>Users List</h1>
            <ul>
                {data.map((user:any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    )  
}