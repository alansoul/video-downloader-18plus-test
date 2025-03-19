import requests

def download_video(url: str) -> str:
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        return url  # Placeholder—replace with real logic later
    raise Exception("Failed to download video")