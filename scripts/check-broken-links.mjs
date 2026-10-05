async function checkAllLinks() {
  const startRoutes = [
    '/',
    '/ai',
    '/ai/ai-tools',
    '/developer-resources',
    '/developer-resources/github-repos',
    '/ui-components',
    '/technology',
    '/technology/platforms',
    '/blog',
    '/repos'
  ];

  const checked = new Set();
  const broken = [];
  const toCheck = [...startRoutes];

  while (toCheck.length > 0) {
    const route = toCheck.pop();
    if (checked.has(route)) continue;
    checked.add(route);

    try {
      const res = await fetch(`http://localhost:3000${route}`);
      if (res.status === 404 || res.status >= 400) {
        broken.push({ route, status: res.status });
        continue;
      }

      const html = await res.text();
      const hrefRegex = /href="(\/[^"#?]*)/g;
      let match;
      while ((match = hrefRegex.exec(html)) !== null) {
        const link = match[1];
        if (!link.startsWith('/_next') && !link.startsWith('/images') && !link.startsWith('/favicon') && !checked.has(link)) {
          // Verify link status
          try {
            const linkRes = await fetch(`http://localhost:3000${link}`);
            if (linkRes.status === 404 || linkRes.status >= 400) {
              broken.push({ from: route, to: link, status: linkRes.status });
            } else if (!checked.has(link) && !toCheck.includes(link)) {
              // Only traverse HTML pages
              if (link.startsWith('/ai') || link.startsWith('/developer-resources') || link.startsWith('/repos') || link.startsWith('/blog') || link.startsWith('/technology') || link.startsWith('/ui-components')) {
                toCheck.push(link);
              }
            }
          } catch (e) {
            broken.push({ from: route, to: link, error: e.message });
          }
        }
      }
    } catch (e) {
      broken.push({ route, error: e.message });
    }
  }

  console.log('=== BROKEN LINKS FOUND ===');
  console.log(`Checked ${checked.size} routes.`);
  if (broken.length === 0) {
    console.log('No broken links found!');
  } else {
    for (const b of broken) {
      console.log(`404: from "${b.from || 'direct'}" -> "${b.to || b.route}" [Status: ${b.status}]`);
    }
  }
}

checkAllLinks();
