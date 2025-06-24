import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
  return response.json();
};

const addUser = async (user: any) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
  }
  return response.json();
}

const queryClient = useQueryClient()

export const UsersList = () => {

    const addUserMutation = useMutation({
        mutationFn:addUser,
        onSuccess: (data, user, context) => {
            console.log('User added successfully');
            queryClient.setQueryData(['users'], (old: any) => {
                return old.map((u: any) => u.isoptimistic ? {...data, isoptimistic: false} : u);
            });
            queryClient.invalidateQueries({ queryKey: ['users'] });

        },
        onError: (error, newUser, context:any) => {
            console.error('Error adding user:', error);
            queryClient.setQueryData(['users'], context.previousUsers);
        },
        onMutate: async (newUser) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });

            const previousUsers = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (old: any) => [...old, {...newUser, isoptimistic: true}]);

            return { previousUsers };
        }
    })

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

    const handleAddUser = () => {
        const newUser = { name: 'New User', email: 'newuser@example.com' };
        addUserMutation.mutate(newUser);
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