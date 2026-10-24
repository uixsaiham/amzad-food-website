"""Check local src/href targets in a built export; no browser interaction is tested."""

from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

root = Path("out")
pages = sorted(root.rglob("*.html"))
if not pages:
    sys.exit("No exported HTML found. Run npm run build first.")

missing = defaultdict(set)
checked = 0


class Scan(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source

    def handle_starttag(self, tag, attrs):
        global checked
        for key, value in attrs:
            if key not in ("src", "href") or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path.startswith("/"):
                continue
            path = unquote(url.path)
            prefix = "/amzad-food-website"
            if path == prefix or path.startswith(prefix + "/"):
                path = path[len(prefix):]
            target = root / path.lstrip("/")
            checked += 1
            if not target.is_file() and not (target / "index.html").is_file():
                missing[value].add(str(self.source))


for page in pages:
    Scan(page).feed(page.read_text(encoding="utf-8"))

print(f"Scanned {len(pages)} HTML files and {checked} local src/href references.")
for reference, sources in sorted(missing.items()):
    print(f"MISSING {reference}: {len(sources)} pages; example: {sorted(sources)[0]}")
print(f"Missing unique targets: {len(missing)}")
sys.exit(bool(missing))
