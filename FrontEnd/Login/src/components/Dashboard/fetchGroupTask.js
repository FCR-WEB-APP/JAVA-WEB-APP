import axios from 'axios';

export const fetchGroupTasks = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const rolesParam = url.searchParams.get('role');

    const staticJWTToken = localStorage.getItem('Bearer');
    if (!staticJWTToken) {
      throw new Response('Unauthorized', { status: 401 });
    }

    const decodedToken = JSON.parse(atob(staticJWTToken.split('.')[1]));
    const username = decodedToken.sub;

    const response = await axios.get('http://localhost:1001/api/GroupTask', {
      params: { role: rolesParam },
      headers: {
        'Authorization': `Bearer ${staticJWTToken}`,
        'username': username,
      },
      withCredentials: true,
    });

    const tasks = Array.isArray(response.data.result)
      ? response.data.result.map((task) => ({
          id: task.caseRefNo || '',
          reviewId: task.caseRefNo || '',
          childReviewId: task.childReviewId || '',
          division: task.divisionName || '',
          groupName: task.groupName || '',
          status: task.status || '',
          assignedTo: task.assignedTo || '',
          role: task.role || '',
          createdDate: task.createdDate || '',
        }))
      : [];

    return { tasks };
  } catch (error) {
    console.error('Error fetching group tasks:', error);
    throw new Response('Error fetching group tasks', { status: 500 });
  }
};
