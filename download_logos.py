import urllib.request
import urllib.parse
import json
import os
import re

queries = {
    "tvm": "قناة الموريتانية logo wiki",
    "tvm2": "الموريتانية 2 logo wiki",
    "sport": "قناة الرياضية الموريتانية logo wiki",
    "culture": "القناة الثقافية الموريتانية logo wiki",
    "mahdara": "قناة المحظرة الموريتانية logo",
    "chinguitt": "Chinguitt TV logo",
    "mourabitoun": "Al Mourabitoun TV logo",
    "watania": "El Watania TV logo Mauritania",
    "sahel": "Sahel TV Mauritania logo",
    "radio_mauritanie": "Radio Mauritanie logo",
    "radio_jeunesse": "إذاعة الشباب الموريتانية logo",
    "radio_coran": "إذاعة القرآن الكريم الموريتانية logo",
    "tenwir": "إذاعة التنوير موريتانيا logo",
    "mauritanid": "Radio Mauritanid logo",
    "kobeni": "Radio Kobeni Mauritania logo",
    "rfi": "RFI logo wiki",
    "mcd": "Monte Carlo Doualiya logo",
    "bbc": "BBC Arabic radio logo",
    "cri": "China Radio International logo",
    "sawa": "Radio Sawa logo",
    "medi1": "Medi1 Radio logo"
}

def search_duckduckgo_image(query):
    try:
        url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query + " filetype:png OR filetype:jpg")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # very basic regex to find image source in DDG HTML
        match = re.search(r'img class="tile--img__img" src="([^"]+)"', html)
        if match:
            img_url = match.group(1)
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            elif img_url.startswith('/'):
                img_url = 'https://html.duckduckgo.com' + img_url
            return img_url
    except Exception as e:
        print("Error searching", query, e)
    return None

os.makedirs("public/logos", exist_ok=True)

results = {}
for key, query in queries.items():
    print(f"Searching for {key}...")
    img_url = search_duckduckgo_image(query)
    if img_url:
        print(f"Found for {key}: {img_url}")
        try:
            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req).read()
            filepath = f"public/logos/{key}.png"
            with open(filepath, "wb") as f:
                f.write(data)
            results[key] = f"/logos/{key}.png"
        except Exception as e:
            print("Failed to download", img_url, e)

with open("logos_mapping.json", "w") as f:
    json.dump(results, f, indent=2)

print("Done!")
