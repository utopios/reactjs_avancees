import React from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// === PAGINATION CLASSIQUE ===

// Fonction pour récupérer une page de posts
const fetchPosts = async ({ page = 1, limit = 10 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des posts');
  }

  const data = await response.json();
  const totalCount = response.headers.get('x-total-count');
  
  return {
    posts: data,
    totalCount: parseInt(totalCount ?? "0") || 0,
    page,
    hasNextPage: page * limit < parseInt(totalCount ?? "0"),
    hasPreviousPage: page > 1
  };
};

// Composant avec pagination classique
function PostsPagination() {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['posts', { page, limit }],
    queryFn: () => fetchPosts({ page, limit }),
    // Garde les données précédentes pendant le chargement de la nouvelle page
    placeholderData: (prev) => prev,
    staleTime: 2 * 60 * 1000
  });

  if (isLoading) {
    return <div>Chargement des posts...</div>;
  }

  if (isError) {
    return <div>Erreur: {error.message}</div>;
  }

  const { posts, totalCount, hasNextPage, hasPreviousPage } = data ?? { posts: [], totalCount: 0, hasNextPage: false, hasPreviousPage: false };
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <h2>Posts - Pagination classique</h2>
      
      {/* Indicateur de chargement */}
      {isFetching && <div style={{ color: 'blue' }}>🔄 Chargement...</div>}
      
      {/* Liste des posts avec opacité réduite pendant le chargement */}
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        {posts.map((post: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; body: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <div key={post.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {/* Contrôles de pagination */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px'
      }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={!hasPreviousPage || isFetching}
          style={{
            padding: '8px 16px',
            backgroundColor: hasPreviousPage && !isFetching ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: hasPreviousPage && !isFetching ? 'pointer' : 'not-allowed'
          }}
        >
          ← Précédent
        </button>

        <span>
          Page {page} sur {totalPages} ({totalCount} posts au total)
        </span>

        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={!hasNextPage || isFetching}
          style={{
            padding: '8px 16px',
            backgroundColor: hasNextPage && !isFetching ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: hasNextPage && !isFetching ? 'pointer' : 'not-allowed'
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}

// === CHARGEMENT INFINI ===

// Fonction pour le chargement infini
const fetchInfinitePosts = async ({ pageParam = 1 }) => {
  const limit = 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des posts');
  }

  const posts = await response.json();
  
  return {
    posts,
    nextPage: posts.length === limit ? pageParam + 1 : undefined,
    totalPages: Math.ceil(100 / limit) // Approximation pour l'exemple
  };
};

// Composant avec chargement infini
function PostsInfiniteScroll() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: fetchInfinitePosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000
  });

  // Hook pour détecter quand l'utilisateur arrive en bas de page
  React.useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      // Charge la page suivante quand l'utilisateur est à 100px du bas
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div>Chargement des posts...</div>;
  }

  if (isError) {
    return <div>Erreur: {error.message}</div>;
  }

  // Aplatit toutes les pages en une seule liste
  const allPosts = (data?.pages ?? []).flatMap(page => page.posts);

  return (
    <div>
      <h2>Posts - Chargement infini</h2>
      <p>Faites défiler vers le bas pour charger plus de posts</p>
      
      <div>
        {allPosts.map((post, index) => (
          <div key={`${post.id}-${index}`} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: '#fff'
          }}>
            <h4 style={{ color: '#333', marginBottom: '8px' }}>
              {post.title}
            </h4>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              {post.body}
            </p>
            <small style={{ color: '#999' }}>Post #{post.id}</small>
          </div>
        ))}
      </div>

      {/* Indicateurs de chargement */}
      {isFetchingNextPage && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          fontSize: '18px',
          color: '#007bff'
        }}>
          🔄 Chargement de plus de posts...
        </div>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          fontSize: '16px',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          margin: '20px 0'
        }}>
          ✅ Tous les posts ont été chargés !
        </div>
      )}

      {/* Bouton manuel pour charger plus (alternative au scroll) */}
      {hasNextPage && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: isFetchingNextPage ? 'not-allowed' : 'pointer',
              opacity: isFetchingNextPage ? 0.6 : 1
            }}
          >
            {isFetchingNextPage ? 'Chargement...' : 'Charger plus'}
          </button>
        </div>
      )}

      {/* Statistiques */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        Posts chargés: {allPosts.length}<br/>
        Pages: {data?.pages?.length ?? 0}<br/>
        Plus de pages: {hasNextPage ? 'Oui' : 'Non'}
      </div>
    </div>
  );
}

// Composant principal qui combine les deux approches
function PaginationDemo() {
  const [mode, setMode] = React.useState('pagination');

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setMode('pagination')}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: mode === 'pagination' ? '#007bff' : '#f8f9fa',
            color: mode === 'pagination' ? 'white' : 'black',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Pagination classique
        </button>
        <button
          onClick={() => setMode('infinite')}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: mode === 'infinite' ? '#007bff' : '#f8f9fa',
            color: mode === 'infinite' ? 'white' : 'black',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Chargement infini
        </button>
      </div>

      {mode === 'pagination' ? <PostsPagination /> : <PostsInfiniteScroll />}
    </div>
  );
}

export default PaginationDemo;