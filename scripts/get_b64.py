import base64
import os

file_path = r'e:\Training Project\Skill BA gg Antigravity\Meeting Note\2026-02-24_Phan_loai_khach_hang_Phase_2.docx'
with open(file_path, "rb") as f:
    encoded = base64.b64encode(f.read()).decode('utf-8')
    print(encoded)
