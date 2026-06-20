const GITHUB_USERNAME = 'ezilietor';

/**
 * Trae los repositorios públicos del usuario en tiempo de build (no en el
 * navegador del visitante), así no hay límites de rate-limit del lado del
 * cliente ni problemas de CORS. Si la API falla, devuelve un arreglo vacío
 * y el componente muestra un estado de respaldo.
 */
export async function getGithubRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'portafolio-ezequiel-build',
        },
      }
    );

    if (!res.ok) {
      console.warn(`[github] la API respondió ${res.status} al pedir repositorios.`);
      return [];
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) return [];

    return repos
      .filter((repo) => !repo.fork && !repo.private)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: repo.pushed_at,
      }));
  } catch (err) {
    console.warn('[github] no se pudieron obtener los repositorios:', err.message);
    return [];
  }
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
