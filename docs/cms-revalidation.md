# CMS-triggered revalidation

The portfolio keeps ISR/static performance and lets the Laravel CMS invalidate cached Next.js data after content is published.

## Environment

Set the same secret in production Next.js and Laravel:

```bash
REVALIDATION_SECRET=replace-with-a-long-random-value
```

The Next.js endpoint is:

```text
POST https://afifelcharif.com/api/revalidate
```

`GET` is also supported for manual testing, but Laravel should use `POST` with an authorization header.

## Accepted tags

Static tags:

- `home`
- `hero`
- `settings`
- `technologies`
- `projects`
- `labs`
- `experience`

Project detail tags:

- `project:{slug}`

Examples: `project:nam-house-of-sleep`, `project:ai-sourcing-platform`.

## Accepted paths

Only localized public pages are accepted:

- `/en`
- `/fr`
- `/en/projects/{slug}`
- `/fr/projects/{slug}`

## Manual examples

Revalidate homepage content:

```bash
curl -X POST https://afifelcharif.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/en","/fr"],"tags":["home","hero","settings","technologies"]}'
```

Revalidate a project after editing it:

```bash
curl -X POST https://afifelcharif.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/en","/fr","/en/projects/nam-house-of-sleep","/fr/projects/nam-house-of-sleep"],"tags":["projects","project:nam-house-of-sleep"]}'
```

Manual GET test:

```bash
curl "https://afifelcharif.com/api/revalidate?secret=$REVALIDATION_SECRET&path=/en&tag=home"
```

## Laravel / Filament publish hook

Call the endpoint after a CMS record is published or updated. Use tags for shared data and paths for specific pages.

```php
use Illuminate\Support\Facades\Http;

Http::withToken(config('services.next.revalidation_secret'))
    ->post(config('services.next.revalidation_url'), [
        'paths' => ['/en', '/fr'],
        'tags' => ['home', 'hero', 'settings', 'technologies'],
    ])
    ->throw();
```

For project records:

```php
$slug = $project->slug;

Http::withToken(config('services.next.revalidation_secret'))
    ->post(config('services.next.revalidation_url'), [
        'paths' => [
            '/en',
            '/fr',
            "/en/projects/{$slug}",
            "/fr/projects/{$slug}",
        ],
        'tags' => ['projects', "project:{$slug}"],
    ])
    ->throw();
```

Suggested Laravel config values:

```php
// config/services.php
'next' => [
    'revalidation_url' => env('NEXT_REVALIDATION_URL'),
    'revalidation_secret' => env('NEXT_REVALIDATION_SECRET'),
],
```

```bash
NEXT_REVALIDATION_URL=https://afifelcharif.com/api/revalidate
NEXT_REVALIDATION_SECRET=replace-with-the-same-secret
```
