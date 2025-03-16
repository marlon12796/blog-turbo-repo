import { CONFIG } from '@/constants';

export const fetchGraphQl = async (query: string, variables: Record<string, unknown> = {}) => {
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error('GraphQL query failed');
    }

    return result.data;
  } catch (error) {
    console.error('Fetch GraphQL Error:', error);
    throw error;
  }
};
