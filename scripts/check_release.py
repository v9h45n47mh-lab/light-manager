"""Validate Light Manager identity and metadata before publishing."""
import hashlib
import json
import os
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
REPOSITORY = 'v9h45n47mh-lab/light-manager'
COMPONENT = ROOT / 'custom_components' / 'light_manager'


def validate_release():
    if os.environ.get('GITHUB_REPOSITORY') != REPOSITORY:
        raise ValueError('Release repository must be ' + REPOSITORY)
    components = sorted(p.name for p in (ROOT / 'custom_components').iterdir()
                        if p.is_dir() and p.name != '__pycache__')
    if components != ['light_manager']:
        raise ValueError('Unexpected integration directory')
    manifest = json.loads((COMPONENT / 'manifest.json').read_text())
    version = manifest['version']
    if manifest['domain'] != 'light_manager' or manifest['name'] != 'Light Manager':
        raise ValueError('Unexpected integration identity')
    if not re.fullmatch(r'\d+\.\d+\.\d+', version):
        raise ValueError('Invalid release version')
    if manifest['documentation'] != 'https://github.com/' + REPOSITORY:
        raise ValueError('Unexpected documentation repository')
    if manifest['issue_tracker'] != 'https://github.com/' + REPOSITORY + '/issues':
        raise ValueError('Unexpected issue repository')
    frontend = (COMPONENT / 'frontend' / 'light-manager-card.js').read_text()
    adapter = (COMPONENT / '__init__.py').read_text()
    if f"const LM_VERSION = '{version}';" not in frontend or f"VERSION = '{version}'" not in adapter:
        raise ValueError('Frontend and integration versions must match')
    ui_root = COMPONENT / 'frontend'
    lock = json.loads((ui_root / 'family-ui.lock.json').read_text())
    if lock['name'] != '@v9h45n47mh-lab/ha-ui-kit' or lock['version'] != '1.2.1':
        raise ValueError('Unexpected UI Kit dependency')
    kit = ui_root / 'family-ui' / lock['version']
    for name, checksum in lock['files'].items():
        if name not in ('family-ui.js', 'family-ui.css'):
            raise ValueError('Unexpected UI Kit file')
        if hashlib.sha256((kit / name).read_bytes()).hexdigest() != checksum:
            raise ValueError('UI Kit checksum mismatch')
    if hashlib.sha256((kit / 'LICENSE').read_bytes()).hexdigest() != lock['licenseSha256']:
        raise ValueError('UI Kit license checksum mismatch')
    if "'./family-ui/1.2.1/family-ui.js'" not in frontend:
        raise ValueError('Missing pinned UI Kit import')
    tag = os.environ.get('RELEASE_TAG', 'v' + version)
    if tag != 'v' + version:
        raise ValueError('Release tag must match the manifest version')
    match = re.search(r'^## ' + re.escape(version) + r'\n(.*?)(?=^## |\Z)',
                      (ROOT / 'CHANGELOG.md').read_text(), re.M | re.S)
    if not match:
        raise ValueError('Release changelog is missing')
    return version, match[1].strip()


if __name__ == '__main__':
    version, notes = validate_release()
    print(version)
