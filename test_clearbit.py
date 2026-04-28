import urllib.request
domains = ["bbc.com", "rfi.fr", "mc-doualiya.com", "cri.cn", "radiosawa.com", "medi1.com", "tvm.mr", "aljazeera.net"]
for d in domains:
    try:
        urllib.request.urlopen(f"https://logo.clearbit.com/{d}").read()
        print(f"Success: {d}")
    except Exception as e:
        print(f"Failed: {d}")
