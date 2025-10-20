/**
 * Fetch GitHub contribution data for a user
 * Uses GitHub's GraphQL API to get contribution calendar data
 */

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionData {
  totalContributions: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
}

export async function fetchGitHubContributions(
  username: string,
  token?: string
): Promise<ContributionData | null> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    
    if (!calendar) {
      return null;
    }

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week: any) => ({
        contributionDays: week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: getLevelFromContributionLevel(day.contributionLevel),
        })),
      })),
    };
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    return null;
  }
}

function getLevelFromContributionLevel(level: string): number {
  const levels: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return levels[level] || 0;
}

/**
 * Fetch public contribution stats without authentication
 * This scrapes the public profile page (less reliable but no auth needed)
 */
export async function fetchPublicContributions(username: string): Promise<{ count: number } | null> {
  try {
    const response = await fetch(`https://github.com/${username}`, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    
    // Try to extract contribution count from the page
    const match = html.match(/([0-9,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    
    if (match && match[1]) {
      const count = parseInt(match[1].replace(/,/g, ''), 10);
      return { count };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch public contributions:', error);
    return null;
  }
}
